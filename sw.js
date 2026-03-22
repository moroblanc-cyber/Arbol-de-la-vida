const CACHE_NAME = 'cabala-cache-v1';

// Aquí le decimos qué archivos debe guardar en la memoria del iPad
const urlsToCache = [
  './',
  './index_genios.html',
  './manifest.json',
  './icono-192.png',
  './icono-512.png'
];

// Fase de instalación: descarga los archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fase de intercepción: cuando no hay internet, saca los archivos de la memoria
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si lo encuentra en la memoria, lo devuelve. Si no, lo busca en internet.
        return response || fetch(event.request);
      })
  );
});
