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
      return response || fetch(event.request);
    })
  );
});
/* eslint-enable no-restricted-globals */
