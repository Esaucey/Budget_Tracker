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

// self.addEventListener("fetch", function (evt) {
//     if (evt.request.url.includes("/api/")) {
//       evt.respondWith(
//         caches
//           .open(DATA_CACHE_NAME)
//           .then((cache) => {
//             return fetch(evt.request)
//               .then((response) => {
//                 if (response.status === 200) {
//                   cache.put(evt.request.url, response.clone());
//                 }
  
//                 return response;
//               })
//               .catch((err) => {
//                 return cache.match(evt.request);
//               });
//           })
//           .catch((err) => console.log(err))
//       );
  
//       return;
//     }
  
//     evt.respondWith(
//       caches.open(CACHE_NAME).then((cache) => {
//         return cache.match(evt.request).then((response) => {
//           return response || fetch(evt.request);
//         });
//       })
//     );
//   });