self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', () => {});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith((async ()=>{
    const cache = await caches.open('ifast-v1');
    const cached = await cache.match(req);
    if (cached) return cached;
    const res = await fetch(req);
    if (res.ok && (req.url.startsWith(self.location.origin))) cache.put(req, res.clone());
    return res;
  })());
});