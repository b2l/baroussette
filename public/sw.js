const version = 'v3';

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(version)
      .then(cache =>
        cache.addAll(['/', '/index.html', '/icons/launcher-icon-1x.png'])
      )
  );
});

self.addEventListener('activate', event => {
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
