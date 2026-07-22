# IDEIAS — backlog do ADMImob

Backlog de melhorias. **Não** é lista de tarefas obrigatórias — é onde ideias
ficam guardadas pra não se perder. Pegar uma de cada vez, só quando fizer sentido.

## Retenção do corretor (prioridade — é quem paga)

- [ ] **Contador de visitas** por imóvel (dá relatório pro corretor, motivo pra não
      cancelar). _Adiado por decisão do dono, mas segue no radar._
- [ ] Resumo mensal simples ("X visitas, imóvel mais visto") por e-mail/mensagem.
- [ ] Selo "novo" em imóveis cadastrados nos últimos N dias.

## Comprador final

- [ ] Busca por texto (nome/endereço) além dos filtros.
- [ ] Compartilhar imóvel específico via link (`?cliente=x&imovel=id`).
- [x] Alternar camada satélite ↔ mapa de ruas. ✅ Feito (Satélite / Satélite+Ruas / Somente Ruas).

## Operacional

- [ ] **Ler a planta direto do PDF** (hoje o corretor cola os segmentos na mão).
      Só vale se os PDFs forem de **texto**; plantas escaneadas exigiriam OCR,
      que erra demais em memorial descritivo antigo. O motor de rumos/azimutes
      já está pronto — bastaria plugar a extração por cima.
- [ ] Salvar a planta desenhada como imóvel do catálogo (hoje é só temporária).
- [ ] Script/checklist para gerar o GeoJSON mais rápido a partir do QGIS.
- [ ] Página inicial simples listando os corretores (índice).
