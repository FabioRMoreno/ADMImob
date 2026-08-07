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
    logo: "img/logo.png?v=4",
    // Cores da interface — paleta casada com o logo do corretor
    corTopo: "#17191c",       // preto/chumbo: barra superior e topo do painel
    corPrimaria: "#d81f2a",   // vermelho do logo: ativos, preços, botões
    corSecundaria: "#2b2f33", // cinza chumbo: títulos e textos de apoio

    // Logo do corretor (aparece no quadro de usuário). "" = usa as iniciais.
    logoUsuario: "img/adriel.jpg?v=1",
    // Emblema do corretor (só a figura, sem texto) — canto superior direito
    // do cabeçalho, espelhando o logo ADMImob à esquerda. "" = não mostra.
    logoIcone: "img/logo_adriel.png?v=1",

    // --- Acesso (COFRE: login + senha que desembaralha os dados) ---
    // O corretor repassa login+senha a quem ele quiser. A SENHA NÃO fica aqui:
    // ela é a chave que decripta o dados/adriel.enc. Sem ela, os dados são lixo.
    // Trocar a senha = re-gerar o .enc e distribuir a nova senha (revoga a antiga).
    // Gerar/atualizar: node ferramentas/encriptar.js <geojson> <senha> <saida.enc>
    login: "Adriel",
    dadosEnc: "dados/adriel.enc",

    // --- Onde o mapa abre (lat, lng) e zoom inicial ---
    // Cassilândia-MS por padrão. Ajuste para a cidade do corretor.
    centro: [-19.1129, -51.7342],
    zoom: 13,

    // --- Botão azul "ir para cidade" (opcional) ---
    // Pula direto para outra cidade onde o corretor atua. Deixe fora ou "" para
    // não mostrar o botão. Troque as coordenadas/zoom pela cidade desejada.
    pontoFoco: { titulo: "Chapadão do Sul", centro: [-18.7886, -52.6264], zoom: 14 },

    // --- Menu de cidades na "mira azul" ---
    // Clica na mira -> balão com os nomes -> vai direto ao perímetro da cidade.
    // Camada INVISÍVEL (só referência pra navegar). Nomes no campo "Name".
    // Se definido, tem prioridade sobre o pontoFoco (que vira só fallback).
    cidadesFoco: { arquivo: "dados/ref/cidades_zoom.geojson", rotulo: "Name" },

    // --- Município atual (nome na barra inferior) ---
    // Camada INVISÍVEL, separada da "cidadesFoco" acima: aquela é só o perímetro
    // urbano (pequeno, some se afastar da cidade); esta é o município inteiro
    // (zona rural incluída), então o nome não some ao navegar pela fazenda.
    // Lista (não objeto único): dá pra somar vários estados — cada um com sua
    // sigla ("uf"), que aparece pequena embaixo do nome na barra inferior.
    // Reaproveita os mesmos arquivos das camadas "Municípios MS/GO" (config.camadas).
    municipioAtual: [
      { arquivo: "dados/ref/ms_municipios.geojson", rotulo: "NM_MUN", uf: "MS" },
      { arquivo: "dados/ref/go_municipios.geojson", rotulo: "NM_MUN", uf: "GO" }
    ],

    // --- Contatos (aparecem nos botões da ficha do imóvel) ---
    // ⚠️ PLACEHOLDERS — trocar pelos dados REAIS do Adriel (pendência 3).
    contatos: {
      whatsapp: "55670000000000",          // só números, com DDI 55 + DDD
      telefone: "+55 (67) 00000-0000",
      email: "adriel@exemplo.com.br",
      instagram: "adrielimoveis"            // sem @
    },

    // Dados dos imóveis: quando há "dadosEnc" acima, o app usa o cofre e o
    // GeoJSON aberto NÃO é usado nem publicado. (Sem cofre, use: dados: "dados/<slug>.geojson")

    // --- Camadas de referência (opcional) ---
    // Contexto pro corretor: bairros, ruas, fazendas conhecidas, pontos da cidade.
    // Exporte do QGIS como GeoJSON (WGS84/EPSG:4326) e coloque em dados/ref/.
    // "rotulo" = nome do campo que aparece ao passar o mouse/tocar.
    camadas: [
      { nome: "Bairros Cassilândia", arquivo: "dados/ref/bairros_cassilandia.geojson", cor: "#7a5af5", rotulo: "name" },
      { nome: "Municípios MS", arquivo: "dados/ref/ms_municipios.geojson", cor: "#f2a33c", rotulo: "NM_MUN", rotuloModo: "longe" },
      { nome: "Municípios GO", arquivo: "dados/ref/go_municipios.geojson", cor: "#3ca7f2", rotulo: "NM_MUN", rotuloModo: "longe" },
      { nome: "Acessos", arquivo: "dados/ref/cassilandia_acessos.geojson", cor: "#ffd23f", rotulo: "name", rotuloModo: "hover" },
      { nome: "Pontos de referência", arquivo: "dados/ref/pontos.geojson", cor: "#e3452f", rotulo: "nome" }
    ],

    // --- Plantas georreferenciadas (opcional) ---
    // Imagem (PNG/JPG) de uma planta/loteamento, ancorada no mapa por 2 cantos
    // (canto inferior-esquerdo e superior-direito, em lat/lng). Pra gerar:
    // exporte do QGIS como "PDF georreferenciado (OGC)" e recorte/converta a
    // página em imagem já cortada na área útil (sem a moldura) — os cantos
    // (GPTS) ficam no próprio PDF, é só copiar aqui.
    plantas: [
      {
        nome: "Loteamento Talismã",
        arquivo: "dados/plantas/talisma.png",
        bounds: [[-19.1187928752248304, -51.8911041074302446], [-19.0804220474923412, -51.8363589154822435]]
      },
      {
        nome: "Altos do Estoril — Setor Sul",
        arquivo: "dados/plantas/altos_do_estoril.png",
        bounds: [[-20.475520189355343, -53.76486000338676], [-20.46776000509357, -53.75333962159885]]
      }
    ]
  },

  // --- Cliente de TESTE (dados abertos, aleatórios) ---
  // Não é um corretor real. Serve pra testar recursos do app (ex.: painel de
  // resumo por cidade) sem mexer no cofre do Adriel. dados/teste.geojson é
  // gerado por script, não é catálogo de verdade — pode apagar quando quiser.
  teste: {
    marca: "ADMImob — Teste",
    corretor: "Dados de teste",
    creci: "",
    logo: "",
    corTopo: "#17191c",
    corPrimaria: "#87cb33",
    corSecundaria: "#2b2f33",
    logoUsuario: "",
    logoIcone: "",

    centro: [-19.1129, -51.7342],
    zoom: 12,

    cidadesFoco: { arquivo: "dados/ref/cidades_zoom.geojson", rotulo: "Name" },
    municipioAtual: [
      { arquivo: "dados/ref/ms_municipios.geojson", rotulo: "NM_MUN", uf: "MS" },
      { arquivo: "dados/ref/go_municipios.geojson", rotulo: "NM_MUN", uf: "GO" }
    ],

    contatos: { whatsapp: "", telefone: "", email: "", instagram: "" },

    // Sem cofre: dados abertos direto (só pra teste).
    dados: "dados/teste.geojson"
  }

  // ,exemplo: { ...copie o bloco acima para o próximo corretor... }

};

// Corretor carregado quando a URL não traz ?cliente=
const CLIENTE_PADRAO = "adriel";
