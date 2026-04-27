const CACHE_NAME = 'mynumber-navi-v3';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// install
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// activate
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});