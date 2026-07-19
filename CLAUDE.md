# ADMImob — contexto técnico (para IA)

Leia isto antes de editar o projeto.

## O que é

Mapa interativo white-label de imóveis para corretores, vendido como assinatura
mensal (R$ 200–300/mês). Site estático, sem backend, hospedado no GitHub Pages.
Um link por corretor. Primeiro cliente: **Adriel Andrade, CRECI-MS 10101**.

## Stack (travada — não trocar)

- **Leaflet 1.9.4** + **Turf.js 6.5.0**, ambos via **cdnjs** (único CDN garantido).
- Sem build, sem framework, sem backend. Só HTML/CSS/JS puro.
- Camada base: **Esri World Imagery** (satélite, uso livre). **Não** usar tiles do
  Google (licenciamento).

## Arquitetura

- `index.html` — o app inteiro. Template white-label; lê tudo do `config.js`.
- `config.js` — objeto `CLIENTES` (chave = slug do corretor) + `CLIENTE_PADRAO`.
  Cada corretor: marca, cores, centro/zoom do mapa, contatos, caminho do GeoJSON.
- `dados/<slug>.geojson` — imóveis do corretor, em **WGS84 / EPSG:4326**.

O corretor é escolhido pela URL: `index.html?cliente=<slug>`. Sem parâmetro,
carrega `CLIENTE_PADRAO`.

## Formato do GeoJSON

- `Point` → casa/lote (marcador). `Polygon`/`MultiPolygon` → fazenda/sítio
  (área em ha calculada por Turf).
- Propriedades: `codigo` (ID único `ADMImob_<CORRETOR>_<NNN>`), `titulo`,
  `tipo` (`casa`|`fazenda`), `negocio` (`venda`|`aluguel`), `preco` (número),
  `quartos` (número), `endereco`, `foto` (URL).
- Campos `spec_*` viram linhas livres na ficha do imóvel.

Detalhes de exportação: `GUIA-QGIS.md`.

## Regras de produto

- Fotos: só a **URL** no GeoJSON (Cloudinary). **Nunca** commitar imagem no repo.
- HTTPS obrigatório em produção (geolocalização + rota OSRM só funcionam em https).
- Priorizar features de **retenção do corretor** (quem paga) sobre features do
  comprador final.
- App já funciona — **não** refatorar amplamente nem trocar de stack.

## Estado e pendências

Ver `projeto/RESUMO-DO-PROJETO.md`. Backlog em `projeto/IDEIAS.md`.
