# RESUMO DO PROJETO — ADMImob

_Última atualização: 2026-07-21_

Este é o "aqui estamos" do projeto. Se voltar depois de um tempo, comece por aqui.

## Onde estamos

Produto **maduro e personalizado para o Adriel**, com cara de produto pronto.
Falta **publicar** (o app só roda no PC do Fabio hoje) e trocar os dados de
exemplo pelos reais. **24 commits locais** aguardando o primeiro `git push`.

## Já pronto (código funcionando e testado)

- **Cabeçalho**: logo do ADMImob à esquerda, ferramentas centralizadas
  (Filtros · Medir · Dados · Fundo do mapa · Camadas), quadro do usuário à direita
  (logo do corretor + nome + CRECI + "● Logado").
- **Paleta por corretor** (`config.corTopo/corPrimaria/corSecundaria`). Adriel:
  preto `#17191c` + vermelho `#d81f2a`, casada com o logo dele.
- **Painel lateral** com **filtros por chips**: Negócio (venda/aluguel) e Tipo
  (casa/comercial/terreno/fazenda/chácara). "Todos" mostra tudo. Filtra ao tocar.
- **Código único por imóvel** `ADMImob_ADRIEL_NNN`, na ficha e no popup.
- **Ficha em aba recolhível** (título+código+preço → expande foto/endereço/specs).
  Botões de contato foram removidos (poluíam).
- **5 fundos de mapa**: Satélite, Satélite+Ruas, Somente Ruas, Escuro, Claro
  (todos Esri, sem chave; `maxNativeZoom` evita "map data not yet available").
- **Medição** (distância e área, Turf) e **botão de recentralizar** + **escala**.
- **Planta por rumos/azimutes**: cola os segmentos → poligonal temporária com
  perímetro, área e erro de fechamento. Aceita rumo ou azimute, GMS ou decimal,
  e **declinação magnética**. Validado com matrícula real de 1987.
- **Exportar dados**: "Dados" → CSV (Excel, BOM + `;`) e KML (Google Earth/QGIS).
- **Camadas de referência** (`config.camadas`): bairros, ruas, fazendas, pontos —
  liga/desliga, carrega sob demanda, desenhadas abaixo do catálogo.
- Multi-cliente por URL, área em ha, compatível com GeoJSON do QGIS.
- Cache resolvido: geojson `no-cache`; `config.js?v=N` (bump ao editar o config).

## Decisões travadas

- **Não** migrar para React/Next (mapcn descartado: build + CARTO comercial).
- Leitura automática de PDF de matrícula **descartada com prova** (é imagem
  escaneada; só o carimbo é texto). O motor de rumos cobre o valor real.

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
fazer junto explicando cada comando.
