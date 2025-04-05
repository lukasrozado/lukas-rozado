const CACHE_NAME = 'portfolio-v1';
const ASSETS = [
  './',
  './index.html',
  './index-en.html',
  './styles/main.css',
  './assets/js/main.js',
  './assets/images/logo-lukas-rozado.png',
  './contact.html',
  './contact-en.html'
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