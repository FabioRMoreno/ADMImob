# ADMImob

Mapa interativo de imóveis (estilo Google Maps) para corretores. Cada corretor
recebe uma versão white-label da marca, com seu próprio catálogo, cores e
contatos — tudo num link só.

- **Casa / lote** → ponto no mapa.
- **Fazenda / sítio** → polígono, com **área em hectares calculada automaticamente**.
- Site **estático**, sem backend. Hospedado de graça no **GitHub Pages**.
- Stack: [Leaflet 1.9.4](https://leafletjs.com/) + [Turf.js 6.5.0](https://turfjs.org/) via cdnjs.

## Como rodar localmente

O app usa `fetch()` para carregar o GeoJSON, então **não funciona abrindo o
arquivo direto** (`file://`). Suba um servidor local simples:

```bash
# Python (já vem no Windows via "py")
py -m http.server 8000
```

Depois abra <http://localhost:8000/index.html>.

Para ver o mapa de um corretor específico:
<http://localhost:8000/index.html?cliente=adriel>

## Como publicar (GitHub Pages)

1. `git add . && git commit -m "..."` e `git push`.
2. No GitHub: **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
3. Em ~1 min o site fica no ar em `https://<usuario>.github.io/ADMImob/`.
4. O link de cada corretor é `.../index.html?cliente=<slug>`.

> HTTPS é obrigatório: geolocalização ("Como chegar") e a rota por estrada só
> funcionam em `https`, não em `http` nem `file://`.

## Estrutura

```
ADMImob/
├── index.html          # o app inteiro (template white-label)
├── config.js           # corretores: marca, cores, contatos, centro do mapa
├── dados/
│   └── adriel.geojson  # imóveis do corretor (GeoJSON WGS84 / EPSG:4326)
├── GUIA-QGIS.md        # como exportar imóveis do QGIS
└── projeto/
    ├── RESUMO-DO-PROJETO.md   # estado atual do projeto
    └── IDEIAS.md              # backlog
```

## Cadastrar um corretor novo

1. Adicione um bloco em `config.js` (copie o do `adriel`, troque o slug e os dados).
2. Crie `dados/<slug>.geojson` com os imóveis dele.
3. O link dele passa a ser `index.html?cliente=<slug>`.

