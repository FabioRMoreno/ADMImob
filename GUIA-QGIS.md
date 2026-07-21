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
| `codigo`    | texto   | sim         | ADMImob_ADRIEL_001                   |
| `titulo`    | texto   | sim         | Casa 3 quartos no Centro             |
| `tipo`      | texto   | sim         | ver lista abaixo                     |
| `negocio`   | texto   | sim         | `venda` ou `aluguel`                 |
| `preco`     | inteiro | sim         | 350000                               |
| `endereco`  | texto   | sim         | Rua das Flores, 123 — Centro         |
| `foto`      | texto   | não         | URL da foto (Cloudinary), não o arquivo |

### Valores de `tipo` (usados nos filtros do app)

Um destes, em minúsculas: `casa`, `comercial`, `terreno`, `fazenda`, `chacara`.

O app filtra por esses tipos; o número de quartos (e outras infos) vai em campos
`spec_*` (ex.: `spec_quartos`), que aparecem na ficha mas não são filtro.

### Código do imóvel (`codigo`)

Cada imóvel tem um código único, no padrão:

```
ADMImob_<CORRETOR>_<NNN>
```

- `ADMImob` — nome do app (fixo).
- `<CORRETOR>` — o slug do corretor em MAIÚSCULAS (ex.: `ADRIEL`).
- `<NNN>` — número sequencial de 3 dígitos (`001`, `002`, …).

Regras: o número **nunca é reaproveitado** — se um imóvel for vendido e sair do
mapa, o próximo cadastro segue a numeração (não volta a usar o número livre).
Assim o código sempre identifica o mesmo imóvel de forma estável. Serve como
referência entre você, o corretor e o comprador ("me fala do ADMImob_ADRIEL_003").

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

## 6. Camadas de referência (bairros, ruas, fazendas, pontos)

Além do catálogo, o app mostra **camadas de contexto** que o corretor liga/desliga
no botão **Camadas** (ex.: bairros, ruas, fazendas conhecidas, postos e mercados).

### Shapefile → GeoJSON

O navegador **não lê shapefile** (`.shp` são vários arquivos). Converta no QGIS:

1. Clique com o botão direito na camada → **Exportar → Salvar feições como...**
2. Formato: **GeoJSON** · CRS: **EPSG:4326 - WGS 84**
3. Salve em `dados/ref/` (ex.: `dados/ref/fazendas.geojson`)

> Simplifique geometrias muito pesadas antes de exportar
> (**Vetor → Geometrias → Simplificar**). Camada leve = mapa rápido no celular.

### Declarar no `config.js`

Dentro do corretor, no array `camadas`:

```js
camadas: [
  { nome: "Bairros",   arquivo: "dados/ref/bairros.geojson",  cor: "#7a5af5", rotulo: "nome" },
  { nome: "Ruas",      arquivo: "dados/ref/ruas.geojson",     cor: "#ffffff", rotulo: "nome" },
  { nome: "Fazendas",  arquivo: "dados/ref/fazendas.geojson", cor: "#e8a33d", rotulo: "nome" }
]
```

- `nome` — o que aparece na lista do botão Camadas.
- `cor` — cor do desenho no mapa.
- `rotulo` — **campo da tabela** que aparece ao passar o mouse/tocar (ex.: `nome`).

Funciona com pontos, linhas e polígonos. As camadas de referência são desenhadas
**abaixo** dos imóveis do catálogo, para não atrapalhar. Elas só são baixadas
quando o corretor liga a caixinha (economiza dados no celular).

> ⚠️ Ao editar o `config.js`, aumente o `?v=` no `index.html`
> (`<script src="config.js?v=2">`) para o navegador pegar a versão nova.

## 7. Conferir antes de publicar

- Abra o `.geojson` no navegador ou num validador ([geojson.io](https://geojson.io))
  e veja se os imóveis caem no lugar certo.
- Se caírem no oceano/África, o CRS provavelmente saiu errado (lat/long trocados
  ou não estava em 4326).
