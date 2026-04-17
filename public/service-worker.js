self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('baby-meals-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/index-25Juu2U-.css',
        '/assets/index-DbpSw72k.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});