self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('baby-meals-cache').then((cache) => {
      return cache.addAll([
        '/toddlermeals',
        '/toddlermeals/index.html',
        '/toddlermeals/assets/index-25Juu2U-.css',
        '/toddlermeals/assets/index-DbpSw72k.js'
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