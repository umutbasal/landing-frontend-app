const CACHE_NAME = 'pwa-hhs-cache';
const URLS_TO_CACHE = [
  '/',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png',
  '/assets/hhs-b.avif',
  '/assets/hhs-black.avif',
  '/assets/hhs-white.avif',
  '/assets/hhs.avif',
  '/manifesto',
  '/team',
  '/events',
  '/contact',
  '/history'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // only cache here
  if (event.request.mode === 'navigate' || event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((response) => {

        if (response) {
          return response;
        }
        // new request, fetch from network
        return fetch(event.request).then((networkResponse) => {

          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      }).catch(() => {
        // requests when offline
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
    );
  } else {
    // return cached version or fetch from network
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
