const CACHE_NAME = "yontakun-v2";
const urlsToCache = [
  "/shin4ta/",
  "/shin4ta/index.html",
  "/shin4ta/style.css",
  "/shin4ta/script.js",
  "/shin4ta/icon-192.png",
  "/shin4ta/icon-512.png"
];

// インストール
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// 有効化
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

// fetch（ここが重要🔥）
self.addEventListener("fetch", (e) => {
  // 👇 ページ遷移の場合
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).catch(() => caches.match("/shin4ta/index.html"))
    );
    return;
  }

  // 👇 それ以外（CSS, JSなど）
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
