/* ============================================================================
 * ADMImob — Configuração dos clientes (corretores)
 * ----------------------------------------------------------------------------
 * Cada corretor é uma entrada no objeto CLIENTES, identificado por um "slug"
 * (a chave). O slug entra na URL do mapa: index.html?cliente=adriel
 *
 * Para cadastrar um corretor novo:
 *   1. Copie um bloco abaixo e troque o slug (a chave) e os dados.
 *   2. Crie o arquivo dados/<slug>.geojson com os imóveis dele.
 *   3. Pronto — o link dele fica index.html?cliente=<slug>
 *
 * NENHUM dado sensível aqui: só marca, cores, contatos públicos e centro do mapa.
 * ========================================================================== */

const CLIENTES = {

  adriel: {
    // --- Marca (white-label) ---
    marca: "ADMImob — Adriel Imóveis",
    corretor: "Adriel Andrade",
    creci: "CRECI-MS 10101",
    // Logo do cabeçalho (caminho da imagem). Deixe "" para não mostrar.
    // O ?v=1 fura o cache do navegador; aumente pra v=2, v=3... ao trocar o logo.
    logo: "img/logo.png?v=1",
    // Cores da interface — paleta casada com o logo do corretor
    corTopo: "#17191c",       // preto/chumbo: barra superior e topo do painel
    corPrimaria: "#d81f2a",   // vermelho do logo: ativos, preços, botões
    corSecundaria: "#2b2f33", // cinza chumbo: títulos e textos de apoio

    // Logo do corretor (aparece no quadro de usuário). "" = usa as iniciais.
    logoUsuario: "img/adriel.jpg?v=1",

    // --- Onde o mapa abre (lat, lng) e zoom inicial ---
    // Cassilândia-MS por padrão. Ajuste para a cidade do corretor.
    centro: [-19.1129, -51.7342],
    zoom: 13,

    // --- Contatos (aparecem nos botões da ficha do imóvel) ---
    // ⚠️ PLACEHOLDERS — trocar pelos dados REAIS do Adriel (pendência 3).
    contatos: {
      whatsapp: "55670000000000",          // só números, com DDI 55 + DDD
      telefone: "+55 (67) 00000-0000",
      email: "adriel@exemplo.com.br",
      instagram: "adrielimoveis"            // sem @
    },

    // Arquivo de dados dos imóveis (dentro de /dados)
    dados: "dados/adriel.geojson",

    // --- Camadas de referência (opcional) ---
    // Contexto pro corretor: bairros, ruas, fazendas conhecidas, pontos da cidade.
    // Exporte do QGIS como GeoJSON (WGS84/EPSG:4326) e coloque em dados/ref/.
    // "rotulo" = nome do campo que aparece ao passar o mouse/tocar.
    camadas: [
      { nome: "Bairros", arquivo: "dados/ref/bairros.geojson", cor: "#7a5af5", rotulo: "nome" },
      { nome: "Pontos de referência", arquivo: "dados/ref/pontos.geojson", cor: "#e3452f", rotulo: "nome" }
    ]
  }

  // ,exemplo: { ...copie o bloco acima para o próximo corretor... }

};

// Corretor carregado quando a URL não traz ?cliente=
const CLIENTE_PADRAO = "adriel";
