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
  const out = [];
  for (const id of JSON.parse(order.items)) {
    const p = await env.DB.prepare('SELECT content FROM prompts WHERE product_id=?').bind(id).first();
    out.push({ id, title: CATALOG[id]?.t || id, content: p ? p.content : null });
  }
  return out;
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
  return json({ status: 'paid', reference: ref, ngn: fresh.ngn_kobo / 100, items: await deliver(env, fresh) });
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
  return json({ ok: true, paid: true, first: await markPaid(env, order, tx) });
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

// ---------- Router ----------
export async function onRequest(ctx) {
  const { request, env } = ctx;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '');
  const m = request.method;
  try {
    if (!env.DB) return json({ error: 'The database is not connected yet.' }, 503);
    if (m === 'POST' && path !== '/api/webhook' && !(request.headers.get('content-type') || '').includes('application/json')) return json({ error: 'Unsupported request' }, 415);
    if (path === '/api/checkout' && m === 'POST') return await checkout(ctx);
    if (path === '/api/verify' && m === 'GET') return await verify(ctx, url);
    if (path === '/api/webhook' && m === 'POST') return await webhook(ctx);
    if (path === '/api/chat/start' && m === 'POST') return await chatStart(ctx);
    if (path === '/api/chat/send' && m === 'POST') return await chatSend(ctx);
    if (path === '/api/chat/messages' && m === 'GET') return await chatMessages(ctx, url);
    if (path === '/api/admin/login' && m === 'POST') return await adminLogin(ctx);
    if (path.startsWith('/api/admin/')) {
      if (path === '/api/admin/logout' && m === 'POST') return adminLogout();
      if (!(await isAdmin(request, env))) return json({ error: 'Please sign in.' }, 401);
      if (path === '/api/admin/conversations' && m === 'GET') return await adminConversations(ctx, url);
      if (path === '/api/admin/conversation' && m === 'GET') return await adminConversationGet(ctx, url);
      if (path === '/api/admin/conversation' && m === 'POST') return await adminConversationPost(ctx);
      if (path === '/api/admin/prompts' && (m === 'GET' || m === 'POST')) return await adminPrompts(ctx, url);
      if (path === '/api/admin/orders' && m === 'GET') return await adminOrders(ctx);
    }
    return json({ error: 'Not found' }, 404);
  } catch (e) {
    console.error('api error:', e && e.message);
    return json({ error: e && e.status === 413 ? 'Message too large.' : e && e.status === 400 ? 'Invalid request.' : 'Something went wrong. Please try again.' }, (e && e.status) || 500);
  }
}
