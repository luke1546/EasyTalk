/* eslint-disable no-restricted-globals */
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll(["/", "/index.html", "/icon-192.png", "/icon-512.png"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).catch(function (error) {
          console.error("Fetch failed:", error);
          throw error;
        });
      }
    })
  );
});
/* eslint-enable no-restricted-globals */