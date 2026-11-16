/* Adds the new features to your pages automatically, so index.html never needs editing.
   If anything goes wrong here, your normal page is served untouched. */
export async function onRequest(context) {
  const res = await context.next();
  try {
    const url = new URL(context.request.url);
    const type = res.headers.get('content-type') || '';
    if (!type.includes('text/html') || url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin')) return res;
    return new HTMLRewriter()
      .on('head', { element(el) { el.append('<script src="/ibj-store.js?v=1" defer></script>', { html: true }); } })
      .transform(res);
  } catch (e) { return res; }
}
