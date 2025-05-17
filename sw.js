// sw.js
const CACHE_NAME = 'portfolio-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/index-en.html',
  '/styles/main.css',
  '/assets/js/main.js',
  '/assets/images/logo-lukas-rozado.webp'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  // Ignorar requisições não HTTP/S e do Google Tag Manager
  if (!event.request.url.startsWith('http') || 
      event.request.url.includes('googletagmanager')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))
  ));
});