const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js",
    "/manifest.json",
    "/styles.css",
    "/app.js"
  ];

  const CACHE_NAME = "static-cache";
  const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener('install', (evt) => {
    console.log('service worker has been installed');

    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
          console.log("Your files were pre-cached successfully!");
          return cache.addAll(FILES_TO_CACHE);
        })
      );
    
      self.skipWaiting();
});

//activate
self.addEventListener('activate', (evt) => {
    console.log('service worker has been activated');
});

self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request)
        .then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});