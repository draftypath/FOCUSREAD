const CACHE_NAME = 'bionic-focus-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json'
];

// Install event: Cache the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Fetch event: Serve from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      // If offline and request fails, serve the cached index.html
      return caches.match('./index.html');
    })
  );
});