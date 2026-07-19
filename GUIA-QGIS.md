# Guia: exportar imóveis do QGIS para o ADMImob

O app lê um arquivo **GeoJSON** por corretor (`dados/<slug>.geojson`). Este guia
mostra como gerar esse arquivo no QGIS de forma que o mapa entenda os campos.

## 1. CRS obrigatório: WGS84 / EPSG:4326

O GeoJSON **precisa** estar em coordenadas geográficas (graus), não em UTM.
Ao exportar (`Exportar → Salvar feições como...`), escolha:

- Formato: **GeoJSON**
- CRS: **EPSG:4326 - WGS 84**

Se a camada estiver em UTM (ex.: SIRGAS 2000 / UTM 22S), o QGIS reprojeta na
exportação — basta selecionar 4326 no campo CRS.

## 2. Geometria

- **Casa / lote** → camada de **pontos** (`Point`).
- **Fazenda / sítio** → camada de **polígonos** (`Polygon` ou `MultiPolygon`).

A área em hectares é calculada pelo próprio app (Turf.js) — **não** precisa criar
um campo de área.

## 3. Campos da tabela de atributos

Crie estas colunas na camada. Nomes exatos (minúsculos):

| Campo       | Tipo    | Obrigatório | Exemplo                              |
|-------------|---------|-------------|--------------------------------------|
| `titulo`    | texto   | sim         | Casa 3 quartos no Centro             |
| `tipo`      | texto   | sim         | `casa` ou `fazenda`                  |
| `negocio`   | texto   | sim         | `venda` ou `aluguel`                 |
| `preco`     | inteiro | sim         | 350000                               |
| `quartos`   | inteiro | sim*        | 3   (use 0 em fazenda)               |
| `endereco`  | texto   | sim         | Rua das Flores, 123 — Centro         |
| `foto`      | texto   | não         | URL da foto (Cloudinary), não o arquivo |

\* `quartos` é usado no filtro; em fazenda deixe `0`.

## 4. Campos livres: padrão `spec_*`

Qualquer coluna que comece com `spec_` vira uma linha de detalhe na ficha do
imóvel. O rótulo mostrado é o nome do campo sem o `spec_`, com `_` virando espaço.

| Campo                   | Aparece na ficha como | Exemplo         |
|-------------------------|-----------------------|-----------------|
| `spec_area_construida`  | area construida       | 180 m²          |
| `spec_vagas`            | vagas                 | 2 vagas         |
| `spec_suites`           | suites                | 1 suíte         |
| `spec_pastagem`         | pastagem              | formada         |

Adicione quantos `spec_*` quiser — cada corretor/imóvel pode ter os seus.

## 5. Fotos: nunca no repositório

O campo `foto` guarda **só a URL** da imagem. Suba as fotos no
[Cloudinary](https://cloudinary.com/) (free tier) e cole a URL aqui. Nunca
comite arquivos de imagem no GitHub.

## 6. Conferir antes de publicar

- Abra o `.geojson` no navegador ou num validador ([geojson.io](https://geojson.io))
  e veja se os imóveis caem no lugar certo.
- Se caírem no oceano/África, o CRS provavelmente saiu errado (lat/long trocados
  ou não estava em 4326).
