const CACHE_NAME = 'portfolio-v1';
const ASSETS = [
  '/lukas-rozado/',
  '/lukas-rozado/index.html',
  '/lukas-rozado/index-en.html',
  '/lukas-rozado/styles/main.css',
  '/lukas-rozado/assets/js/main.js',
  '/lukas-rozado/assets/images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .catch(err => console.log('Falha no cache:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});