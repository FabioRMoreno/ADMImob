# RESUMO DO PROJETO — ADMImob

_Última atualização: 2026-07-18_

Este é o "aqui estamos" do projeto. Se voltar depois de um tempo, comece por aqui.

## Onde estamos

Produto **quase pronto para o primeiro cliente pagante** (Adriel Andrade).
O código faz tudo que precisa. Falta liberar publicação e trocar placeholders
por dados reais.

Em **2026-07-18** o código do app foi (re)construído neste repositório
(`index.html`, `config.js`, `dados/adriel.geojson` de exemplo, docs). Antes disso
o repositório estava vazio — só tinha o commit inicial. O app foi **testado
localmente** (servidor `py -m http.server`) e aprovado: mapa satélite carrega,
marcadores e polígono renderizam, área em ha calcula, ficha e os 4 botões de
contato funcionam, e os filtros (tipo/negócio/preço/quartos) filtram certo.

## Já pronto (código funcionando)

- Mapa Leaflet com satélite Esri como padrão.
- Marcadores (casa/lote) e polígonos (fazenda/sítio) com área em ha (Turf).
- Filtros: preço mín/máx, quartos, tipo, negócio, com contador de resultados.
- Multi-cliente por URL (`?cliente=adriel`): troca marca, cores, contatos,
  centro do mapa, catálogo e título da aba.
- Ficha do imóvel: foto, preço formatado, endereço, specs livres, botões de
  contato (WhatsApp, Ligar, E-mail, Instagram).
- "Como chegar": rota real por estrada via OSRM (fallback linha reta).
- **Medição no mapa** (inspirada no CopaNav): botões "Dist." e "Área" — toca
  pontos e o Turf calcula distância (m/km) e área (m²/ha). Com Desfazer e Fechar.

## Pendências para virar negócio pagante

| # | Pendência | Status |
|---|-----------|--------|
| 1 | Liberar push no GitHub (autenticar git via PAT) | ⏳ |
| 2 | Nome "ADMImob" aplicado nos arquivos | ✅ (feito na reconstrução) |
| 3 | Trocar contatos placeholder do Adriel por reais (`config.js`) | ⏳ |
| 4 | Resolver hospedagem de fotos (Cloudinary) | ⏳ |
| 5 | Ativar GitHub Pages | ⏳ |
| 6 | Cadastrar catálogo real do Adriel (QGIS → `dados/adriel.geojson`) | ⏳ |
| 7 | Fechar com o Adriel e cobrar 1ª mensalidade | ⏳ |

## Próximo passo concreto

Testar o app localmente (`py -m http.server 8000` → `localhost:8000`) e, estando
ok, fazer o primeiro `git push` para publicar (pendência 1).
