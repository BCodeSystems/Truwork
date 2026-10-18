// TruWork service worker.
// Bump VERSION to force clients onto fresh caches after a breaking change.
const VERSION = "v1";
const STATIC_CACHE = `truwork-static-${VERSION}`;
const PAGES_CACHE = `truwork-pages-${VERSION}`;
// Must match API_CACHE_NAME in lib/api.ts, which deletes it on logout.
const API_CACHE = "truwork-api-v1";
const OFFLINE_URL = "/offline.html";
const NETWORK_TIMEOUT_MS = 4000;

const PRECACHE_URLS = [
  OFFLINE_URL,
  "/manifest.json",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/branding/truwork-monogram.svg",
  "/branding/truwork-wordmark.svg",
];

const CURRENT_CACHES = [STATIC_CACHE, PAGES_CACHE, API_CACHE];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("truwork-") && !CURRENT_CACHES.includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // TruWork API (may live on another origin). Auth endpoints are never cached.
  if (url.pathname.startsWith("/api/")) {
    if (url.pathname.startsWith("/api/auth/")) return;
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // Leave other cross-origin requests (photos on R2, fonts, etc.) to the browser.
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      networkFirst(request, PAGES_CACHE).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Hashed build output never changes, so serve it straight from cache.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Client-side navigations (React Server Component payloads).
  if (request.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) {
    event.respondWith(networkFirst(request, PAGES_CACHE));
    return;
  }

  if (/\.(?:png|jpe?g|svg|webp|gif|ico|woff2?)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  }
});

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const network = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  });
  network.catch(() => {});

  try {
    return await withTimeout(network, NETWORK_TIMEOUT_MS);
  } catch {
    const cached = await cache.match(request);
    // Nothing cached: keep waiting on the network (rejects if truly offline).
    return cached || network;
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

// A slow connection on a job site should fall back to cache instead of hanging.
// The fetch keeps running, so a late response still refreshes the cache.
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Network timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}
