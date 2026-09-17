// Service worker minimal : rend l'appli installable et lui permet de
// s'ouvrir même sans réseau (les données du capteur, elles, ont
// toujours besoin du Bluetooth en direct).
const CACHE = "velo-smoothie-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./firebase-config.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/logo.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
