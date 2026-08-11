/* ============================================================================
 * ADMImob — Service worker (deixa o app instalável / com ícone próprio)
 * ----------------------------------------------------------------------------
 * Regra de ouro: o "casco" do app (index.html, libs, ícones) pode ficar em
 * cache pra abrir rápido e funcionar offline. Os DADOS (config.js e tudo em
 * dados/) NUNCA ficam em cache — sempre vêm direto da rede. É o que garante
 * que, quando o Fabio atualiza o catálogo de um corretor, quem já tem o app
 * instalado vê a atualização na próxima vez que abrir com internet, sem
 * precisar desinstalar nada.
 *
 * Pra forçar os usuários a pegarem uma versão nova do CASCO (só necessário se
 * mexer em libs/ícones — o index.html em si já é sempre buscado da rede
 * primeiro), aumente o CACHE_VERSION abaixo.
 * ========================================================================== */

const CACHE_VERSION = "admimob-shell-v2";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/Turf.js/6.5.0/turf.min.js",
  "img/icons/icon-generic-192.png",
  "img/icons/icon-generic-512.png"
];

// Nunca cachear: dados do corretor (config.js e tudo dentro de dados/).
// Sempre busca da rede — se estiver offline, a busca falha (não mostra
// versão velha por engano).
const NUNCA_CACHEAR = [/\/config\.js(\?|$)/, /\/dados\//];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      Promise.all(
        APP_SHELL.map((url) => cache.add(url).catch(() => {}))
      )
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((chaves) =>
        Promise.all(chaves.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = req.url;

  // Dados do corretor: sempre da rede, nunca do cache.
  if (NUNCA_CACHEAR.some((re) => re.test(url))) {
    event.respondWith(fetch(req));
    return;
  }

  // Libs via CDN (leaflet/turf): cache-first — a versão já está presa na
  // própria URL, então não muda por baixo do tapete.
  if (url.indexOf("cdnjs.cloudflare.com") !== -1) {
    event.respondWith(
      caches.match(req).then(
        (emCache) =>
          emCache ||
          fetch(req).then((resp) => {
            const copia = resp.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copia));
            return resp;
          })
      )
    );
    return;
  }

  // Casco do app (index.html, ícones, imagens): network-first — tenta a
  // rede primeiro (pra sempre pegar a versão mais nova), só cai pro cache
  // se estiver offline.
  event.respondWith(
    fetch(req)
      .then((resp) => {
        const copia = resp.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, copia));
        return resp;
      })
      .catch(() => caches.match(req))
  );
});
