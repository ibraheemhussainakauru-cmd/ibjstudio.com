/* IBJSTUDIO store add-on: currency switcher, secure checkout, support chat.
   Contains NO secret keys. All prices and payments are decided on the server. */
(function () {
  'use strict';
  if (window.__ibjStore) return; window.__ibjStore = true;

  var API = '/api';
  var CURS = {
    USD: { sym: '$', dec: 2, label: 'USD ($)' }, NGN: { sym: '\u20A6', dec: 0, label: 'NGN (\u20A6)' },
    GBP: { sym: '\u00A3', dec: 2, label: 'GBP (\u00A3)' }, EUR: { sym: '\u20AC', dec: 2, label: 'EUR (\u20AC)' }, CAD: { sym: 'C$', dec: 2, label: 'CAD (C$)' }
  };
  var LS = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k]; else if (k === 'class') n.className = attrs[k];
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function api(method, path, body) {
    return fetch(API + path, { method: method, headers: body ? { 'content-type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined, credentials: 'same-origin' })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j._status = r.status; return j; }); });
  }

  /* ---------------- styles (use the site's own colours) ---------------- */
  var css = document.createElement('style');
  css.textContent = [
    '.ibj-cur{order:1;margin-inline-start:.4rem;max-width:5.6rem}',
    '@media(max-width:480px){header{gap:.45rem!important}.ibj-cur,header .lang{font-size:.78rem;padding:.5rem .3rem}.ibj-cur{margin-inline-start:0;max-width:4.9rem}header .lang{max-width:5.4rem}.brand{letter-spacing:.1em}}',
    '.ibj-cur.busy{opacity:.55;pointer-events:none}',
    '.ibjt{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(8.2rem + env(safe-area-inset-bottom,0px));z-index:80;max-width:min(92vw,440px);padding:.7rem 1rem;background:var(--panel);border:1px solid var(--gold);color:var(--ink);font-size:.85rem;text-align:center}',
    '.ibjm{position:fixed;inset:0;z-index:70;background:rgba(4,4,4,.88);display:flex;align-items:flex-end;justify-content:center;overflow:auto;padding:0}',
    '@media(min-width:620px){.ibjm{align-items:center;padding:1.5rem}}',
    '.ibjp{background:var(--panel);border:1px solid var(--line);width:100%;max-width:520px;max-height:94vh;overflow:auto;padding:1.4rem 1.3rem calc(1.4rem + env(safe-area-inset-bottom,0px));position:relative}',
    '.ibjp h2{font-size:1.35rem;margin:0 0 .3rem;padding-right:2.4rem}.ibjp p{max-width:none}',
    '.ibjx{position:absolute;top:.7rem;right:.7rem;width:40px;height:40px;border-radius:50%;border:1px solid #8a7550;background:rgba(10,10,10,.6);color:var(--ink);font-size:1.1rem;cursor:pointer}',
    '.ibjl{display:flex;justify-content:space-between;gap:1rem;padding:.7rem 0;border-bottom:1px solid var(--line);font-size:.9rem}',
    '.ibjl small{display:block;color:var(--mute);font-size:.78rem;line-height:1.35;margin-top:.15rem}.ibjl b{color:var(--gold);font-weight:500;white-space:nowrap;text-align:right}.ibjl b small{color:var(--mute);font-weight:300}',
    '.ibjtot{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;padding:1rem 0 .4rem}.ibjtot b{font-size:1.5rem;font-weight:600;color:var(--gold)}',
    '.ibjnote{font-size:.8rem;color:var(--mute);line-height:1.5;margin:.6rem 0 1rem;padding:.8rem 1rem;border-left:2px solid var(--gold);background:rgba(255,255,255,.03)}',
    '.ibjf{display:block;width:100%;font:inherit;font-size:1rem;color:var(--ink);background:var(--bg);border:1px solid var(--line);padding:.75rem .8rem;margin:0 0 .7rem;border-radius:0}.ibjf:focus{outline:2px solid var(--gold);outline-offset:1px}',
    '.ibjerr{color:#f0a0a0;font-size:.85rem;min-height:1.2rem;margin:.2rem 0 .6rem}.ibjok{color:var(--gold)}',
    '.ibjc-btn{position:fixed;right:max(1rem,env(safe-area-inset-right,0px));bottom:calc(5.9rem + env(safe-area-inset-bottom,0px));z-index:46;width:52px;height:52px;border-radius:50%;border:1px solid var(--gold);background:rgba(21,21,21,.95);color:var(--gold);display:grid;place-items:center;cursor:pointer;box-shadow:0 6px 22px rgba(0,0,0,.5)}',
    'body:has(#ckn:not([hidden])) .ibjc-btn{bottom:calc(10rem + env(safe-area-inset-bottom,0px))}',
    '.ibjc-btn:hover{background:var(--gold);color:var(--onGold)}.ibjc-dot{position:absolute;top:2px;right:2px;width:12px;height:12px;border-radius:50%;background:var(--gold);border:2px solid var(--bg)}',
    '.ibjc{position:fixed;right:max(1rem,env(safe-area-inset-right,0px));bottom:calc(5.9rem + env(safe-area-inset-bottom,0px));z-index:48;width:min(370px,calc(100vw - 2rem));height:min(540px,calc(100vh - 8rem));display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--gold);box-shadow:0 10px 40px rgba(0,0,0,.6)}',
    '.ibjc[hidden],.ibjc-btn[hidden],.ibj-hide{display:none!important}',
    '.ibjc-h{display:flex;align-items:center;gap:.6rem;padding:.8rem 1rem;border-bottom:1px solid var(--line)}.ibjc-h b{font-weight:600;flex:1}.ibjc-h small{color:var(--mute);display:block;font-weight:300;font-size:.74rem}',
    '.ibjc-h button{background:none;border:0;color:var(--ink);font-size:1.2rem;cursor:pointer;min-width:40px;min-height:40px}',
    '.ibjc-s{width:9px;height:9px;border-radius:50%;background:#6b6b6b;flex:none}.ibjc-s.on{background:#5fcf80}',
    '.ibjc-l{flex:1;overflow:auto;padding:.9rem 1rem;display:flex;flex-direction:column;gap:.55rem}',
    '.ibjc-m{max-width:84%;padding:.55rem .75rem;font-size:.9rem;line-height:1.45;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere}',
    '.ibjc-m.them{align-self:flex-start;background:#222;border:1px solid var(--line)}.ibjc-m.me{align-self:flex-end;background:var(--gold);color:var(--onGold)}.ibjc-m.sys{align-self:center;max-width:94%;background:none;color:var(--mute);font-size:.78rem;text-align:center;padding:.2rem}',
    '.ibjc-m small{display:block;opacity:.65;font-size:.68rem;margin-top:.2rem}',
    '.ibjc-f{border-top:1px solid var(--line);padding:.7rem}.ibjc-f .ibjf{margin-bottom:.45rem;padding:.6rem .7rem;font-size:.95rem}.ibjc-f textarea.ibjf{resize:none;height:4.2rem}',
    '.ibjc-f .btn{width:100%;text-align:center;padding:.65rem}.ibjc-w{font-size:.7rem;color:var(--mute);margin:.45rem 0 0;line-height:1.35}',
    '@media(max-width:480px){.ibjc{left:.6rem;right:.6rem;width:auto;height:min(72vh,540px)}}'
  ].join('\n');
  document.head.appendChild(css);

  function toast(msg) {
    var old = document.querySelector('.ibjt'); if (old) old.remove();
    var t = el('div', { class: 'ibjt', role: 'status', text: msg }); document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 4500);
  }

  /* ================= CURRENCY ================= */
  var cur = LS.get('ibjcur'); if (!CURS[cur]) cur = 'USD';
  var fx = null; try { fx = JSON.parse(LS.get('ibjfx') || 'null'); } catch (e) { fx = null; }
  var FX_FRESH_MS = 6 * 3600 * 1000;
  var ratesPromise = null;

  function ensureRates() {
    if (fx && Date.now() - fx.savedAt < FX_FRESH_MS) return Promise.resolve(fx);
    if (ratesPromise) return ratesPromise;
    ratesPromise = fetch(API + '/rates').then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.rates) throw new Error('rates'); return j; }); })
      .then(function (j) { fx = { rates: j.rates, ngnCharge: j.ngnCharge, asOf: j.asOf, savedAt: Date.now() }; LS.set('ibjfx', JSON.stringify(fx)); ratesPromise = null; return fx; })
      .catch(function (e) { ratesPromise = null; if (fx) { toast('Live rates are unavailable, so we are using the last saved rates.'); return fx; } throw e; });
    return ratesPromise;
  }
  function conv(usd, c, snap) {
    var s = snap || fx;
    if (c === 'USD') return usd;
    if (c === 'NGN') return Math.ceil(usd * s.ngnCharge / 10 - 1e-9) * 10;
    return usd * s.rates[c];
  }
  function money(n, c) { var d = CURS[c].dec; return CURS[c].sym + n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  var PRICE_RE = /\$\s?(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)/g;
  var recs = new WeakMap();

  function convertNode(n) {
    var rec = recs.get(n), now = n.nodeValue, orig;
    if (rec && now === rec.out) orig = rec.orig; else orig = now;
    if (orig.search(/\$\s?\d/) < 0) { if (rec) recs.delete(n); return; }
    var out = (cur === 'USD' || !fx) ? orig : orig.replace(PRICE_RE, function (m, num) { return money(conv(parseFloat(num.replace(/,/g, '')), cur), cur); });
    recs.set(n, { orig: orig, out: out });
    if (out !== now) n.nodeValue = out;
  }
  function skip(n) {
    var p = n.parentNode; if (!p) return true;
    var t = p.nodeName; if (t === 'SCRIPT' || t === 'STYLE' || t === 'TEXTAREA' || t === 'OPTION' || t === 'NOSCRIPT') return true;
    return !!(p.closest && p.closest('[data-ibj-skip]'));
  }
  function convertTree(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (!skip(root)) convertNode(root); return; }
    if (root.nodeType !== 1) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n, list = [];
    while ((n = w.nextNode())) if (!skip(n)) list.push(n);
    list.forEach(convertNode);
  }
  function renderAll() { convertTree(document.body); }

  var sel;
  function buildSelector() {
    var lang = document.getElementById('lang');
    sel = el('select', { class: 'lang ibj-cur', id: 'ibjcur', 'aria-label': 'Currency' });
    Object.keys(CURS).forEach(function (c) { var o = el('option', { value: c, text: CURS[c].label }); if (c === cur) o.selected = true; sel.appendChild(o); });
    if (lang && lang.parentNode) lang.parentNode.insertBefore(sel, lang.nextSibling);
    else { var h = document.querySelector('header'); if (h) h.insertBefore(sel, h.querySelector('.menu-btn')); }
    sel.addEventListener('change', function () {
      var want = sel.value;
      if (want === 'USD') { cur = 'USD'; LS.set('ibjcur', cur); renderAll(); return; }
      sel.classList.add('busy'); sel.setAttribute('aria-busy', 'true');
      ensureRates().then(function () { cur = want; LS.set('ibjcur', cur); renderAll(); })
        .catch(function () { sel.value = cur; toast('Exchange rates are unavailable right now. Prices are shown in ' + cur + '.'); })
        .then(function () { sel.classList.remove('busy'); sel.removeAttribute('aria-busy'); });
    });
  }
  function startCurrency() {
    buildSelector();
    var langSel = document.getElementById('lang');
    if (langSel) langSel.addEventListener('change', function () { setTimeout(renderAll, 0); });
    new MutationObserver(function (muts) {
      if (cur === 'USD' || !fx) return;
      muts.forEach(function (m) { m.addedNodes.forEach(function (n) { convertTree(n); }); });
    }).observe(document.body, { childList: true, subtree: true });
    if (cur !== 'USD') ensureRates().then(renderAll).catch(function () { cur = 'USD'; sel.value = 'USD'; toast('Exchange rates are unavailable right now. Prices are shown in USD.'); });
  }

  /* ================= CHECKOUT ================= */
  function readCart() { try { var c = JSON.parse(LS.get('ibjcart') || '[]'); return Array.isArray(c) ? c : []; } catch (e) { return []; } }
  function descFor(id) {
    var cards = document.querySelectorAll('.card.item');
    for (var i = 0; i < cards.length; i++) if (cards[i].dataset.pid === id) return cards[i].dataset.d || '';
    return id === 'kingdom-pdf-499' ? 'Digital PDF novel (18+)' : '';
  }
  var modal = null;
  function closeModal() { if (modal) { modal.remove(); modal = null; document.body.style.overflow = ''; } }
  function openModal(title) {
    closeModal(); closeChat();
    var body = el('div', { 'data-ibj-skip': '1' });
    var panel = el('div', { class: 'ibjp', role: 'dialog', 'aria-modal': 'true', 'aria-label': title }, [
      el('button', { class: 'ibjx', type: 'button', 'aria-label': 'Close', text: '\u2715', onclick: closeModal }), el('h2', { text: title }), body]);
    modal = el('div', { class: 'ibjm', 'data-ibj-skip': '1' }, [panel]);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.body.appendChild(modal); document.body.style.overflow = 'hidden';
    return body;
  }
  function openCheckout() {
    var cart = readCart(); if (!cart.length) return;
    var ids = cart.map(function (i) { return i.id; });
    var body = openModal('Secure checkout');
    body.appendChild(el('p', { class: 'muted', text: 'Getting your latest price\u2026' }));
    api('POST', '/quote', { items: ids }).then(function (q) {
      if (!q.ok) { body.textContent = ''; body.appendChild(el('p', { class: 'ibjerr', text: q.error || 'We could not load your price. Please try again.' })); return; }
      renderCheckout(body, cart, q);
    }).catch(function () { body.textContent = ''; body.appendChild(el('p', { class: 'ibjerr', text: 'We could not reach the server. Please check your connection.' })); });
  }
  function renderCheckout(body, cart, q) {
    var snap = { rates: q.rates, ngnCharge: q.ngnCharge }, titles = {};
    cart.forEach(function (i) { titles[i.id] = i.t; });
    body.textContent = '';
    q.lines.forEach(function (l) {
      var usd = l.usdCents / 100, d = descFor(l.id);
      var price = el('b', { text: '$' + usd.toFixed(2) }); if (cur !== 'USD') { price.appendChild(el('small', { text: money(conv(usd, cur, snap), cur) })); price.lastChild.style.display = 'block'; }
      body.appendChild(el('div', { class: 'ibjl' }, [el('span', null, [titles[l.id] || l.id, d ? el('small', { text: d }) : null]), price]));
    });
    var usdTotal = q.usdCents / 100;
    body.appendChild(el('div', { class: 'ibjl' }, [el('span', { text: 'Base price (USD)' }), el('b', { text: '$' + usdTotal.toFixed(2) })]));
    if (cur !== 'USD' && cur !== 'NGN') body.appendChild(el('div', { class: 'ibjl' }, [el('span', { text: 'In your currency (' + cur + ', estimate)' }), el('b', { text: money(conv(usdTotal, cur, snap), cur) })]));
    var totalB = el('b', { text: money(q.ngn, 'NGN') });
    body.appendChild(el('div', { class: 'ibjtot' }, [el('span', { text: 'You will be charged' }), totalB]));
    var noteP = el('p', { class: 'ibjnote', text: 'Payments are processed by Paystack in Nigerian Naira (NGN). The \u20A6 amount above is the exact amount charged. If your card is not in NGN, your bank may convert the charge at its own rate and may add fees, so we cannot promise an exact ' + (cur === 'NGN' ? 'foreign-currency' : cur) + ' amount. Prices in other currencies are estimates.' });
    body.appendChild(noteP);
    var name = el('input', { class: 'ibjf', type: 'text', placeholder: 'Your name', autocomplete: 'name', maxlength: '80', 'aria-label': 'Your name' });
    var email = el('input', { class: 'ibjf', type: 'email', placeholder: 'Email for your receipt and delivery', autocomplete: 'email', maxlength: '254', 'aria-label': 'Email' });
    var err = el('div', { class: 'ibjerr', role: 'alert' });
    var expected = q.ngn;
    var pay = el('button', { class: 'btn', type: 'button', style: 'width:100%;text-align:center' });
    function label() { pay.textContent = 'Pay ' + money(expected, 'NGN') + ' with Paystack'; totalB.textContent = money(expected, 'NGN'); }
    label();
    pay.addEventListener('click', function () {
      err.textContent = ''; err.className = 'ibjerr';
      if (name.value.trim().length < 2) { err.textContent = 'Please enter your name.'; name.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { err.textContent = 'Please enter a valid email address.'; email.focus(); return; }
      pay.disabled = true; pay.textContent = 'Opening Paystack\u2026';
      api('POST', '/checkout', { items: cart.map(function (i) { return i.id; }), name: name.value.trim(), email: email.value.trim(), currency: cur, expectedNgn: expected }).then(function (r) {
        if (r.ok && r.authorization_url) { location.href = r.authorization_url; return; }
        pay.disabled = false;
        if (r.code === 'price_changed') { expected = r.ngn; label(); err.textContent = 'The exchange rate was just updated. Please check the new amount and press Pay again.'; return; }
        label(); err.textContent = r.error || 'We could not start the payment. Please try again.';
      }).catch(function () { pay.disabled = false; label(); err.textContent = 'We could not reach the server. Please try again.'; });
    });
    body.appendChild(name); body.appendChild(email); body.appendChild(err); body.appendChild(pay);
    var terms = el('p', { class: 'ibjnote', style: 'border-left-color:var(--line);margin-bottom:.6rem' }, ['By paying you agree to our ', el('a', { href: '#terms', text: 'Terms of Service and refunds', onclick: closeModal }), '. Digital products cannot be refunded once delivered.']);
    body.appendChild(el('div', { style: 'height:.8rem' })); body.appendChild(terms);
    var wa = document.getElementById('checkout');
    if (wa && wa.href && wa.href.indexOf('whatsapp') > -1) body.appendChild(el('p', { style: 'text-align:center;margin:0' }, [el('a', { href: wa.href, target: '_blank', rel: 'noopener', text: 'Prefer WhatsApp? Order there instead', style: 'color:var(--gold)' })]));
  }
  function addPayButton() {
    var co = document.getElementById('checkout'); if (!co || document.getElementById('ibjpay')) return;
    var b = el('button', { class: 'btn', id: 'ibjpay', type: 'button', text: 'Pay securely with Paystack', style: 'margin:1rem .6rem 0 0;cursor:pointer', onclick: openCheckout });
    co.parentNode.insertBefore(b, co);
    co.textContent = 'Order on WhatsApp'; co.classList.add('ghost'); co.style.marginTop = '1rem';
    function sync() { b.hidden = co.hidden; }
    sync(); new MutationObserver(sync).observe(co, { attributes: true, attributeFilter: ['hidden'] });
    var notes = document.querySelectorAll('#n-cart p.muted.small');
    notes.forEach(function (p) { if (p.textContent.indexOf('Card payment is being connected') > -1) p.textContent = 'Pay securely with Paystack (card, bank transfer or USSD), or send your order to us on WhatsApp. Paystack charges in Nigerian Naira.'; });
  }

  /* ----- return from Paystack ----- */
  function showReceipt(ref) {
    var body = openModal('Payment received');
    body.appendChild(el('p', { text: 'Thank you! Paystack has confirmed your payment and your order is now being prepared.' }));
    body.appendChild(el('p', { class: 'ibjnote', text: 'Your reference: ' + ref + '. Keep it safe. We will deliver your order using the email you gave at checkout. If you need anything, message us in the chat or on WhatsApp and quote this reference.' }));
    body.appendChild(el('button', { class: 'btn', type: 'button', text: 'Done', onclick: closeModal }));
  }
  function handleReturn() {
    var u = new URL(location.href), ref = u.searchParams.get('paid');
    var receipt = null; try { receipt = sessionStorage.getItem('ibj_receipt'); } catch (e) { /* ignore */ }
    if (receipt) { try { sessionStorage.removeItem('ibj_receipt'); } catch (e) { /* ignore */ } showReceipt(receipt); return; }
    if (!ref || !/^ibj_[a-f0-9]{24}$/.test(ref)) return;
    var body = openModal('Confirming your payment'); var tries = 0;
    body.appendChild(el('p', { text: 'Please wait while we confirm your payment with Paystack\u2026' }));
    function finish(extra) { history.replaceState(null, '', '/' + (extra || '') + '#n-cart'); }
    (function poll() {
      api('GET', '/status?ref=' + ref).then(function (s) {
        if (s.status === 'paid') { LS.del('ibjcart'); try { sessionStorage.setItem('ibj_receipt', ref); } catch (e) { /* ignore */ } finish(); location.reload(); return; }
        if (s.status === 'failed') { body.textContent = ''; body.appendChild(el('p', { text: 'Your payment was not completed, so you have not been charged. Your cart is still saved if you would like to try again.' })); body.appendChild(el('button', { class: 'btn', type: 'button', text: 'Close', onclick: closeModal })); finish(); return; }
        if (s.status === 'review') { body.textContent = ''; body.appendChild(el('p', { class: 'ibjnote', text: 'We received a payment that needs a manual check. Please message us with this reference: ' + ref + '.' })); body.appendChild(el('button', { class: 'btn', type: 'button', text: 'Close', onclick: closeModal })); finish(); return; }
        if (++tries < 10) setTimeout(poll, 3000);
        else { body.textContent = ''; body.appendChild(el('p', { class: 'ibjnote', text: 'We have not received confirmation yet. If money left your account, please message us with this reference: ' + ref + '. We will sort it out.' })); body.appendChild(el('button', { class: 'btn', type: 'button', text: 'Close', onclick: closeModal })); finish(); }
      }).catch(function () { if (++tries < 10) setTimeout(poll, 3000); });
    })();
  }

  /* ================= SUPPORT CHAT ================= */
  var chat = null, convo = null, lastId = 0, online = false, openFlag = false, timer = null, panel, btn, listEl, formEl, dot;
  try { convo = JSON.parse(LS.get('ibjchat') || 'null'); } catch (e) { convo = null; }
  var ICON = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.3A8 8 0 1121 12z"/></svg>';
  function addMsg(kind, text, at) {
    var m = el('div', { class: 'ibjc-m ' + kind }); m.appendChild(document.createTextNode(text));
    if (at) m.appendChild(el('small', { text: new Date(at * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
    listEl.appendChild(m); listEl.scrollTop = listEl.scrollHeight; return m;
  }
  function setOnline(v) {
    online = !!v; var s = panel.querySelector('.ibjc-s'), t = panel.querySelector('.ibjc-st');
    s.className = 'ibjc-s' + (online ? ' on' : ''); t.textContent = online ? 'We are online' : 'We are away. Leave a message';
  }
  function renderMsgs(msgs) {
    msgs.forEach(function (m) { if (m.id > lastId) { lastId = m.id; addMsg(m.sender === 'admin' ? 'them' : 'me', m.body, m.at); } });
  }
  function poll() {
    if (!openFlag && !convo) return;
    var q = convo ? '?c=' + convo.c + '&t=' + convo.t + '&after=' + lastId : '';
    api('GET', '/chat' + q).then(function (r) {
      if (r._status === 404 && convo) { LS.del('ibjchat'); convo = null; lastId = 0; return; }
      if (typeof r.online === 'boolean') setOnline(r.online);
      if (r.messages && r.messages.length) {
        if (openFlag) renderMsgs(r.messages); else { var fromAdmin = r.messages.some(function (m) { return m.sender === 'admin' && m.id > Number(LS.get('ibjseen') || 0); }); if (fromAdmin) dot.hidden = false; }
      }
    }).catch(function () { /* try again next tick */ });
  }
  function schedule() { clearInterval(timer); timer = setInterval(function () { if (!document.hidden) poll(); }, openFlag ? 4000 : 30000); }
  function buildForm() {
    formEl.textContent = '';
    var hp = el('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true', style: 'position:absolute;left:-9999px;opacity:0' });
    var name = convo ? null : el('input', { class: 'ibjf', type: 'text', placeholder: 'Your name', autocomplete: 'name', maxlength: '80', 'aria-label': 'Your name' });
    var email = convo ? null : el('input', { class: 'ibjf', type: 'email', placeholder: 'Your email', autocomplete: 'email', maxlength: '254', 'aria-label': 'Your email' });
    var msg = el('textarea', { class: 'ibjf', placeholder: 'Type your message\u2026', maxlength: '2000', 'aria-label': 'Message' });
    var err = el('div', { class: 'ibjerr', role: 'alert', style: 'margin:0 0 .3rem;min-height:0' });
    var send = el('button', { class: 'btn', type: 'button', text: 'Send' });
    send.addEventListener('click', function () {
      err.textContent = '';
      var text = msg.value.trim(); if (!text) { err.textContent = 'Please type a message.'; return; }
      if (!convo) { if (name.value.trim().length < 2) { err.textContent = 'Please enter your name.'; return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { err.textContent = 'Please enter a valid email address.'; return; } }
      send.disabled = true;
      var payload = { message: text, website: hp.value }; if (convo) { payload.c = convo.c; payload.t = convo.t; } else { payload.name = name.value.trim(); payload.email = email.value.trim(); }
      api('POST', '/chat', payload).then(function (r) {
        send.disabled = false;
        if (!r.ok) { err.textContent = r.error || 'Your message could not be sent. Please try again.'; return; }
        msg.value = '';
        if (!convo && r.c && r.t) { convo = { c: r.c, t: r.t }; LS.set('ibjchat', JSON.stringify(convo)); buildForm(); }
        setOnline(r.online);
        poll();
        addMsg('sys', r.online ? 'Message sent.' : 'Message received. We are away right now, so a reply may not be immediate. We will answer as soon as we can.');
      }).catch(function () { send.disabled = false; err.textContent = 'Could not reach the server. Please try again.'; });
    });
    [hp, name, email, msg, err, send].forEach(function (n) { if (n) formEl.appendChild(n); });
    formEl.appendChild(el('p', { class: 'ibjc-w', text: 'Never share card numbers, PINs, passwords or one-time codes in this chat.' }));
  }
  function buildChat() {
    btn = el('button', { class: 'ibjc-btn', type: 'button', 'aria-label': 'Chat with IBJSTUDIO support', 'data-ibj-skip': '1', onclick: function () { openFlag ? closeChat() : openChat(); } });
    btn.innerHTML = ICON; dot = el('span', { class: 'ibjc-dot', hidden: '' }); btn.appendChild(dot);
    listEl = el('div', { class: 'ibjc-l', 'aria-live': 'polite' }); formEl = el('div', { class: 'ibjc-f' });
    panel = el('div', { class: 'ibjc', role: 'dialog', 'aria-label': 'Support chat', hidden: '', 'data-ibj-skip': '1' }, [
      el('div', { class: 'ibjc-h' }, [el('span', { class: 'ibjc-s' }), el('b', null, ['IBJSTUDIO Support', el('small', { class: 'ibjc-st', text: 'Checking\u2026' })]), el('button', { type: 'button', 'aria-label': 'Close chat', text: '\u2715', onclick: closeChat })]),
      listEl, formEl]);
    document.body.appendChild(panel); document.body.appendChild(btn);
    buildForm();
  }
  function openChat() {
    closeModal(); openFlag = true; panel.hidden = false; btn.classList.add('ibj-hide'); dot.hidden = true;
    if (!listEl.childNodes.length) {
      addMsg('them', 'Hello! Welcome to IBJSTUDIO. How can we help you today?');
      addMsg('sys', 'Ask about services, pricing or payments.');
    }
    if (convo && !lastId) { api('GET', '/chat?c=' + convo.c + '&t=' + convo.t + '&after=0').then(function (r) { if (r.messages) renderMsgs(r.messages); if (typeof r.online === 'boolean') setOnline(r.online); }); }
    else poll();
    if (!convo) api('GET', '/chat').then(function (r) { if (typeof r.online === 'boolean') { setOnline(r.online); if (!r.online) addMsg('sys', 'We are away right now. Leave a message and we will reply as soon as we can. A response may not be immediate.'); } });
    schedule();
  }
  function closeChat() {
    if (!panel) return;
    if (lastId) LS.set('ibjseen', String(lastId));
    openFlag = false; panel.hidden = true; btn.classList.remove('ibj-hide'); schedule();
  }

  /* ================= start ================= */
  function start() {
    startCurrency(); addPayButton(); buildChat(); handleReturn();
    if (convo) { setTimeout(poll, 1500); schedule(); }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeChat(); } });
    // the cart button can appear after the page script builds it
    new MutationObserver(addPayButton).observe(document.getElementById('pg') || document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
