/* IBJSTUDIO backend: one Cloudflare Pages Function that serves everything under /api/*
   Needs: D1 binding named DB, secrets PAYSTACK_SECRET_KEY, ADMIN_PASSWORD, SESSION_SECRET.
   Optional: NGN_BUFFER_PERCENT (default 0). Secrets are read only here, on the server. */

const enc = new TextEncoder();
const RATES_URL = 'https://open.er-api.com/v6/latest/USD';
const FX_TTL = 3600;            // refresh rates after 1 hour
const FX_MAX_STALE = 172800;    // never charge using rates older than 48 hours
const CURRENCIES = ['USD', 'NGN', 'GBP', 'EUR', 'CAD'];
const REF_RE = /^ibj_[a-f0-9]{24}$/;

/* ---------- small helpers ---------- */
class HttpError extends Error { constructor(status, msg, extra) { super(msg); this.status = status; this.extra = extra || {}; } }
const J = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...extra }
});
const now = () => Math.floor(Date.now() / 1000);
const hex = (buf) => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const randHex = (n) => { const a = new Uint8Array(n); crypto.getRandomValues(a); return hex(a); };
const sha256 = async (s) => hex(await crypto.subtle.digest('SHA-256', enc.encode(s)));
async function hmac(secret, msg, hash) {
  const k = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: hash || 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', k, enc.encode(msg)));
}
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0;
}
const DB = (env) => { if (!env.DB) throw new HttpError(500, 'The database is not connected yet.'); return env.DB; };
const run = (db, sql, ...a) => db.prepare(sql).bind(...a).run();
const first = (db, sql, ...a) => db.prepare(sql).bind(...a).first();
const all = async (db, sql, ...a) => ((await db.prepare(sql).bind(...a).all()).results || []);
const clean = (s, max) => String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;

async function readJson(request, max = 20000) {
  const t = await request.text();
  if (t.length > max) throw new HttpError(413, 'Request too large.');
  try { const v = JSON.parse(t || '{}'); if (v && typeof v === 'object') return v; } catch (e) { /* fallthrough */ }
  throw new HttpError(400, 'Invalid request.');
}
function sameOrigin(request) {
  const o = request.headers.get('origin');
  if (!o) return false;
  try { return new URL(o).host === new URL(request.url).host; } catch (e) { return false; }
}
function requireSameOrigin(request) { if (!sameOrigin(request)) throw new HttpError(403, 'Request blocked.'); }

async function rateLimit(env, request, bucket, max, windowSec) {
  const db = DB(env);
  const ip = request.headers.get('cf-connecting-ip') || 'local';
  const key = bucket + ':' + (await sha256(ip + (env.SESSION_SECRET || '')));
  const win = Math.floor(now() / windowSec);
  await run(db, 'INSERT INTO rate(key,win,n,exp) VALUES(?,?,1,?) ON CONFLICT(key,win) DO UPDATE SET n=n+1', key, win, (win + 1) * windowSec + 60);
  const r = await first(db, 'SELECT n FROM rate WHERE key=? AND win=?', key, win);
  if (r && r.n > max) throw new HttpError(429, 'Too many requests. Please wait a moment and try again.');
  if (Math.random() < 0.02) await run(db, 'DELETE FROM rate WHERE exp<?', now());
}

/* ---------- prices (the ONLY place prices are decided) ---------- */
const PIC = new Set([299, 399, 999]);
const VID = new Set([499, 1499]);
function priceFor(id) {
  if (typeof id !== 'string' || id.length > 100) return null;
  if (id === 'kingdom-pdf-499') return 499;
  const m = /^[a-z0-9][a-z0-9-]{1,90}-(pic|vid)-(\d{3,4})$/.exec(id);
  if (!m) return null;
  const kind = m[1], cents = Number(m[2]);
  const pack = /pack-of-5|bundle/.test(id);
  if (kind === 'pic') { if (pack ? cents !== 999 : !(cents === 299 || cents === 399)) return null; if (!PIC.has(cents)) return null; }
  else { if (pack ? cents !== 1499 : cents !== 499) return null; if (!VID.has(cents)) return null; }
  return cents;
}
function cleanItems(items) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 20) throw new HttpError(400, 'Your cart is empty or too large.');
  const ids = [...new Set(items.map(String))];
  const lines = ids.map(id => { const c = priceFor(id); if (c == null) throw new HttpError(400, 'One of the items in your cart is not available for online payment. Please remove it or message us.'); return { id, usdCents: c }; });
  return lines;
}
const bufferPct = (env) => { const b = Number(env.NGN_BUFFER_PERCENT || 0); return Number.isFinite(b) ? Math.min(10, Math.max(0, b)) : 0; };
// Rounding policy: convert total USD to NGN, add the optional buffer, then round UP to the next N10.
function ngnKoboFor(usdCents, ngnRate, buf) {
  const naira = Math.ceil((usdCents / 100) * ngnRate * (1 + buf / 100) / 10 - 1e-9) * 10;
  return naira * 100;
}

/* ---------- exchange rates ---------- */
async function fetchRates() {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
  try {
    const r = await fetch(RATES_URL, { signal: ctl.signal });
    const j = await r.json();
    if (!r.ok || j.result !== 'success' || !j.rates) throw new Error('bad rates response');
    const R = j.rates, pick = {};
    const sane = { NGN: [100, 20000], GBP: [0.3, 1.6], EUR: [0.4, 1.6], CAD: [0.9, 2.5] };
    for (const c of Object.keys(sane)) { const v = Number(R[c]); if (!(v >= sane[c][0] && v <= sane[c][1])) throw new Error('rate out of range ' + c); pick[c] = v; }
    return { rates: { USD: 1, ...pick }, asOf: new Date((j.time_last_update_unix || now()) * 1000).toISOString(), fetchedAt: now(), source: 'open.er-api.com' };
  } finally { clearTimeout(t); }
}
async function getRates(env) {
  const db = DB(env);
  const row = await first(db, "SELECT v FROM settings WHERE k='fx'");
  let cached = null; if (row) { try { cached = JSON.parse(row.v); } catch (e) { /* ignore */ } }
  const age = cached ? now() - cached.fetchedAt : Infinity;
  if (cached && age < FX_TTL) return { ...cached, stale: false };
  try {
    const fresh = await fetchRates();
    await run(db, "INSERT INTO settings(k,v) VALUES('fx',?) ON CONFLICT(k) DO UPDATE SET v=excluded.v", JSON.stringify(fresh));
    return { ...fresh, stale: false };
  } catch (e) {
    if (cached && age < FX_MAX_STALE) return { ...cached, stale: true };
    throw new HttpError(503, 'Exchange rates are unavailable right now. Please try again in a few minutes.');
  }
}
const chargeRate = (fx, env) => fx.rates.NGN * (1 + bufferPct(env) / 100);

function buildQuote(lines, fx, env) {
  const usdCents = lines.reduce((s, l) => s + l.usdCents, 0);
  const kobo = ngnKoboFor(usdCents, fx.rates.NGN, bufferPct(env));
  return { lines, usdCents, ngnKobo: kobo, ngn: kobo / 100, rates: fx.rates, ngnCharge: chargeRate(fx, env), asOf: fx.asOf, stale: fx.stale };
}

/* ---------- Paystack ---------- */
async function paystack(env, path, opts = {}) {
  if (!env.PAYSTACK_SECRET_KEY) throw new HttpError(500, 'Online payment is not switched on yet.');
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15000);
  try {
    const r = await fetch('https://api.paystack.co' + path, { ...opts, signal: ctl.signal, headers: { authorization: 'Bearer ' + env.PAYSTACK_SECRET_KEY, 'content-type': 'application/json' } });
    const body = await r.json().catch(() => null);
    return { ok: r.ok, status: r.status, body };
  } finally { clearTimeout(t); }
}

// Checks a payment with Paystack itself and only then marks the order paid. Safe to call many times.
async function verifyAndFulfil(env, reference) {
  const db = DB(env);
  const order = await first(db, 'SELECT * FROM orders WHERE reference=?', reference);
  if (!order) return { status: 'unknown' };
  if (order.status === 'paid') return { status: 'paid', order };
  if (order.status === 'mismatch') return { status: 'mismatch', order };
  const r = await paystack(env, '/transaction/verify/' + encodeURIComponent(reference));
  if (!r.ok || !r.body || !r.body.status || !r.body.data) throw new HttpError(502, 'Could not reach Paystack to confirm the payment.');
  const d = r.body.data;
  if (d.status === 'success') {
    let meta = d.metadata; if (typeof meta === 'string') { try { meta = JSON.parse(meta); } catch (e) { meta = null; } }
    const problems = [];
    if (d.amount !== order.ngn_kobo) problems.push('amount');
    if (d.currency !== 'NGN') problems.push('currency');
    if (d.reference !== order.reference) problems.push('reference');
    if (!d.customer || String(d.customer.email || '').toLowerCase() !== order.email) problems.push('customer');
    if (!meta || meta.order_id !== order.id) problems.push('order');
    if (problems.length) {
      await run(db, "UPDATE orders SET status='mismatch', notes=? WHERE reference=? AND status IN ('pending','failed')", 'Verification mismatch: ' + problems.join(','), reference);
      return { status: 'mismatch' };
    }
    await run(db, "UPDATE orders SET status='paid', paid_at=?, paystack_id=? WHERE reference=? AND status IN ('pending','failed')", now(), String(d.id || ''), reference);
    return { status: 'paid', order: await first(db, 'SELECT * FROM orders WHERE reference=?', reference) };
  }
  if (d.status === 'failed') { await run(db, "UPDATE orders SET status='failed' WHERE reference=? AND status='pending'", reference); return { status: 'failed' }; }
  return { status: 'pending' };
}

/* ---------- public routes ---------- */
async function routeRates(ctx) {
  const fx = await getRates(ctx.env);
  return J({ base: 'USD', rates: fx.rates, ngnCharge: chargeRate(fx, ctx.env), asOf: fx.asOf, stale: fx.stale, source: fx.source }, 200, { 'cache-control': 'public, max-age=300' });
}
async function routeQuote({ request, env }) {
  requireSameOrigin(request);
  await rateLimit(env, request, 'quote', 60, 600);
  const body = await readJson(request);
  const q = buildQuote(cleanItems(body.items), await getRates(env), env);
  return J({ ok: true, lines: q.lines, usdCents: q.usdCents, ngn: q.ngn, rates: q.rates, ngnCharge: q.ngnCharge, asOf: q.asOf, stale: q.stale });
}
async function routeCheckout({ request, env }) {
  requireSameOrigin(request);
  await rateLimit(env, request, 'checkout', 10, 600);
  const db = DB(env);
  const body = await readJson(request);
  const name = clean(body.name, 80), email = clean(body.email, 254).toLowerCase();
  if (name.length < 2) throw new HttpError(400, 'Please enter your name.');
  if (!EMAIL_RE.test(email)) throw new HttpError(400, 'Please enter a valid email address.');
  const display = CURRENCIES.includes(body.currency) ? body.currency : 'USD';
  const q = buildQuote(cleanItems(body.items), await getRates(env), env);       // the browser never supplies a price
  if (body.expectedNgn != null && Math.round(Number(body.expectedNgn) * 100) !== q.ngnKobo) {
    throw new HttpError(409, 'The exchange rate was just updated. Please review the new amount.', { code: 'price_changed', ngn: q.ngn, rates: q.rates, ngnCharge: q.ngnCharge });
  }
  const id = 'ord_' + randHex(8), reference = 'ibj_' + randHex(12);
  await run(db, "INSERT INTO orders(id,reference,name,email,items,usd_cents,ngn_kobo,fx_rate,fx_asof,display_currency,status,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,'pending',?)",
    id, reference, name, email, JSON.stringify(q.lines), q.usdCents, q.ngnKobo, q.rates.NGN, q.asOf, display, now());
  const origin = new URL(request.url).origin;
  let r;
  try {
    r = await paystack(env, '/transaction/initialize', { method: 'POST', body: JSON.stringify({
      email, amount: q.ngnKobo, currency: 'NGN', reference, callback_url: origin + '/api/return',
      metadata: { order_id: id, display_currency: display, usd_cents: q.usdCents, custom_fields: [{ display_name: 'Customer', variable_name: 'customer', value: name }] }
    }) });
  } catch (e) { await run(db, "UPDATE orders SET status='failed', notes='init error' WHERE id=?", id); throw e; }
  const url = r.body && r.body.data && r.body.data.authorization_url;
  if (!r.ok || !url) { await run(db, "UPDATE orders SET status='failed', notes='init rejected' WHERE id=?", id); throw new HttpError(502, 'We could not start the payment. Please try again or order on WhatsApp.'); }
  return J({ ok: true, reference, authorization_url: url, ngn: q.ngn });
}
async function routeReturn({ request, env }) {
  const u = new URL(request.url);
  const ref = u.searchParams.get('reference') || u.searchParams.get('trxref') || '';
  if (!REF_RE.test(ref)) return Response.redirect(u.origin + '/#n-cart', 302);
  try { await verifyAndFulfil(env, ref); } catch (e) { /* the page polls /api/status */ }
  return Response.redirect(u.origin + '/?paid=' + ref + '#n-cart', 302);
}
async function routeStatus({ request, env }) {
  await rateLimit(env, request, 'status', 90, 600);
  const ref = new URL(request.url).searchParams.get('ref') || '';
  if (!REF_RE.test(ref)) throw new HttpError(400, 'Invalid reference.');
  const db = DB(env);
  let order = await first(db, 'SELECT status,ngn_kobo FROM orders WHERE reference=?', ref);
  if (!order) throw new HttpError(404, 'Order not found.');
  if (order.status === 'pending') { try { await verifyAndFulfil(env, ref); } catch (e) { /* keep pending */ } order = await first(db, 'SELECT status,ngn_kobo FROM orders WHERE reference=?', ref); }
  return J({ status: order.status === 'mismatch' ? 'review' : order.status, ngn: order.ngn_kobo / 100, reference: ref });
}
async function routeWebhook({ request, env }) {
  const raw = await request.text();
  if (!env.PAYSTACK_SECRET_KEY) return J({ error: 'not configured' }, 500);
  const sig = request.headers.get('x-paystack-signature') || '';
  const expected = await hmac(env.PAYSTACK_SECRET_KEY, raw, 'SHA-512');
  if (!safeEqual(sig, expected)) return J({ error: 'bad signature' }, 401);
  let ev; try { ev = JSON.parse(raw); } catch (e) { return J({ error: 'bad body' }, 400); }
  if (!ev || ev.event !== 'charge.success' || !ev.data) return J({ ok: true, ignored: true });
  const db = DB(env);
  const ref = String(ev.data.reference || '');
  if (!REF_RE.test(ref)) return J({ ok: true, ignored: true });
  const evKey = 'charge.success:' + String(ev.data.id || ref);
  if (await first(db, 'SELECT id FROM events WHERE id=?', evKey)) return J({ ok: true, duplicate: true });
  const res = await verifyAndFulfil(env, ref);          // throws (-> 500) if Paystack is unreachable, so Paystack retries
  if (res.status === 'paid' || res.status === 'mismatch' || res.status === 'unknown') {
    await run(db, 'INSERT OR IGNORE INTO events(id,created_at) VALUES(?,?)', evKey, now());
  }
  return J({ ok: true, status: res.status });
}

/* ---------- customer chat ---------- */
const isOnline = async (db) => { const r = await first(db, "SELECT v FROM settings WHERE k='admin_seen'"); return !!r && now() - Number(r.v) < 45; };
async function authConv(db, c, t) {
  if (typeof c !== 'string' || typeof t !== 'string' || !/^c_[a-f0-9]{16}$/.test(c) || !/^[a-f0-9]{32}$/.test(t)) return null;
  const conv = await first(db, 'SELECT * FROM conversations WHERE id=?', c);
  if (!conv || !safeEqual(conv.token_hash, await sha256(t))) return null;
  return conv;
}
async function chatGet({ request, env }) {
  const db = DB(env);
  await rateLimit(env, request, 'chatpoll', 300, 600);
  const u = new URL(request.url), c = u.searchParams.get('c');
  const online = await isOnline(db);
  if (!c) return J({ online });
  const conv = await authConv(db, c, u.searchParams.get('t'));
  if (!conv) throw new HttpError(404, 'Conversation not found.');
  const after = Math.max(0, parseInt(u.searchParams.get('after') || '0', 10) || 0);
  const msgs = await all(db, 'SELECT id,sender,body,created_at AS at FROM messages WHERE conv_id=? AND id>? ORDER BY id LIMIT 200', conv.id, after);
  return J({ online, status: conv.status, messages: msgs });
}
async function chatPost({ request, env }) {
  requireSameOrigin(request);
  const db = DB(env);
  await rateLimit(env, request, 'chatmsg', 12, 60);
  const b = await readJson(request, 8000);
  if (b.website) return J({ ok: true });                       // honeypot field: real people leave it empty
  const text = clean(b.message, 2000);
  if (!text) throw new HttpError(400, 'Please type a message.');
  let conv, token = null;
  if (b.c) {
    conv = await authConv(db, b.c, b.t);
    if (!conv) throw new HttpError(404, 'Conversation not found.');
    const n = await first(db, 'SELECT COUNT(*) AS n FROM messages WHERE conv_id=?', conv.id);
    if (n.n >= 500) throw new HttpError(429, 'This conversation is full. Please contact us on WhatsApp.');
  } else {
    await rateLimit(env, request, 'chatstart', 5, 3600);
    const name = clean(b.name, 80), email = clean(b.email, 254).toLowerCase();
    if (name.length < 2) throw new HttpError(400, 'Please enter your name.');
    if (!EMAIL_RE.test(email)) throw new HttpError(400, 'Please enter a valid email address.');
    token = randHex(16);
    conv = { id: 'c_' + randHex(8), status: 'new' };
    await run(db, "INSERT INTO conversations(id,token_hash,name,email,status,admin_unread,last_sender,last_msg_at,created_at) VALUES(?,?,?,?,'new',1,'customer',?,?)",
      conv.id, await sha256(token), name, email, now(), now());
  }
  await run(db, "INSERT INTO messages(conv_id,sender,body,created_at) VALUES(?,'customer',?,?)", conv.id, text, now());
  const status = conv.status === 'new' ? 'new' : 'open';
  await run(db, "UPDATE conversations SET status=?, admin_unread=1, last_sender='customer', last_msg_at=? WHERE id=?", status, now(), conv.id);
  const online = await isOnline(db);
  return J({ ok: true, c: conv.id, t: token, online });
}

/* ---------- admin ---------- */
function cookie(request, name) {
  const m = (request.headers.get('cookie') || '').split(/;\s*/).find(p => p.startsWith(name + '='));
  return m ? m.slice(name.length + 1) : '';
}
async function isAdmin(request, env) {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) return false;
  const [exp, sig] = cookie(request, 'ibj_admin').split('.');
  if (!exp || !sig || Number(exp) < now()) return false;
  return safeEqual(sig, await hmac(env.SESSION_SECRET, 'admin.' + exp));
}
async function adminRoute(ctx, sub) {
  const { request, env } = ctx, m = request.method, db = DB(env);
  const u = new URL(request.url);
  if (m === 'POST') requireSameOrigin(request);
  if (sub === 'login' && m === 'POST') {
    if (!env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 12 || !env.SESSION_SECRET || env.SESSION_SECRET.length < 32) throw new HttpError(500, 'Admin login is not configured yet.');
    await rateLimit(env, request, 'login', 8, 900);
    const b = await readJson(request, 2000);
    const ok = safeEqual(await sha256(String(b.password || '')), await sha256(env.ADMIN_PASSWORD));
    if (!ok) throw new HttpError(401, 'Wrong password.');
    const exp = now() + 43200;
    return J({ ok: true }, 200, { 'set-cookie': `ibj_admin=${exp}.${await hmac(env.SESSION_SECRET, 'admin.' + exp)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=43200` });
  }
  if (sub === 'me') return J({ ok: await isAdmin(request, env) });
  if (!(await isAdmin(request, env))) throw new HttpError(401, 'Please sign in.');
  if (sub === 'logout' && m === 'POST') return J({ ok: true }, 200, { 'set-cookie': 'ibj_admin=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0' });

  if (sub === 'conversations' && m === 'GET') {
    await run(db, "INSERT INTO settings(k,v) VALUES('admin_seen',?) ON CONFLICT(k) DO UPDATE SET v=excluded.v", String(now()));
    const st = u.searchParams.get('status');
    const where = ['new', 'open', 'waiting', 'closed'].includes(st) ? 'WHERE c.status=?' : '';
    const rows = await all(db, `SELECT c.id,c.name,c.email,c.status,c.admin_unread AS unread,c.last_sender AS lastSender,c.last_msg_at AS lastAt,c.created_at AS createdAt,
      (SELECT body FROM messages WHERE conv_id=c.id ORDER BY id DESC LIMIT 1) AS preview FROM conversations c ${where} ORDER BY c.admin_unread DESC, c.last_msg_at DESC LIMIT 200`, ...(where ? [st] : []));
    const counts = await all(db, 'SELECT status, COUNT(*) AS n FROM conversations GROUP BY status');
    const needs = await first(db, "SELECT COUNT(*) AS n FROM conversations WHERE last_sender='customer' AND status!='closed'");
    return J({ conversations: rows, counts, needsReply: needs.n });
  }
  if (sub === 'conversation' && m === 'GET') {
    const id = u.searchParams.get('id') || '';
    const conv = await first(db, 'SELECT id,name,email,status,admin_unread AS unread,created_at AS createdAt FROM conversations WHERE id=?', id);
    if (!conv) throw new HttpError(404, 'Not found.');
    if (u.searchParams.get('read') !== '0') await run(db, "UPDATE conversations SET admin_unread=0, status=CASE WHEN status='new' THEN 'open' ELSE status END WHERE id=?", id);
    const messages = await all(db, 'SELECT id,sender,body,created_at AS at FROM messages WHERE conv_id=? ORDER BY id LIMIT 500', id);
    const fresh = await first(db, 'SELECT status,admin_unread AS unread FROM conversations WHERE id=?', id);
    return J({ conversation: { ...conv, ...fresh }, messages });
  }
  if (sub === 'reply' && m === 'POST') {
    const b = await readJson(request, 8000), text = clean(b.body, 4000);
    const conv = await first(db, 'SELECT id FROM conversations WHERE id=?', String(b.id || ''));
    if (!conv || !text) throw new HttpError(400, 'Nothing to send.');
    await run(db, "INSERT INTO messages(conv_id,sender,body,created_at) VALUES(?,'admin',?,?)", conv.id, text, now());
    await run(db, "UPDATE conversations SET status='waiting', admin_unread=0, last_sender='admin', last_msg_at=? WHERE id=?", now(), conv.id);
    return J({ ok: true });
  }
  if (sub === 'update' && m === 'POST') {
    const b = await readJson(request, 2000), id = String(b.id || '');
    if (!(await first(db, 'SELECT id FROM conversations WHERE id=?', id))) throw new HttpError(404, 'Not found.');
    if (b.status != null) { if (!['new', 'open', 'waiting', 'closed'].includes(b.status)) throw new HttpError(400, 'Bad status.'); await run(db, 'UPDATE conversations SET status=? WHERE id=?', b.status, id); }
    if (b.unread != null) await run(db, 'UPDATE conversations SET admin_unread=? WHERE id=?', b.unread ? 1 : 0, id);
    return J({ ok: true });
  }
  if (sub === 'orders' && m === 'GET') {
    const rows = await all(db, 'SELECT id,reference,name,email,items,usd_cents AS usdCents,ngn_kobo AS ngnKobo,display_currency AS currency,status,notes,created_at AS createdAt,paid_at AS paidAt FROM orders ORDER BY created_at DESC LIMIT 200');
    return J({ orders: rows.map(o => ({ ...o, items: (() => { try { return JSON.parse(o.items).map(l => l.id); } catch (e) { return []; } })() })) });
  }
  throw new HttpError(404, 'Not found.');
}

/* ---------- router ---------- */
export async function onRequest(ctx) {
  const { request, params } = ctx;
  const path = '/' + (Array.isArray(params.path) ? params.path.join('/') : (params.path || ''));
  const key = request.method + ' ' + path;
  try {
    const routes = {
      'GET /rates': routeRates, 'POST /quote': routeQuote, 'POST /checkout': routeCheckout, 'GET /return': routeReturn,
      'GET /status': routeStatus, 'POST /paystack-webhook': routeWebhook, 'GET /chat': chatGet, 'POST /chat': chatPost
    };
    if (routes[key]) return await routes[key](ctx);
    if (path.startsWith('/admin/')) return await adminRoute(ctx, path.slice(7));
    return J({ error: 'Not found.' }, 404);
  } catch (e) {
    if (e instanceof HttpError) return J({ error: e.message, ...e.extra }, e.status);
    console.error('api error:', e && e.message);
    return J({ error: 'Something went wrong. Please try again.' }, 500);
  }
}
