const CACHE_NAME = 'electric-shadows-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/style.css',
  '/images/g185r.png',
  '/sound/index.html',
  '/ruso/index.html',
  '/biorest/index.html'
];

// Instalar el Service Worker y cachear los archivos iniciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados exitosamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para servir desde caché si no hay red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo desde la caché si existe, si no, lo pide a internet
        return response || fetch(event.request);
      })
  );
});

// Limpiar cachés antiguas al actualizar el Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
