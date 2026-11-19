const CACHE_NAME = 'echo-cache-v3';

const CACHE_FILES = [
    "/",
    "/lab6.html",
    "/style.css",
    "/dom.js",
    "/script.js",
    "/manifest.json",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/pictures/profile-picture.png",
    "/pictures/drawing.png",
    "/pictures/ceramics.png",
    "/pictures/photo.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Кэшируем файлы");
            return cache.addAll(CACHE_FILES);
        })
    );
    self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});