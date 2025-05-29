const CACHE_NAME = 'mi-tienda-cache-v1';
const urlsToCache = [
  '/mi-tienda-webview/',
  '/mi-tienda-webview/index.html',
  '/mi-tienda-webview/manifest.json',
  '/mi-tienda-webview/style/style.css',
  '/mi-tienda-webview/icons/icon-192.png',
  '/mi-tienda-webview/icons/icon-512.png',
  '/mi-tienda-webview/js/api.js',
  '/mi-tienda-webview/js/buscador.js',
  '/mi-tienda-webview/js/filtro.js',
  '/mi-tienda-webview/js/favoritos.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
