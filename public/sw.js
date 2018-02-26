const version = 'v7';

self.addEventListener('install', event => {
  console.log('installing service worker');
  event.waitUntil(
    caches
      .open(version)
      .then(cache =>
        cache.addAll(['/', '/index.html', '/icons/launcher-icon-1x.png'])
      )
  );
});

self.addEventListener('activate', event => {
  console.log('activating service worker');
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (version !== cacheName) return caches.delete(cacheName);
          })
        )
      )
      .then(self.clients.claim())
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
