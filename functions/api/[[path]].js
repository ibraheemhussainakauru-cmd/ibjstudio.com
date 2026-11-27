// IBJSTUDIO backend: one Cloudflare Pages Function that serves every /api/* route.
// Needs: a D1 database bound as DB, and the secrets listed in DEPLOY.md.
// Never put secrets in this file. They come from Cloudflare "Variables and Secrets".

// Server-controlled USD prices. The browser can never change these.
const CATALOG = {
 "anime-prompts-pic-299": {
  "t": "Anime prompts (picture)",
  "p": 2.99
 },
 "moonlit-swordsman-pic-299": {
  "t": "Moonlit swordsman (picture)",
  "p": 2.99
 },
 "wolf-companion-at-lantern-sunset-pic-299": {
  "t": "Wolf companion at lantern sunset (picture)",
  "p": 2.99
 },
 "silver-haired-scout-neon-city-pic-299": {
  "t": "Silver-haired scout, neon city (picture)",
  "p": 2.99
 },
 "anime-pack-of-5-pic-999": {
  "t": "Anime pack of 5 (picture)",
  "p": 9.99
 },
 "rainy-day-fox-pic-299": {
  "t": "Rainy-day fox (picture)",
  "p": 2.99
 },
 "elephant-and-lion-cub-pic-299": {
  "t": "Elephant and lion cub (picture)",
  "p": 2.99
 },
 "cartoon-pack-of-5-pic-999": {
  "t": "Cartoon pack of 5 (picture)",
  "p": 9.99
 },
 "storyteller-under-the-baobab-pic-299": {
  "t": "Storyteller under the baobab (picture)",
  "p": 2.99
 },
 "hausa-pack-of-5-pic-999": {
  "t": "Hausa pack of 5 (picture)",
  "p": 9.99
 },
 "yoruba-picture-prompt-pic-299": {
  "t": "Yoruba picture prompt (picture)",
  "p": 2.99
 },
 "yoruba-pack-of-5-pic-999": {
  "t": "Yoruba pack of 5 (picture)",
  "p": 9.99
 },
 "igbo-storyteller-at-sunset-pic-299": {
  "t": "Igbo storyteller at sunset (picture)",
  "p": 2.99
 },
 "igbo-pack-of-5-pic-999": {
  "t": "Igbo pack of 5 (picture)",
  "p": 9.99
 },
 "fulani-storyteller-with-cattle-pic-299": {
  "t": "Fulani storyteller with cattle (picture)",
  "p": 2.99
 },
 "fulani-pack-of-5-pic-999": {
  "t": "Fulani pack of 5 (picture)",
  "p": 9.99
 },
 "learning-the-qur-an-together-pic-299": {
  "t": "Learning the Qur’an together (picture)",
  "p": 2.99
 },
 "children-learning-to-pray-pic-299": {
  "t": "Children learning to pray (picture)",
  "p": 2.99
 },
 "kindness-and-good-manners-pic-299": {
  "t": "Kindness and good manners (picture)",
  "p": 2.99
 },
 "muslim-children-pack-of-5-pic-999": {
  "t": "Muslim children pack of 5 (picture)",
  "p": 9.99
 },
 "bible-stories-for-kids-pic-299": {
  "t": "Bible stories for kids (picture)",
  "p": 2.99
 },
 "prayer-and-grace-for-kids-pic-299": {
  "t": "Prayer and grace for kids (picture)",
  "p": 2.99
 },
 "christian-children-pack-of-5-pic-999": {
  "t": "Christian children pack of 5 (picture)",
  "p": 9.99
 },
 "rooftop-kiss-at-night-pic-299": {
  "t": "Rooftop kiss at night (picture)",
  "p": 2.99
 },
 "romance-pack-of-5-pic-999": {
  "t": "Romance pack of 5 (picture)",
  "p": 9.99
 },
 "traditional-wedding-couple-pic-299": {
  "t": "Traditional wedding couple (picture)",
  "p": 2.99
 },
 "three-generation-family-portrait-pic-299": {
  "t": "Three-generation family portrait (picture)",
  "p": 2.99
 },
 "wedding-couple-lace-and-roses-pic-299": {
  "t": "Wedding couple, lace and roses (picture)",
  "p": 2.99
 },
 "couples-family-and-group-pack-of-5-pic-999": {
  "t": "Couples, family and group pack of 5 (picture)",
  "p": 9.99
 },
 "ace-of-hearts-breakthrough-pic-299": {
  "t": "Ace of hearts breakthrough (picture)",
  "p": 2.99
 },
 "cinematic-pack-of-5-pic-999": {
  "t": "Cinematic pack of 5 (picture)",
  "p": 9.99
 },
 "fedora-and-sunglasses-portrait-pic-299": {
  "t": "Fedora and sunglasses portrait (picture)",
  "p": 2.99
 },
 "portrait-and-fashion-pic-299": {
  "t": "Portrait and fashion (picture)",
  "p": 2.99
 },
 "fire-and-water-portrait-pic-299": {
  "t": "Fire and water portrait (picture)",
  "p": 2.99
 },
 "autumn-rain-red-sweater-pic-299": {
  "t": "Autumn rain, red sweater (picture)",
  "p": 2.99
 },
 "smoke-and-aviators-portrait-pic-299": {
  "t": "Smoke and aviators portrait (picture)",
  "p": 2.99
 },
 "cozy-teddy-bear-portrait-pic-299": {
  "t": "Cozy teddy bear portrait (picture)",
  "p": 2.99
 },
 "portrait-and-fashion-pack-of-5-pic-999": {
  "t": "Portrait and fashion pack of 5 (picture)",
  "p": 9.99
 },
 "business-and-advert-pic-399": {
  "t": "Business and advert (picture)",
  "p": 3.99
 },
 "business-pack-of-5-pic-999": {
  "t": "Business pack of 5 (picture)",
  "p": 9.99
 },
 "modest-abaya-marble-hall-pic-299": {
  "t": "Modest abaya, marble hall (picture)",
  "p": 2.99
 },
 "modest-abaya-studio-light-pic-299": {
  "t": "Modest abaya, studio light (picture)",
  "p": 2.99
 },
 "ivory-cape-jumpsuit-pic-299": {
  "t": "Ivory cape jumpsuit (picture)",
  "p": 2.99
 },
 "couture-runway-gown-pic-299": {
  "t": "Couture runway gown (picture)",
  "p": 2.99
 },
 "golden-couture-gown-pic-299": {
  "t": "Golden couture gown (picture)",
  "p": 2.99
 },
 "fashion-pack-of-5-pic-999": {
  "t": "Fashion pack of 5 (picture)",
  "p": 9.99
 },
 "salon-and-beauty-picture-prompt-pic-299": {
  "t": "Salon and beauty picture prompt (picture)",
  "p": 2.99
 },
 "salon-and-beauty-pack-of-5-pic-999": {
  "t": "Salon and beauty pack of 5 (picture)",
  "p": 9.99
 },
 "restaurant-and-food-picture-prompt-pic-299": {
  "t": "Restaurant and food picture prompt (picture)",
  "p": 2.99
 },
 "restaurant-and-food-pack-of-5-pic-999": {
  "t": "Restaurant and food pack of 5 (picture)",
  "p": 9.99
 },
 "real-estate-picture-prompt-pic-299": {
  "t": "Real estate picture prompt (picture)",
  "p": 2.99
 },
 "real-estate-pack-of-5-pic-999": {
  "t": "Real estate pack of 5 (picture)",
  "p": 9.99
 },
 "skincare-and-cosmetics-picture-prompt-pic-299": {
  "t": "Skincare and cosmetics picture prompt (picture)",
  "p": 2.99
 },
 "skincare-and-cosmetics-pack-of-5-pic-999": {
  "t": "Skincare and cosmetics pack of 5 (picture)",
  "p": 9.99
 },
 "events-and-weddings-picture-prompt-pic-299": {
  "t": "Events and weddings picture prompt (picture)",
  "p": 2.99
 },
 "events-and-weddings-pack-of-5-pic-999": {
  "t": "Events and weddings pack of 5 (picture)",
  "p": 9.99
 },
 "fitness-and-wellness-picture-prompt-pic-299": {
  "t": "Fitness and wellness picture prompt (picture)",
  "p": 2.99
 },
 "fitness-and-wellness-pack-of-5-pic-999": {
  "t": "Fitness and wellness pack of 5 (picture)",
  "p": 9.99
 },
 "education-and-training-picture-prompt-pic-299": {
  "t": "Education and training picture prompt (picture)",
  "p": 2.99
 },
 "education-and-training-pack-of-5-pic-999": {
  "t": "Education and training pack of 5 (picture)",
  "p": 9.99
 },
 "drama-picture-prompt-pic-299": {
  "t": "Drama picture prompt (picture)",
  "p": 2.99
 },
 "drama-pack-of-5-pic-999": {
  "t": "Drama pack of 5 (picture)",
  "p": 9.99
 },
 "gardens-and-golden-years-picture-prompt-pic-299": {
  "t": "Gardens and golden years picture prompt (picture)",
  "p": 2.99
 },
 "gardens-and-golden-years-pack-of-5-pic-999": {
  "t": "Gardens and golden years pack of 5 (picture)",
  "p": 9.99
 },
 "starter-bundle-pic-999": {
  "t": "Starter bundle (picture)",
  "p": 9.99
 },
 "bundles-pack-of-5-pic-999": {
  "t": "Bundles pack of 5 (picture)",
  "p": 9.99
 },
 "anime-video-prompts-vid-499": {
  "t": "Anime video prompts (video)",
  "p": 4.99
 },
 "anime-pack-of-5-vid-1499": {
  "t": "Anime pack of 5 (video)",
  "p": 14.99
 },
 "rainy-day-fox-animated-vid-499": {
  "t": "Rainy-day fox, animated (video)",
  "p": 4.99
 },
 "cartoon-pack-of-5-vid-1499": {
  "t": "Cartoon pack of 5 (video)",
  "p": 14.99
 },
 "hausa-video-prompt-vid-499": {
  "t": "Hausa video prompt (video)",
  "p": 4.99
 },
 "hausa-pack-of-5-vid-1499": {
  "t": "Hausa pack of 5 (video)",
  "p": 14.99
 },
 "yoruba-video-prompt-vid-499": {
  "t": "Yoruba video prompt (video)",
  "p": 4.99
 },
 "yoruba-pack-of-5-vid-1499": {
  "t": "Yoruba pack of 5 (video)",
  "p": 14.99
 },
 "igbo-video-prompt-vid-499": {
  "t": "Igbo video prompt (video)",
  "p": 4.99
 },
 "igbo-pack-of-5-vid-1499": {
  "t": "Igbo pack of 5 (video)",
  "p": 14.99
 },
 "fulani-video-prompt-vid-499": {
  "t": "Fulani video prompt (video)",
  "p": 4.99
 },
 "fulani-pack-of-5-vid-1499": {
  "t": "Fulani pack of 5 (video)",
  "p": 14.99
 },
 "how-children-pray-animated-vid-499": {
  "t": "How children pray, animated (video)",
  "p": 4.99
 },
 "bismillah-and-daily-duas-vid-499": {
  "t": "Bismillah and daily duas (video)",
  "p": 4.99
 },
 "muslim-children-pack-of-5-vid-1499": {
  "t": "Muslim children pack of 5 (video)",
  "p": 14.99
 },
 "bible-story-animations-vid-499": {
  "t": "Bible story animations (video)",
  "p": 4.99
 },
 "sunday-school-stories-vid-499": {
  "t": "Sunday school stories (video)",
  "p": 4.99
 },
 "christian-children-pack-of-5-vid-1499": {
  "t": "Christian children pack of 5 (video)",
  "p": 14.99
 },
 "romance-video-prompt-vid-499": {
  "t": "Romance video prompt (video)",
  "p": 4.99
 },
 "romance-pack-of-5-vid-1499": {
  "t": "Romance pack of 5 (video)",
  "p": 14.99
 },
 "couples-family-and-group-video-prompt-vid-499": {
  "t": "Couples, family and group video prompt (video)",
  "p": 4.99
 },
 "couples-family-and-group-pack-of-5-vid-1499": {
  "t": "Couples, family and group pack of 5 (video)",
  "p": 14.99
 },
 "cinematic-scenes-vid-499": {
  "t": "Cinematic scenes (video)",
  "p": 4.99
 },
 "cinematic-pack-of-5-vid-1499": {
  "t": "Cinematic pack of 5 (video)",
  "p": 14.99
 },
 "modest-abaya-walk-vid-499": {
  "t": "Modest abaya walk (video)",
  "p": 4.99
 },
 "portrait-and-fashion-pack-of-5-vid-1499": {
  "t": "Portrait and fashion pack of 5 (video)",
  "p": 14.99
 },
 "adverts-and-promos-vid-499": {
  "t": "Adverts and promos (video)",
  "p": 4.99
 },
 "business-pack-of-5-vid-1499": {
  "t": "Business pack of 5 (video)",
  "p": 14.99
 },
 "couture-runway-walk-vid-499": {
  "t": "Couture runway walk (video)",
  "p": 4.99
 },
 "fashion-pack-of-5-vid-1499": {
  "t": "Fashion pack of 5 (video)",
  "p": 14.99
 },
 "salon-and-beauty-video-prompt-vid-499": {
  "t": "Salon and beauty video prompt (video)",
  "p": 4.99
 },
 "salon-and-beauty-pack-of-5-vid-1499": {
  "t": "Salon and beauty pack of 5 (video)",
  "p": 14.99
 },
 "restaurant-and-food-video-prompt-vid-499": {
  "t": "Restaurant and food video prompt (video)",
  "p": 4.99
 },
 "restaurant-and-food-pack-of-5-vid-1499": {
  "t": "Restaurant and food pack of 5 (video)",
  "p": 14.99
 },
 "real-estate-video-prompt-vid-499": {
  "t": "Real estate video prompt (video)",
  "p": 4.99
 },
 "real-estate-pack-of-5-vid-1499": {
  "t": "Real estate pack of 5 (video)",
  "p": 14.99
 },
 "skincare-and-cosmetics-video-prompt-vid-499": {
  "t": "Skincare and cosmetics video prompt (video)",
  "p": 4.99
 },
 "skincare-and-cosmetics-pack-of-5-vid-1499": {
  "t": "Skincare and cosmetics pack of 5 (video)",
  "p": 14.99
 },
 "events-and-weddings-video-prompt-vid-499": {
  "t": "Events and weddings video prompt (video)",
  "p": 4.99
 },
 "events-and-weddings-pack-of-5-vid-1499": {
  "t": "Events and weddings pack of 5 (video)",
  "p": 14.99
 },
 "fitness-and-wellness-video-prompt-vid-499": {
  "t": "Fitness and wellness video prompt (video)",
  "p": 4.99
 },
 "fitness-and-wellness-pack-of-5-vid-1499": {
  "t": "Fitness and wellness pack of 5 (video)",
  "p": 14.99
 },
 "education-and-training-video-prompt-vid-499": {
  "t": "Education and training video prompt (video)",
  "p": 4.99
 },
 "education-and-training-pack-of-5-vid-1499": {
  "t": "Education and training pack of 5 (video)",
  "p": 14.99
 },
 "drama-and-short-film-vid-499": {
  "t": "Drama and short film (video)",
  "p": 4.99
 },
 "drama-pack-of-5-vid-1499": {
  "t": "Drama pack of 5 (video)",
  "p": 14.99
 },
 "gardens-and-golden-years-video-prompt-vid-499": {
  "t": "Gardens and golden years video prompt (video)",
  "p": 4.99
 },
 "gardens-and-golden-years-pack-of-5-vid-1499": {
  "t": "Gardens and golden years pack of 5 (video)",
  "p": 14.99
 },
 "rooftop-sunset-braided-girl-pic-299": {
  "t": "Rooftop sunset, braided girl (picture)",
  "p": 2.99
 },
 "african-print-gown-and-gele-pic-299": {
  "t": "African print gown and gele (picture)",
  "p": 2.99
 },
 "african-print-portrait-at-sunset-pic-299": {
  "t": "African print portrait at sunset (picture)",
  "p": 2.99
 },
 "hausa-man-in-a-black-babban-riga-pic-299": {
  "t": "Hausa man in a black babban riga (picture)",
  "p": 2.99
 },
 "africa-anime-picture-pack-of-5-pic-999": {
  "t": "Africa anime picture pack of 5 (picture)",
  "p": 9.99
 },
 "africa-anime-video-prompt-vid-499": {
  "t": "Africa anime video prompt (video)",
  "p": 4.99
 },
 "africa-anime-video-pack-of-5-vid-1499": {
  "t": "Africa anime video pack of 5 (video)",
  "p": 14.99
 },
 "kingdom-pdf-499": {
  "t": "The Kingdom of His Obsession (PDF)",
  "p": 4.99
 }
};

const enc = new TextEncoder();
const json = (d, s = 200, h = {}) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...h } });
const hex = (b) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
const rand = (n = 16) => hex(crypto.getRandomValues(new Uint8Array(n)));
const sha256 = async (s) => hex(await crypto.subtle.digest('SHA-256', enc.encode(s)));
async function hmac(secret, msg, algo = 'SHA-256') {
  const k = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: algo }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', k, enc.encode(msg)));
}
function safeEq(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
const validEmail = (e) => e.length <= 254 && /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(e);
const round2 = (n) => Math.round(n * 100) / 100;
async function readJSON(request, max = 20000) {
  const t = await request.text();
  if (t.length > max) throw Object.assign(new Error('too large'), { status: 413 });
  try { return JSON.parse(t || '{}'); } catch { throw Object.assign(new Error('bad json'), { status: 400 }); }
}
const ipHash = async (req, env) => (await sha256((env.RATE_SALT || 'ibj') + (req.headers.get('CF-Connecting-IP') || '0.0.0.0'))).slice(0, 24);

// Fixed-window rate limiter stored in D1.
async function limit(env, key, max, windowSec) {
  const win = Math.floor(Date.now() / 1000 / windowSec);
  const k = key + ':' + win;
  await env.DB.prepare('INSERT INTO rate_limits(k,n,exp) VALUES(?,1,?) ON CONFLICT(k) DO UPDATE SET n=n+1').bind(k, (win + 2) * windowSec).run();
  const r = await env.DB.prepare('SELECT n FROM rate_limits WHERE k=?').bind(k).first();
  if (Math.random() < 0.02) await env.DB.prepare('DELETE FROM rate_limits WHERE exp<?').bind(Math.floor(Date.now() / 1000)).run();
  return (r?.n || 0) <= max;
}

// ---------- Exchange rate (server side, cached in D1) ----------
async function getRate(env) {
  const now = Date.now();
  const row = await env.DB.prepare("SELECT v,at FROM kv WHERE k='usd_ngn'").first();
  if (row && now - row.at < 3600e3) return { ngn: row.v, at: row.at, src: 'cache' };
  const save = async (v, src) => {
    await env.DB.prepare("INSERT INTO kv(k,v,at) VALUES('usd_ngn',?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v,at=excluded.at").bind(v, now).run();
    return { ngn: v, at: now, src };
  };
  const ok = (v) => typeof v === 'number' && isFinite(v) && v > 100 && v < 20000;
  try {
    const d = await (await fetch('https://open.er-api.com/v6/latest/USD')).json();
    if (d && d.result === 'success' && ok(d.rates?.NGN)) return await save(d.rates.NGN, 'exchangerate-api');
  } catch {}
  try {
    const d = await (await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')).json();
    if (ok(d?.usd?.ngn)) return await save(d.usd.ngn, 'currency-api');
  } catch {}
  if (row && now - row.at < 48 * 3600e3) return { ngn: row.v, at: row.at, src: 'stale' };
  return null;
}
// Rounding policy: each item is rounded UP to the next 10 naira, then the items are added.
const ngnFor = (usd, rate, marginPct = 0) => Math.ceil((usd * rate * (1 + marginPct / 100)) / 10) * 10;

// ---------- Payments ----------
async function getOrder(env, ref) {
  if (!/^IBJ-[a-f0-9]{32}$/.test(ref)) return null;
  return await env.DB.prepare('SELECT * FROM orders WHERE ref=?').bind(ref).first();
}
async function paystackVerify(env, ref) {
  const r = await fetch('https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref), { headers: { Authorization: 'Bearer ' + env.PAYSTACK_SECRET_KEY } });
  const d = await r.json().catch(() => null);
  return r.ok && d && d.status ? d.data : null;
}
function checkTx(order, tx) {
  if (!tx) return 'no_tx';
  if (tx.reference !== order.ref) return 'reference_mismatch';
  if (tx.currency !== 'NGN') return 'currency_not_ngn';
  if (Number(tx.amount) !== Number(order.ngn_kobo)) return 'amount_mismatch';
  const mo = tx.metadata && tx.metadata.order_ref;
  if (mo && mo !== order.ref) return 'order_mismatch';
  return tx.status === 'success' ? 'ok' : 'status:' + tx.status;
}
async function markPaid(env, order, tx) {
  const r = await env.DB.prepare("UPDATE orders SET status='paid',paid_at=?,paystack_id=? WHERE ref=? AND status!='paid'").bind(Date.now(), String(tx.id || ''), order.ref).run();
  return r.meta.changes > 0;
}
const flag = (env, order, why) => env.DB.prepare("UPDATE orders SET status='review',note=? WHERE ref=? AND status!='paid'").bind(why, order.ref).run();
async function deliver(env, order) {
  return JSON.parse(order.items).map((id) => ({ id, title: CATALOG[id]?.t || id, kind: kindOf(id) }));
}

async function checkout({ request, env }) {
  if (!env.PAYSTACK_SECRET_KEY) return json({ error: 'Online payment is not switched on yet.', code: 'not_configured' }, 503);
  if (!(await limit(env, 'co:' + (await ipHash(request, env)), 10, 3600))) return json({ error: 'Too many attempts. Please try again later.' }, 429);
  const b = await readJSON(request); // any "amount" or "price" sent by the browser is ignored
  const email = clean(b.email, 254).toLowerCase();
  if (!validEmail(email)) return json({ error: 'Please enter a valid email address.' }, 400);
  const ids = Array.isArray(b.items) ? [...new Set(b.items.map((x) => String(x)))] : [];
  if (!ids.length || ids.length > 25) return json({ error: 'Your cart is empty or too large.' }, 400);
  const lines = [];
  for (const id of ids) {
    const p = CATALOG[id];
    if (!p) return json({ error: 'One of the items is no longer available.', item: id }, 400);
    lines.push({ id, title: p.t, usd: p.p });
  }
  const fx = await getRate(env);
  if (!fx) return json({ error: 'Exchange rates are unavailable right now. Please try again shortly.' }, 503);
  const margin = Number(env.FX_MARGIN_PERCENT || 0) || 0;
  lines.forEach((l) => { l.ngn = ngnFor(l.usd, fx.ngn, margin); });
  const totalNgn = lines.reduce((s, l) => s + l.ngn, 0);
  const kobo = totalNgn * 100;
  const usdTotal = round2(lines.reduce((s, l) => s + l.usd, 0));
  const ref = 'IBJ-' + rand(16);
  await env.DB.prepare('INSERT INTO orders(ref,email,items,usd_total,ngn_kobo,rate,rate_at,status,created_at) VALUES(?,?,?,?,?,?,?,?,?)').bind(ref, email, JSON.stringify(ids), usdTotal, kobo, fx.ngn, fx.at, 'pending', Date.now()).run();
  const origin = new URL(request.url).origin;
  const r = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.PAYSTACK_SECRET_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({ email, amount: kobo, currency: 'NGN', reference: ref, callback_url: origin + '/order', metadata: { order_ref: ref, items: ids, source: 'ibjstudio.com' } }),
  });
  const d = await r.json().catch(() => null);
  if (!r.ok || !d || !d.status || !d.data?.authorization_url) {
    await env.DB.prepare("UPDATE orders SET status='failed',note='init_failed' WHERE ref=?").bind(ref).run();
    return json({ error: 'We could not start the payment. Please try again.' }, 502);
  }
  return json({ ok: true, reference: ref, authorization_url: d.data.authorization_url, currency: 'NGN', totalNgn, usdTotal, rate: fx.ngn, rateAt: fx.at, lines, notice: 'Your payment is processed in Nigerian naira (NGN). If your card is in another currency, your bank may convert the amount using its own rate and may add fees.' });
}

async function verify({ request, env }, url) {
  if (!env.PAYSTACK_SECRET_KEY) return json({ error: 'Online payment is not switched on yet.' }, 503);
  if (!(await limit(env, 'vf:' + (await ipHash(request, env)), 40, 60))) return json({ error: 'Too many requests.' }, 429);
  const ref = clean(url.searchParams.get('reference') || url.searchParams.get('trxref'), 80);
  const order = await getOrder(env, ref);
  if (!order) return json({ error: 'Order not found.' }, 404);
  if (order.status !== 'paid') {
    const tx = await paystackVerify(env, ref);
    const res = checkTx(order, tx);
    if (res === 'ok') await markPaid(env, order, tx);
    else if (/mismatch|not_ngn/.test(res)) { await flag(env, order, res); return json({ status: 'review', message: 'We received your payment but need to check it. We will contact you.' }); }
    else if (tx && ['failed', 'abandoned', 'reversed'].includes(tx.status)) return json({ status: 'failed', message: 'The payment was not completed.' });
    else return json({ status: 'pending', message: 'We are still waiting for confirmation from Paystack.' });
  }
  const fresh = await getOrder(env, ref);
  const idrow = await awardForOrder(env, fresh);
  const me = await vaultCustomer(request, env);
  let extra = {};
  if (!me || me.email !== fresh.email) { const c = await upsertCustomer(env, fresh.email); extra = { 'set-cookie': vaultCookie(await newSession(env, c.id)) }; }
  return json({ status: 'paid', reference: ref, ngn: fresh.ngn_kobo / 100, items: await deliver(env, fresh), member: idrow ? { code: idrow.code, founding: !!idrow.founding } : null }, 200, extra);
}

async function webhook({ request, env }) {
  if (!env.PAYSTACK_SECRET_KEY) return json({ error: 'not configured' }, 503);
  const raw = await request.text();
  if (raw.length > 200000) return json({ error: 'too large' }, 413);
  const expect = await hmac(env.PAYSTACK_SECRET_KEY, raw, 'SHA-512');
  if (!safeEq((request.headers.get('x-paystack-signature') || '').toLowerCase(), expect)) return json({ error: 'invalid signature' }, 401);
  let ev;
  try { ev = JSON.parse(raw); } catch { return json({ error: 'bad json' }, 400); }
  const data = ev.data || {};
  const eid = String(ev.event) + ':' + String(data.id || data.reference || '');
  const ins = await env.DB.prepare('INSERT OR IGNORE INTO webhook_events(id,event,ref,at) VALUES(?,?,?,?)').bind(eid, String(ev.event || ''), String(data.reference || ''), Date.now()).run();
  if (ins.meta.changes === 0) return json({ ok: true, duplicate: true });
  if (ev.event !== 'charge.success') return json({ ok: true, ignored: ev.event });
  const order = await getOrder(env, String(data.reference || ''));
  if (!order) return json({ ok: true, ignored: 'unknown_reference' });
  const pre = checkTx(order, data);
  if (pre !== 'ok') { await flag(env, order, pre); return json({ ok: true, flagged: pre }); }
  const tx = await paystackVerify(env, order.ref); // confirm with Paystack before trusting the event
  const res = checkTx(order, tx);
  if (res !== 'ok') { await flag(env, order, res); return json({ ok: true, flagged: res }); }
  const first = await markPaid(env, order, tx);
  await awardForOrder(env, order);
  return json({ ok: true, paid: true, first });
}

// ---------- Support chat (customers) ----------
function luhn(s) { let sum = 0, alt = false; for (let i = s.length - 1; i >= 0; i--) { let n = +s[i]; if (alt) { n *= 2; if (n > 9) n -= 9; } sum += n; alt = !alt; } return sum % 10 === 0; }
function looksSensitive(s) {
  const digits = s.replace(/[ -]/g, '');
  for (const x of digits.match(/\d{13,19}/g) || []) if (luhn(x)) return true;
  return /\b(cvv|cvc|otp|pin)\b\s*[:=]?\s*\d{3,8}/i.test(s) || /password\s*[:=]/i.test(s);
}
const SENSITIVE_MSG = 'For your safety, please do not share card numbers, CVV, PIN, OTP or passwords in chat.';
async function notifyAdmin(env, subject, text) {
  if (!env.BREVO_API_KEY || !env.ADMIN_EMAIL || !env.NOTIFY_FROM) return false;
  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', { method: 'POST', headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify({ sender: { name: 'IBJSTUDIO Support', email: env.NOTIFY_FROM }, to: [{ email: env.ADMIN_EMAIL }], subject, textContent: text }) });
    return r.ok;
  } catch { return false; }
}
async function convAuth(env, id, token) {
  if (!/^[a-f0-9]{16}$/.test(id || '') || !/^[a-f0-9]{48}$/.test(token || '')) return null;
  const c = await env.DB.prepare('SELECT * FROM conversations WHERE id=?').bind(id).first();
  if (!c) return null;
  return safeEq(await sha256(token), c.token_hash) ? c : null;
}
const pubMsg = (m) => ({ id: m.id, from: m.sender, body: m.body, at: m.created_at });

async function chatStart({ request, env, waitUntil }) {
  const ip = await ipHash(request, env);
  if (!(await limit(env, 'cs:' + ip, 5, 3600))) return json({ error: 'Too many new chats. Please try again later.' }, 429);
  const b = await readJSON(request);
  if (b.website) return json({ ok: true }); // honeypot field: real people leave it empty
  const name = clean(b.name, 80), email = clean(b.email, 254).toLowerCase(), msg = clean(b.message, 1000);
  if (!name) return json({ error: 'Please tell us your name.' }, 400);
  if (!validEmail(email)) return json({ error: 'Please enter a valid email so we can reply.' }, 400);
  if (!msg) return json({ error: 'Please type your message.' }, 400);
  if (looksSensitive(msg)) return json({ error: SENSITIVE_MSG }, 400);
  const id = rand(8), token = rand(24), now = Date.now();
  await env.DB.prepare('INSERT INTO conversations(id,token_hash,name,email,status,unread_admin,created_at,last_message_at,last_sender) VALUES(?,?,?,?,?,?,?,?,?)').bind(id, await sha256(token), name, email, 'new', 1, now, now, 'customer').run();
  await env.DB.prepare('INSERT INTO messages(conv_id,sender,body,created_at) VALUES(?,?,?,?)').bind(id, 'customer', msg, now).run();
  const p = notifyAdmin(env, 'New IBJSTUDIO chat from ' + name, name + ' <' + email + '>\n\n' + msg + '\n\nOpen your inbox: ' + new URL(request.url).origin + '/admin');
  if (waitUntil) waitUntil(p);
  const rows = (await env.DB.prepare('SELECT * FROM messages WHERE conv_id=? ORDER BY id').bind(id).all()).results;
  return json({ ok: true, id, token, messages: rows.map(pubMsg), notice: 'Thanks, your message was received. If we are offline, we will reply by email as soon as we can. A response may not be immediate.' });
}
async function chatSend({ request, env, waitUntil }) {
  const b = await readJSON(request);
  const c = await convAuth(env, b.id, b.token);
  if (!c) return json({ error: 'Conversation not found.' }, 403);
  if (!(await limit(env, 'cm:' + c.id, 20, 60)) || !(await limit(env, 'cmi:' + (await ipHash(request, env)), 60, 3600))) return json({ error: 'You are sending messages too quickly.' }, 429);
  const msg = clean(b.message, 1000);
  if (!msg) return json({ error: 'Please type your message.' }, 400);
  if (looksSensitive(msg)) return json({ error: SENSITIVE_MSG }, 400);
  const now = Date.now();
  const r = await env.DB.prepare('INSERT INTO messages(conv_id,sender,body,created_at) VALUES(?,?,?,?)').bind(c.id, 'customer', msg, now).run();
  const wasUnread = c.unread_admin === 1;
  const status = c.status === 'waiting' || c.status === 'closed' ? 'open' : c.status;
  await env.DB.prepare('UPDATE conversations SET last_message_at=?,last_sender=?,unread_admin=1,status=? WHERE id=?').bind(now, 'customer', status, c.id).run();
  if (!wasUnread && waitUntil) waitUntil(notifyAdmin(env, 'New reply from ' + c.name, c.name + ' <' + c.email + '>\n\n' + msg + '\n\nOpen your inbox: ' + new URL(request.url).origin + '/admin'));
  return json({ ok: true, status });
}
async function chatMessages({ request, env }, url) {
  const c = await convAuth(env, url.searchParams.get('id'), url.searchParams.get('token'));
  if (!c) return json({ error: 'Conversation not found.' }, 403);
  const after = Math.max(0, parseInt(url.searchParams.get('after') || '0', 10) || 0);
  const rows = (await env.DB.prepare('SELECT * FROM messages WHERE conv_id=? AND id>? ORDER BY id LIMIT 200').bind(c.id, after).all()).results;
  return json({ messages: rows.map(pubMsg), status: c.status });
}

// ---------- Admin (password + signed session cookie) ----------
const COOKIE = 'ibj_admin';
async function adminLogin({ request, env }) {
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) return json({ error: 'Admin login is not configured yet.' }, 503);
  if (!(await limit(env, 'al:' + (await ipHash(request, env)), 5, 900))) return json({ error: 'Too many attempts. Please wait 15 minutes.' }, 429);
  const b = await readJSON(request, 2000);
  const same = safeEq(await sha256('pw:' + clean(b.password, 200)), await sha256('pw:' + env.ADMIN_PASSWORD));
  if (!same) return json({ error: 'Incorrect password.' }, 401);
  const exp = Date.now() + 12 * 3600e3;
  const val = exp + '.' + (await hmac(env.SESSION_SECRET, 'admin.' + exp));
  return json({ ok: true }, 200, { 'set-cookie': `${COOKIE}=${val}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=43200` });
}
const adminLogout = () => json({ ok: true }, 200, { 'set-cookie': `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0` });
async function isAdmin(request, env) {
  if (!env.SESSION_SECRET) return false;
  const m = (request.headers.get('cookie') || '').match(new RegExp('(?:^|; )' + COOKIE + '=([^;]+)'));
  if (!m) return false;
  const [exp, sig] = m[1].split('.');
  if (!/^\d+$/.test(exp || '') || Number(exp) < Date.now()) return false;
  if (!safeEq(sig || '', await hmac(env.SESSION_SECRET, 'admin.' + exp))) return false;
  return request.method === 'GET' || request.headers.get('x-requested-with') === 'ibj-admin'; // blocks cross-site form posts
}
const STATUSES = ['new', 'open', 'waiting', 'closed'];
async function adminConversations({ env }, url) {
  const st = url.searchParams.get('status');
  const where = STATUSES.includes(st) ? 'WHERE c.status=?' : '';
  const q = `SELECT c.id,c.name,c.email,c.status,c.unread_admin,c.last_message_at,c.last_sender,(SELECT body FROM messages m WHERE m.conv_id=c.id ORDER BY m.id DESC LIMIT 1) AS preview FROM conversations c ${where} ORDER BY c.last_message_at DESC LIMIT 100`;
  const stmt = env.DB.prepare(q);
  const rows = (where ? await stmt.bind(st).all() : await stmt.all()).results;
  const counts = (await env.DB.prepare('SELECT status,COUNT(*) AS n FROM conversations GROUP BY status').all()).results;
  return json({ conversations: rows.map((r) => ({ ...r, preview: String(r.preview || '').slice(0, 120) })), counts });
}
async function adminConversationGet({ env }, url) {
  const id = url.searchParams.get('id');
  const c = await env.DB.prepare('SELECT id,name,email,status,unread_admin,created_at FROM conversations WHERE id=?').bind(id).first();
  if (!c) return json({ error: 'Not found' }, 404);
  if (!url.searchParams.get('peek')) await env.DB.prepare("UPDATE conversations SET unread_admin=0,status=CASE WHEN status='new' THEN 'open' ELSE status END WHERE id=?").bind(id).run();
  const rows = (await env.DB.prepare('SELECT * FROM messages WHERE conv_id=? ORDER BY id').bind(id).all()).results;
  return json({ conversation: c, messages: rows.map(pubMsg) });
}
async function adminConversationPost({ request, env }) {
  const b = await readJSON(request, 6000);
  const c = await env.DB.prepare('SELECT * FROM conversations WHERE id=?').bind(String(b.id || '')).first();
  if (!c) return json({ error: 'Not found' }, 404);
  const now = Date.now();
  if (b.action === 'reply') {
    const msg = clean(b.message, 2000);
    if (!msg) return json({ error: 'Type a reply first.' }, 400);
    await env.DB.prepare('INSERT INTO messages(conv_id,sender,body,created_at) VALUES(?,?,?,?)').bind(c.id, 'admin', msg, now).run();
    await env.DB.prepare("UPDATE conversations SET last_message_at=?,last_sender='admin',unread_admin=0,status='waiting' WHERE id=?").bind(now, c.id).run();
  } else if (b.action === 'status' && STATUSES.includes(b.status)) {
    await env.DB.prepare('UPDATE conversations SET status=? WHERE id=?').bind(b.status, c.id).run();
  } else if (b.action === 'unread') {
    await env.DB.prepare('UPDATE conversations SET unread_admin=? WHERE id=?').bind(b.value ? 1 : 0, c.id).run();
  } else return json({ error: 'Unknown action' }, 400);
  return json({ ok: true });
}
async function adminPrompts({ request, env }, url) {
  if (request.method === 'GET') {
    const id = url.searchParams.get('id');
    if (id) {
      if (!CATALOG[id]) return json({ error: 'Unknown product' }, 404);
      const p = await env.DB.prepare('SELECT content FROM prompts WHERE product_id=?').bind(id).first();
      return json({ id, title: CATALOG[id].t, usd: CATALOG[id].p, content: p ? p.content : '' });
    }
    const set = new Set((await env.DB.prepare('SELECT product_id FROM prompts').all()).results.map((r) => r.product_id));
    return json({ products: Object.entries(CATALOG).map(([id, p]) => ({ id, title: p.t, usd: p.p, hasContent: set.has(id) })) });
  }
  const b = await readJSON(request, 40000);
  if (!CATALOG[b.id]) return json({ error: 'Unknown product' }, 404);
  const content = clean(b.content, 30000);
  if (!content) await env.DB.prepare('DELETE FROM prompts WHERE product_id=?').bind(b.id).run();
  else await env.DB.prepare('INSERT INTO prompts(product_id,content,updated_at) VALUES(?,?,?) ON CONFLICT(product_id) DO UPDATE SET content=excluded.content,updated_at=excluded.updated_at').bind(b.id, content, Date.now()).run();
  return json({ ok: true });
}
async function adminOrders({ env }) {
  const rows = (await env.DB.prepare('SELECT ref,email,items,usd_total,ngn_kobo,status,note,created_at,paid_at FROM orders ORDER BY created_at DESC LIMIT 100').all()).results;
  return json({ orders: rows.map((r) => ({ ...r, ngn: r.ngn_kobo / 100, items: JSON.parse(r.items).map((i) => CATALOG[i]?.t || i) })) });
}

// ---------- Vault: customer accounts by email link ----------
const VCOOKIE = 'ibj_vault';
const isBook = (id) => /-(pdf|book)-\d+$/.test(id);
const kindOf = (id) => (isBook(id) ? 'book' : /-vid-\d+$/.test(id) ? 'video' : /-story-\d+$/.test(id) ? 'story' : 'image');
// Platforms offered for each kind of prompt. Add more here later; custom ones saved in admin also appear.
const PLATFORMS = {
  image: [['chatgpt', 'ChatGPT'], ['gemini', 'Google Gemini'], ['midjourney', 'Midjourney'], ['other', 'Other image tools']],
  video: [['flow', 'Google Flow'], ['other', 'Other video tools']],
  story: [['chatgpt', 'ChatGPT'], ['gemini', 'Google Gemini'], ['other', 'Other writing tools']],
};
const HOWTO = {
  chatgpt: 'Open ChatGPT, start a new chat, paste the prompt and send it. If you want changes, ask for one adjustment at a time.',
  gemini: 'Open Google Gemini, start a new chat, paste the prompt and send it. Ask for small changes one at a time.',
  midjourney: 'Paste the prompt into the Midjourney prompt box (on the website, or after typing /imagine in Discord) and submit. Keep any settings that start with -- at the end.',
  flow: 'Open Google Flow, start a new project, choose video generation, paste the prompt and generate. Short clips usually look best.',
  other: 'Open your AI tool, paste the prompt and generate. If the result is not right, change one detail at a time.',
};
const vaultCookie = (tok) => `${VCOOKIE}=${tok}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`;
async function newSession(env, customerId) {
  const tok = rand(32);
  await env.DB.prepare('INSERT INTO vault_sessions(th,customer_id,exp) VALUES(?,?,?)').bind(await sha256(tok), customerId, Date.now() + 30 * 864e5).run();
  return tok;
}
async function upsertCustomer(env, email) {
  const now = Date.now();
  await env.DB.prepare('INSERT INTO customers(email,created_at,last_login) VALUES(?,?,?) ON CONFLICT(email) DO UPDATE SET last_login=excluded.last_login').bind(email, now, now).run();
  return await env.DB.prepare('SELECT * FROM customers WHERE email=?').bind(email).first();
}
async function vaultCustomer(request, env) {
  const m = (request.headers.get('cookie') || '').match(new RegExp('(?:^|; )' + VCOOKIE + '=([a-f0-9]{64})'));
  if (!m) return null;
  const s = await env.DB.prepare('SELECT s.customer_id AS id,c.email AS email FROM vault_sessions s JOIN customers c ON c.id=s.customer_id WHERE s.th=? AND s.exp>?').bind(await sha256(m[1]), Date.now()).first();
  return s ? { id: s.id, email: s.email } : null;
}
async function sendMail(env, to, subject, text) {
  if (!env.BREVO_API_KEY || !env.NOTIFY_FROM) return false;
  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', { method: 'POST', headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify({ sender: { name: 'IBJSTUDIO', email: env.NOTIFY_FROM }, to: [{ email: to }], subject, textContent: text }) });
    return r.ok;
  } catch { return false; }
}
async function owns(env, email, id) {
  const rows = (await env.DB.prepare("SELECT items FROM orders WHERE email=? AND status='paid'").bind(email).all()).results;
  return rows.some((o) => JSON.parse(o.items).includes(id));
}
async function vaultRequestLink({ request, env, waitUntil }) {
  if (!env.BREVO_API_KEY || !env.NOTIFY_FROM) return json({ error: 'Email sign-in is not switched on yet. Please message us from the chat button.' }, 503);
  if (!(await limit(env, 'vl:' + (await ipHash(request, env)), 6, 3600))) return json({ error: 'Too many requests. Please try again later.' }, 429);
  const b = await readJSON(request, 2000);
  const email = clean(b.email, 254).toLowerCase();
  if (!validEmail(email)) return json({ error: 'Please enter a valid email address.' }, 400);
  const reply = { ok: true, message: 'If this email has purchases, a vault link is on its way. Check your inbox and spam folder.' };
  if (!(await limit(env, 'vle:' + (await sha256(email)).slice(0, 20), 3, 3600))) return json(reply);
  const has = await env.DB.prepare("SELECT 1 AS x FROM orders WHERE email=? AND status='paid' LIMIT 1").bind(email).first();
  if (has) {
    const tok = rand(32);
    await env.DB.prepare('INSERT INTO login_links(th,email,exp,used) VALUES(?,?,?,0)').bind(await sha256(tok), email, Date.now() + 20 * 60e3).run();
    const link = new URL(request.url).origin + '/vault?token=' + tok;
    const p = sendMail(env, email, 'Your IBJSTUDIO vault link', 'Welcome back, IBJer.\n\nOpen your vault: ' + link + '\n\nThis link works once and expires in 20 minutes. If you did not ask for it, you can ignore this email.');
    if (waitUntil) waitUntil(p); else await p;
  }
  return json(reply);
}
async function vaultLogin({ request, env }) {
  const b = await readJSON(request, 2000);
  const tok = String(b.token || '');
  if (!/^[a-f0-9]{64}$/.test(tok)) return json({ error: 'This link is not valid.' }, 400);
  if (!(await limit(env, 'vlg:' + (await ipHash(request, env)), 20, 3600))) return json({ error: 'Too many attempts.' }, 429);
  const th = await sha256(tok);
  const row = await env.DB.prepare('SELECT * FROM login_links WHERE th=?').bind(th).first();
  if (!row || row.used || row.exp < Date.now()) return json({ error: 'This link has expired or was already used. Please request a new one.' }, 400);
  const u = await env.DB.prepare('UPDATE login_links SET used=1 WHERE th=? AND used=0').bind(th).run();
  if (u.meta.changes === 0) return json({ error: 'This link has expired or was already used. Please request a new one.' }, 400);
  const c = await upsertCustomer(env, row.email);
  return json({ ok: true }, 200, { 'set-cookie': vaultCookie(await newSession(env, c.id)) });
}
async function vaultLogout({ request, env }) {
  const m = (request.headers.get('cookie') || '').match(new RegExp('(?:^|; )' + VCOOKIE + '=([a-f0-9]{64})'));
  if (m) await env.DB.prepare('DELETE FROM vault_sessions WHERE th=?').bind(await sha256(m[1])).run();
  return json({ ok: true }, 200, { 'set-cookie': `${VCOOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0` });
}
async function vaultMe({ request, env }) {
  const c = await vaultCustomer(request, env);
  if (!c) return json({ error: 'Please sign in.' }, 401);
  const rows = (await env.DB.prepare("SELECT ref,items,usd_total,ngn_kobo,paid_at FROM orders WHERE email=? AND status='paid' ORDER BY paid_at DESC").bind(c.email).all()).results;
  const purchases = rows.map((o) => ({ ref: o.ref, at: o.paid_at, usd: o.usd_total, ngn: o.ngn_kobo / 100, items: JSON.parse(o.items).map((id) => ({ id, title: CATALOG[id]?.t || id, kind: kindOf(id) })) }));
  const seen = new Map();
  purchases.forEach((p) => p.items.forEach((i) => { if (!seen.has(i.id)) seen.set(i.id, { ...i, at: p.at }); }));
  const items = [...seen.values()];
  const books = [];
  for (const i of items.filter((x) => x.kind === 'book')) {
    const b = await env.DB.prepare('SELECT title,author,cover FROM books WHERE product_id=?').bind(i.id).first();
    books.push({ id: i.id, title: b?.title || i.title, author: b?.author || '', cover: b?.cover || '', ready: !!b });
  }
  const prompts = items.filter((x) => x.kind !== 'book');
  let member = null, creator = null;
  try {
    const idr = await env.DB.prepare('SELECT code,founding FROM ibj_ids WHERE customer_id=?').bind(c.id).first();
    const pr = await env.DB.prepare('SELECT display_name,level FROM member_profiles WHERE customer_id=?').bind(c.id).first();
    if (idr) member = { code: idr.code, founding: !!idr.founding, name: pr?.display_name || '', level: pr?.level || 'classic' };
    const cr = await env.DB.prepare('SELECT status FROM creators WHERE customer_id=?').bind(c.id).first();
    creator = { approved: !!cr && cr.status === 'approved' };
    if (prompts.length) {
      const ids = prompts.map((p) => p.id);
      const rows = (await env.DB.prepare('SELECT product_id,COUNT(*) AS n FROM prompt_variants WHERE product_id IN (' + ids.map(() => '?').join(',') + ') GROUP BY product_id').bind(...ids).all()).results;
      const m = new Map(rows.map((r) => [r.product_id, r.n]));
      prompts.forEach((p) => { p.ai = m.get(p.id) || 0; });
    }
  } catch (e) { /* new tables not created yet: the vault still works */ }
  return json({ email: c.email, prompts, books, purchases, member, creator });
}
async function vaultPrompt({ request, env }, url) {
  const c = await vaultCustomer(request, env);
  if (!c) return json({ error: 'Please sign in.' }, 401);
  const id = url.searchParams.get('id') || '';
  if (!CATALOG[id] || !(await owns(env, c.email, id))) return json({ error: 'Not found' }, 404);
  const kind = kindOf(id);
  if (kind === 'book') return json({ error: 'This item is a book.' }, 400);
  const orig = await env.DB.prepare('SELECT content FROM prompts WHERE product_id=?').bind(id).first();
  const vars = (await env.DB.prepare('SELECT platform,label,content,instructions FROM prompt_variants WHERE product_id=?').bind(id).all()).results;
  const have = new Map(vars.map((v) => [v.platform, v]));
  const platforms = (PLATFORMS[kind] || PLATFORMS.image).map(([slug, label]) => ({ slug, label, ready: have.has(slug) }));
  for (const v of vars) if (!platforms.some((p) => p.slug === v.platform)) platforms.push({ slug: v.platform, label: v.label || v.platform, ready: true });
  const sel = url.searchParams.get('platform');
  let adapted = null, instructions = null, label = null;
  const chosen = sel && platforms.find((p) => p.slug === sel);
  if (chosen) { const v = have.get(sel); label = chosen.label; instructions = (v && v.instructions) || HOWTO[sel] || HOWTO.other; adapted = v ? v.content : null; }
  return json({ id, title: CATALOG[id].t, kind, original: orig ? orig.content : null, platforms, selected: chosen ? sel : null, label, adapted, instructions });
}
async function vaultBook({ request, env }, url) {
  const c = await vaultCustomer(request, env);
  if (!c) return json({ error: 'Please sign in.' }, 401);
  const id = url.searchParams.get('id') || '';
  if (!CATALOG[id] || !isBook(id) || !(await owns(env, c.email, id))) return json({ error: 'Not found' }, 404);
  const b = await env.DB.prepare("SELECT title,author,blurb,cover,body,(pdf_b64 IS NOT NULL AND pdf_b64<>'') AS has_pdf FROM books WHERE product_id=?").bind(id).first();
  if (!b) return json({ error: 'This book is being prepared. Please check back soon.' }, 404);
  return json({ id, title: b.title, author: b.author, blurb: b.blurb, cover: b.cover, body: b.body || '', hasPdf: !!b.has_pdf });
}
async function vaultBookPdf({ request, env }, url) {
  const c = await vaultCustomer(request, env);
  if (!c) return json({ error: 'Please sign in.' }, 401);
  const id = url.searchParams.get('id') || '';
  if (!CATALOG[id] || !isBook(id) || !(await owns(env, c.email, id))) return json({ error: 'Not found' }, 404);
  const b = await env.DB.prepare('SELECT title,pdf_b64 FROM books WHERE product_id=?').bind(id).first();
  if (!b || !b.pdf_b64) return json({ error: 'The download is not ready yet.' }, 404);
  const bin = atob(b.pdf_b64), bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const name = String(b.title || 'book').replace(/[^A-Za-z0-9 _-]/g, '').trim().replace(/\s+/g, '-') || 'book';
  return new Response(bytes, { headers: { 'content-type': 'application/pdf', 'content-disposition': `attachment; filename="${name}.pdf"`, 'cache-control': 'private, no-store' } });
}
async function adminVariants({ request, env }, url) {
  if (request.method === 'GET') {
    const id = url.searchParams.get('id');
    if (!CATALOG[id]) return json({ error: 'Unknown product' }, 404);
    return json({ id, kind: kindOf(id), standard: PLATFORMS[kindOf(id)] || [], variants: (await env.DB.prepare('SELECT platform,label,content,instructions FROM prompt_variants WHERE product_id=?').bind(id).all()).results });
  }
  const b = await readJSON(request, 60000);
  const platform = clean(b.platform, 30).toLowerCase();
  if (!CATALOG[b.id] || isBook(b.id)) return json({ error: 'Unknown product' }, 404);
  if (!/^[a-z0-9-]{2,30}$/.test(platform)) return json({ error: 'Platform name: letters, numbers and dashes only.' }, 400);
  const content = clean(b.content, 20000);
  if (!content) await env.DB.prepare('DELETE FROM prompt_variants WHERE product_id=? AND platform=?').bind(b.id, platform).run();
  else await env.DB.prepare('INSERT INTO prompt_variants(product_id,platform,label,content,instructions,updated_at) VALUES(?,?,?,?,?,?) ON CONFLICT(product_id,platform) DO UPDATE SET label=excluded.label,content=excluded.content,instructions=excluded.instructions,updated_at=excluded.updated_at').bind(b.id, platform, clean(b.label, 60), content, clean(b.instructions, 1000), Date.now()).run();
  return json({ ok: true });
}
async function adminBooks({ request, env }) {
  if (request.method === 'GET') {
    const have = new Map((await env.DB.prepare("SELECT product_id,title,author,blurb,cover,length(body) AS chars,(pdf_b64 IS NOT NULL AND pdf_b64<>'') AS pdf FROM books").all()).results.map((r) => [r.product_id, r]));
    return json({ books: Object.entries(CATALOG).filter(([id]) => isBook(id)).map(([id, p]) => ({ id, catalogTitle: p.t, saved: have.get(id) || null })) });
  }
  const b = await readJSON(request, 2800000);
  if (!CATALOG[b.id] || !isBook(b.id)) return json({ error: 'Unknown book product' }, 404);
  const title = clean(b.title, 200), body = String(b.body ?? '').slice(0, 900000);
  if (!title) return json({ error: 'A title is required.' }, 400);
  let pdf = b.pdf_b64 ? String(b.pdf_b64) : null;
  if (pdf && (pdf.length > 1900000 || !/^[A-Za-z0-9+/=]+$/.test(pdf))) return json({ error: 'The PDF is too large (limit about 1.4 MB) or invalid.' }, 400);
  const prev = await env.DB.prepare('SELECT pdf_b64 FROM books WHERE product_id=?').bind(b.id).first();
  if (!pdf && prev) pdf = prev.pdf_b64;
  await env.DB.prepare('INSERT INTO books(product_id,title,author,blurb,cover,body,pdf_b64,updated_at) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(product_id) DO UPDATE SET title=excluded.title,author=excluded.author,blurb=excluded.blurb,cover=excluded.cover,body=excluded.body,pdf_b64=excluded.pdf_b64,updated_at=excluded.updated_at').bind(b.id, title, clean(b.author, 120), clean(b.blurb, 3000), clean(b.cover, 200), body, pdf, Date.now()).run();
  return json({ ok: true });
}

// ---------- IBJer ID, profile, card templates, marketplace (members area) ----------
const FOUNDING_LIMIT = 100; // the first 100 qualifying customers
const FOUNDING_MIN_USD = 0; // smallest verified purchase (USD) that counts toward Founding. 0 = any verified purchase.
async function ensureReferralCode(env, customerId) {
  const have = await env.DB.prepare('SELECT code FROM referral_codes WHERE customer_id=?').bind(customerId).first();
  if (have) return have.code;
  for (let i = 0; i < 6; i++) {
    const code = 'IBJ-' + rand(3).toUpperCase();
    try { await env.DB.prepare('INSERT INTO referral_codes(customer_id,code,created_at) VALUES(?,?,?)').bind(customerId, code, Date.now()).run(); return code; } catch { /* duplicate: try another */ }
  }
  return null;
}
// One permanent ID per customer: IBJ-YY-00001. Sequence restarts each year. Uniqueness is enforced by the database (UNIQUE year+seq, UNIQUE customer).
async function assignIbjId(env, customerId, orderRef, usd) {
  const have = await env.DB.prepare('SELECT * FROM ibj_ids WHERE customer_id=?').bind(customerId).first();
  if (have) return have;
  const year = new Date().getUTCFullYear(), yy = String(year).slice(-2);
  const qualifies = Number(usd) >= FOUNDING_MIN_USD ? 1 : 0;
  for (let attempt = 0; attempt < 8; attempt++) {
    const n = (await env.DB.prepare('SELECT COALESCE(MAX(seq),0)+1 AS n FROM ibj_ids WHERE year=?').bind(year).first()).n;
    const code = `IBJ-${yy}-${String(n).padStart(5, '0')}`;
    try {
      await env.DB.prepare('INSERT INTO ibj_ids(customer_id,year,seq,code,founding,qualifying_ref,created_at) VALUES(?,?,?,?, CASE WHEN ?>0 AND (SELECT COUNT(*) FROM ibj_ids WHERE founding=1)<? THEN 1 ELSE 0 END, ?,?)').bind(customerId, year, n, code, qualifies, FOUNDING_LIMIT, orderRef, Date.now()).run();
      break;
    } catch {
      const again = await env.DB.prepare('SELECT * FROM ibj_ids WHERE customer_id=?').bind(customerId).first();
      if (again) return again;
    }
  }
  const row = await env.DB.prepare('SELECT * FROM ibj_ids WHERE customer_id=?').bind(customerId).first();
  if (row) await ensureReferralCode(env, customerId);
  return row;
}
async function awardForOrder(env, order) {
  try { const c = await upsertCustomer(env, order.email); return await assignIbjId(env, c.id, order.ref, order.usd_total); }
  catch (e) { console.error('id award failed:', e && e.message); return null; }
}
async function vaultOrderLogin({ request, env }) {
  if (!(await limit(env, 'vo:' + (await ipHash(request, env)), 10, 3600))) return json({ error: 'Too many attempts. Please try again later.' }, 429);
  const b = await readJSON(request, 2000);
  const email = clean(b.email, 254).toLowerCase(), ref = clean(b.ref, 80);
  const order = validEmail(email) ? await getOrder(env, ref) : null;
  if (!order || order.status !== 'paid' || order.email !== email) return json({ error: 'We could not find a paid order with those details.' }, 400);
  const c = await upsertCustomer(env, email);
  return json({ ok: true }, 200, { 'set-cookie': vaultCookie(await newSession(env, c.id)) });
}
async function vaultProfile({ request, env }) {
  const c = await vaultCustomer(request, env);
  if (!c) return json({ error: 'Please sign in.' }, 401);
  const b = await readJSON(request, 1000);
  const name = clean(b.display_name, 40);
  if (!/^[\p{L}\p{N} ._'-]{2,40}$/u.test(name)) return json({ error: 'Use 2 to 40 letters, numbers or spaces for the name on your card.' }, 400);
  await env.DB.prepare("INSERT INTO member_profiles(customer_id,display_name,level,updated_at) VALUES(?,?,'classic',?) ON CONFLICT(customer_id) DO UPDATE SET display_name=excluded.display_name,updated_at=excluded.updated_at").bind(c.id, name, Date.now()).run();
  return json({ ok: true });
}
async function vaultCard({ request, env }) {
  const c = await vaultCustomer(request, env);
  if (!c) return json({ error: 'Please sign in.' }, 401);
  const idr = await env.DB.prepare('SELECT code,founding,created_at FROM ibj_ids WHERE customer_id=?').bind(c.id).first();
  if (!idr) return json({ member: null, template: null });
  const pr = await env.DB.prepare('SELECT display_name,level FROM member_profiles WHERE customer_id=?').bind(c.id).first();
  const level = pr?.level || 'classic', kind = idr.founding ? 'founding' : 'standard';
  const t = await env.DB.prepare('SELECT image_path,layout FROM card_templates WHERE level=? AND kind=? AND active=1').bind(level, kind).first();
  return json({ member: { code: idr.code, founding: !!idr.founding, name: pr?.display_name || '', level, joined: idr.created_at }, template: t ? { kind, image: t.image_path, layout: JSON.parse(t.layout) } : null });
}
async function marketplaceProducts({ env }) {
  try {
    const rows = (await env.DB.prepare("SELECT cp.id,cp.title,cp.description,cp.category,cp.price_usd,cp.image,c.display_name AS creator FROM creator_products cp JOIN creators c ON c.customer_id=cp.creator_id WHERE cp.status='approved' AND c.status='approved' ORDER BY cp.created_at DESC LIMIT 200").all()).results;
    return json({ products: rows });
  } catch { return json({ products: [] }); }
}
async function adminCards({ request, env }) {
  if (request.method === 'GET') return json({ templates: (await env.DB.prepare('SELECT level,kind,image_path,layout,active FROM card_templates ORDER BY level,kind').all()).results });
  const b = await readJSON(request, 4000);
  const level = clean(b.level, 20).toLowerCase(), kind = clean(b.kind, 20);
  if (!/^[a-z]{3,20}$/.test(level) || !['standard', 'founding'].includes(kind)) return json({ error: 'Choose a level and a card kind.' }, 400);
  const path = clean(b.image_path, 120);
  if (!/^\/?[A-Za-z0-9._\/-]{1,120}$/.test(path) || path.includes('..')) return json({ error: 'Image path looks wrong.' }, 400);
  let layout;
  try { layout = typeof b.layout === 'string' ? JSON.parse(b.layout) : b.layout; } catch { return json({ error: 'Layout is not valid JSON.' }, 400); }
  const okBox = (o) => o && ['x', 'y', 'size'].every((k) => typeof o[k] === 'number' && isFinite(o[k]));
  if (!layout || typeof layout.width !== 'number' || typeof layout.height !== 'number' || !okBox(layout.name) || !okBox(layout.id)) return json({ error: 'Layout needs width, height, name{x,y,size} and id{x,y,size}.' }, 400);
  const okRect = (o) => o && ['x', 'y', 'w', 'h'].every((k) => typeof o[k] === 'number' && isFinite(o[k]));
  if ((layout.date && !okBox(layout.date)) || (layout.photo && !okRect(layout.photo))) return json({ error: 'date needs x,y,size and photo needs x,y,w,h.' }, 400);
  await env.DB.prepare('INSERT INTO card_templates(level,kind,image_path,layout,active,updated_at) VALUES(?,?,?,?,1,?) ON CONFLICT(level,kind) DO UPDATE SET image_path=excluded.image_path,layout=excluded.layout,active=1,updated_at=excluded.updated_at').bind(level, kind, path, JSON.stringify(layout), Date.now()).run();
  return json({ ok: true });
}
async function adminMembers({ request, env }) {
  if (request.method === 'POST') {
    const b = await readJSON(request, 500);
    if (b.action !== 'backfill') return json({ error: 'Unknown action' }, 400);
    // give IDs to customers who paid before this system existed, in the order they first paid
    const rows = (await env.DB.prepare("SELECT email,MIN(paid_at) AS first_paid,ref,usd_total FROM orders WHERE status='paid' GROUP BY email ORDER BY first_paid ASC").all()).results;
    let n = 0;
    for (const r of rows) { const c = await upsertCustomer(env, r.email); const had = await env.DB.prepare('SELECT 1 AS x FROM ibj_ids WHERE customer_id=?').bind(c.id).first(); if (!had) { await assignIbjId(env, c.id, r.ref, r.usd_total); n++; } }
    return json({ ok: true, assigned: n });
  }
  const used = (await env.DB.prepare('SELECT COUNT(*) AS n FROM ibj_ids WHERE founding=1').first()).n;
  const rows = (await env.DB.prepare('SELECT i.code,i.founding,i.created_at,c.email,p.display_name FROM ibj_ids i JOIN customers c ON c.id=i.customer_id LEFT JOIN member_profiles p ON p.customer_id=i.customer_id ORDER BY i.created_at DESC LIMIT 300').all()).results;
  return json({ foundingUsed: used, foundingLimit: FOUNDING_LIMIT, members: rows });
}

// ---------- Router ----------
export async function onRequest(ctx) {
  const { request, env } = ctx;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '');
  const m = request.method;
  try {
    if (path === '/api/health' && m === 'GET') {
      let tables = false;
      if (env.DB) { try { await env.DB.prepare('SELECT 1 FROM orders LIMIT 1').first(); await env.DB.prepare('SELECT 1 FROM conversations LIMIT 1').first(); tables = true; } catch {} }
      const k = String(env.PAYSTACK_SECRET_KEY || '');
      return json({ ok: !!env.DB && tables, database: !!env.DB, tables, paystackKey: k ? (k.startsWith('sk_live_') ? 'live' : k.startsWith('sk_test_') ? 'test' : 'invalid') : 'missing', adminLogin: !!(env.ADMIN_PASSWORD && env.SESSION_SECRET), emailAlerts: !!(env.BREVO_API_KEY && env.ADMIN_EMAIL && env.NOTIFY_FROM) });
    }
    if (!env.DB) return json({ error: 'The database is not connected yet.' }, 503);
    if (m === 'POST' && path !== '/api/webhook' && !(request.headers.get('content-type') || '').includes('application/json')) return json({ error: 'Unsupported request' }, 415);
    if (path === '/api/checkout' && m === 'POST') return await checkout(ctx);
    if (path === '/api/verify' && m === 'GET') return await verify(ctx, url);
    if (path === '/api/webhook' && m === 'POST') return await webhook(ctx);
    if (path === '/api/chat/start' && m === 'POST') return await chatStart(ctx);
    if (path === '/api/chat/send' && m === 'POST') return await chatSend(ctx);
    if (path === '/api/chat/messages' && m === 'GET') return await chatMessages(ctx, url);
    if (path === '/api/marketplace/products' && m === 'GET') return await marketplaceProducts(ctx);
    if (path === '/api/vault/order-login' && m === 'POST') return await vaultOrderLogin(ctx);
    if (path === '/api/vault/profile' && m === 'POST') return await vaultProfile(ctx);
    if (path === '/api/vault/card' && m === 'GET') return await vaultCard(ctx);
    if (path === '/api/vault/request-link' && m === 'POST') return await vaultRequestLink(ctx);
    if (path === '/api/vault/login' && m === 'POST') return await vaultLogin(ctx);
    if (path === '/api/vault/logout' && m === 'POST') return await vaultLogout(ctx);
    if (path === '/api/vault/me' && m === 'GET') return await vaultMe(ctx);
    if (path === '/api/vault/prompt' && m === 'GET') return await vaultPrompt(ctx, url);
    if (path === '/api/vault/book' && m === 'GET') return await vaultBook(ctx, url);
    if (path === '/api/vault/book-pdf' && m === 'GET') return await vaultBookPdf(ctx, url);
    if (path === '/api/admin/login' && m === 'POST') return await adminLogin(ctx);
    if (path.startsWith('/api/admin/')) {
      if (path === '/api/admin/logout' && m === 'POST') return adminLogout();
      if (!(await isAdmin(request, env))) return json({ error: 'Please sign in.' }, 401);
      if (path === '/api/admin/conversations' && m === 'GET') return await adminConversations(ctx, url);
      if (path === '/api/admin/conversation' && m === 'GET') return await adminConversationGet(ctx, url);
      if (path === '/api/admin/conversation' && m === 'POST') return await adminConversationPost(ctx);
      if (path === '/api/admin/prompts' && (m === 'GET' || m === 'POST')) return await adminPrompts(ctx, url);
      if (path === '/api/admin/orders' && m === 'GET') return await adminOrders(ctx);
      if (path === '/api/admin/cards' && (m === 'GET' || m === 'POST')) return await adminCards(ctx);
      if (path === '/api/admin/members' && (m === 'GET' || m === 'POST')) return await adminMembers(ctx);
      if (path === '/api/admin/variants' && (m === 'GET' || m === 'POST')) return await adminVariants(ctx, url);
      if (path === '/api/admin/books' && (m === 'GET' || m === 'POST')) return await adminBooks(ctx);
    }
    return json({ error: 'Not found' }, 404);
  } catch (e) {
    console.error('api error:', e && e.message);
    return json({ error: e && e.status === 413 ? 'Message too large.' : e && e.status === 400 ? 'Invalid request.' : 'Something went wrong. Please try again.' }, (e && e.status) || 500);
  }
}
