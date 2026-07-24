# RESUMO DO PROJETO — ADMImob

_Última atualização: 2026-07-23_

Este é o "aqui estamos" do projeto. Se voltar depois de um tempo, comece por aqui.

## Onde estamos

Produto **maduro e personalizado para o Adriel**, com cara de produto pronto.
Falta **publicar** (o app só roda no PC do Fabio hoje) e trocar os dados de
exemplo pelos reais. **25 commits locais** aguardando o primeiro `git push`, **mais
um dia inteiro de melhorias de 2026-07-23 ainda não commitadas** (`config.js`,
`index.html`, o `img/logo.png` novo e os GeoJSON de bairros, municípios e acessos).

## Novidades de 2026-07-23 (testadas localmente, ainda não commitadas)

- **Camada "Bairros Cassilândia"** (`dados/ref/bairros_cassilandia.geojson`, 14
  bairros, nome no campo `name`).
- **Camada "Municípios MS"** (`dados/ref/ms_municipios.geojson`, 79 municípios).
  O arquivo bruto do IBGE tinha **23,5 MB / 750 mil vértices**; foi simplificado
  com **mapshaper** (`npx mapshaper … -simplify 8% keep-shapes -filter-fields
  NM_MUN`) para **1,18 MB / 56 mil vértices**, mantendo só o campo `NM_MUN`. O
  original fica intacto no Desktop do Fabio; a cópia leve é a que vai pro repo.
- **Seleção neon**: clicar numa feição de camada de referência realça a borda em
  ciano-neon com brilho (uma seleção por camada; a anterior volta ao normal). O
  retângulo de foco feio do navegador foi removido (`outline: none`).
- **Rótulos das camadas** (permanentes, no centro da feição) com **dois modos de
  escala**, controlados por `rotuloModo` no `config.camadas`:
  - `"perto"` (padrão, ex.: bairros): o nome **some ao afastar** (~além de 1:20.000).
  - `"longe"` (ex.: municípios): o nome **some ao aproximar** (barra de escala < 10 km),
    aparecendo só na visão regional. Os dois modos são complementares.
- **Painel de filtros fixo**: virou um painel **fixo à direita, estreito (236px) e
  preto** (era gaveta branca que deslizava da esquerda). Quando nada está clicado,
  fica preto com o **logo do corretor como marca d'água** (opacidade ~5%, usa o
  mesmo `cliente.logoUsuario`). O botão **Filtros** revela/esconde os chips; não
  escurece mais o mapa. No celular começa recolhido.
- **Pins como camada**: no menu **Camadas**, um toggle **"Imóveis"** (ligado por
  padrão) liga/desliga todos os marcadores do catálogo.
- **Transparência + cor por camada**: cada camada de referência tem, logo abaixo,
  um **slider de transparência** e um **seletor de cor** (aparecem só quando a
  camada está ligada, pra não poluir).
- **Camada "Municípios MS"** ganhou `rotuloModo: "longe"`; **camada "Acessos"**
  (`dados/ref/cassilandia_acessos.geojson`, 992 vias = estradas/vicinais/ruas,
  0,56 MB) com `rotuloModo: "hover"`.
- **Painel virou central única**: os botões **Medir, Dados, Fundo do mapa e
  Camadas** deixaram de abrir popups flutuantes — agora abrem **seções dentro do
  painel preto fixo**, como abas. O título do painel muda conforme a seção. (Só a
  Planta continua em modal próprio, por ser formulário grande.)
- **Medição reformulada**: acontece **dentro do painel**. Ao medir, o topo (título
  + botões de ferramenta) **some** e sobra só o **comprimento/área total em
  destaque** + Desfazer/Fechar. Os pontos aparecem **só no mapa** (sem lista).
- **Botão azul "ir para cidade"** (`config.pontoFoco`): controle no canto do zoom,
  fundo branco + mira azul, **pula direto para outra cidade** onde o corretor atua
  (Adriel: Chapadão do Sul). Some se `pontoFoco` não estiver no config.
- **Bug do Leaflet corrigido**: `setView(..., {animate:true})` **trava em saltos
  longos** (~90 km). Removido o `animate` forçado dos botões recentralizar e
  ir-pra-cidade (o Leaflet decide sozinho: anima perto, pula longe).
- **Novo fundo "Ruas + Relevo"** (Esri World_Topo_Map). O **NatGeo foi testado e
  descartado com prova** (devolve tile em branco sobre Cassilândia — md5 idêntico
  em todo zoom). Navigation/DeLorme estão 404. Tiles OSM do openstreetmap.org
  **não podem** ser usados (política de uso proíbe uso comercial de terceiros).
- **Logo novo do ADMImob** (`img/logo.png`, LOGO_20260723), caixa do cabeçalho
  redimensionada (107×48, sem borda branca sobrando).
- **Quadro do usuário** perdeu o avatar/logo do corretor (só nome + CRECI + status);
  o logo do corretor virou **marca d'água** do painel, agora a **15%** (era 5%).

## Já pronto (código funcionando e testado)

- **Cabeçalho**: logo do ADMImob à esquerda, ferramentas centralizadas
  (Filtros · Medir · Dados · Fundo do mapa · Camadas), quadro do usuário à direita
  (logo do corretor + nome + CRECI + "● Logado").
- **Paleta por corretor** (`config.corTopo/corPrimaria/corSecundaria`). Adriel:
  preto `#17191c` + vermelho `#d81f2a`, casada com o logo dele.
- **Painel de filtros** (fixo à direita, ver Novidades) com **filtros por chips**:
  Negócio (venda/aluguel) e Tipo (casa/comercial/terreno/fazenda/chácara). "Todos"
  mostra tudo. Filtra ao tocar.
- **Código único por imóvel** `ADMImob_ADRIEL_NNN`, na ficha e no popup.
- **Ficha em aba recolhível** (título+código+preço → expande foto/endereço/specs).
  Botões de contato foram removidos (poluíam).
- **6 fundos de mapa**: Satélite, Satélite+Ruas, Somente Ruas, Ruas+Relevo (Topo),
  Escuro, Claro (todos Esri, sem chave; `maxNativeZoom` evita "map data not yet available").
- **Medição** (distância e área, Turf) e **botão de recentralizar** + **escala**.
- **Planta por rumos/azimutes**: cola os segmentos → poligonal temporária com
  perímetro, área e erro de fechamento. Aceita rumo ou azimute, GMS ou decimal,
  e **declinação magnética**. Validado com matrícula real de 1987.
- **Exportar dados**: "Dados" → CSV (Excel, BOM + `;`) e KML (Google Earth/QGIS).
- **Camadas de referência** (`config.camadas`): ligam/desligam, carregam sob
  demanda, desenhadas abaixo do catálogo, com **seleção neon, rótulos por escala
  (perto/longe/hover) e controle de transparência/cor** (ver Novidades). Camadas
  atuais do Adriel: Bairros Cassilândia, Municípios MS, Acessos, Pontos de referência.
- Multi-cliente por URL, área em ha, compatível com GeoJSON do QGIS.
- Cache resolvido: geojson `no-cache`; `config.js?v=N` (bump ao editar o config;
  **hoje está em `?v=9`**).

## Esquema do `config.camadas` (atualizado)

Cada camada aceita: `nome`, `arquivo`, `cor`, `rotulo` (campo do nome), e
`rotuloModo`:
- `"perto"` (padrão): rótulo permanente, some ao **afastar** (~além de 1:20.000).
- `"longe"`: rótulo permanente, some ao **aproximar** (barra de escala < 10 km).
- `"hover"`: rótulo **só ao passar o mouse** (pra camadas com muitas feições, ex.:
  Acessos). O texto tenta `rotulo` → `nome`/`name`/`NOME` → `ref` (nº de rodovia).

Transparência e cor podem ser ajustadas na hora pelo usuário no menu Camadas (o
`cor` do config é só o valor inicial).

Fora das camadas, o `config` de cada cliente também aceita **`pontoFoco`**
(`{ titulo, centro:[lat,lng], zoom }`) — a cidade do botão azul "ir para cidade".

## Decisões travadas

- **Não** migrar para React/Next (mapcn descartado: build + CARTO comercial).
- Leitura automática de PDF de matrícula **descartada com prova** (é imagem
  escaneada; só o carimbo é texto). O motor de rumos cobre o valor real.
- **GeoJSON pesado** (municípios, etc.): simplificar com **mapshaper via `npx`**
  antes de subir (o navegador trava com arquivos de dezenas de MB). Guardar só os
  campos que a camada usa (`-filter-fields`).

## Pendências para virar negócio pagante

| # | Pendência | Status |
|---|-----------|--------|
| 1 | Liberar push no GitHub (autenticar git via PAT) | ⏳ (Fabio quer estudar antes) |
| 2 | Nome "ADMImob" aplicado nos arquivos | ✅ |
| 3 | Trocar contatos placeholder do Adriel por reais (`config.js`) | ⏳ |
| 4 | Resolver hospedagem de fotos (Cloudinary) | ⏳ |
| 5 | Ativar GitHub Pages | ⏳ |
| 6 | Cadastrar catálogo real do Adriel | 🟡 estrutura pronta (6 exemplos); faltam os reais |
| 7 | Fechar com o Adriel e cobrar 1ª mensalidade | ⏳ |

## Próximo passo concreto

O maior salto agora é a **pendência 1 + 5 (publicar no GitHub Pages)** — é o que
tira o app do "só roda no PC do Fabio" e coloca na mão do Adriel. Depende de
autenticar o Git, que o Fabio quer fazer com calma. Sem pressa; quando ele topar,
fazer junto explicando cada comando. **Antes disso**, vale um `git commit` das
melhorias de 2026-07-23 (hoje elas só existem como arquivos alterados, sem commit).
