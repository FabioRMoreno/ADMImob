/* ============================================================================
 * ADMImob — Ferramenta de "cofre": embaralha (criptografa) um GeoJSON.
 * ----------------------------------------------------------------------------
 * O arquivo .enc gerado é lixo ilegível sem a senha. O app (index.html) o
 * desembaralha no navegador, com a mesma senha, usando Web Crypto.
 *
 * Uso:
 *   node ferramentas/encriptar.js <entrada.geojson> <senha> <saida.enc>
 * Exemplo:
 *   node ferramentas/encriptar.js dados/adriel.geojson 9900 dados/adriel.enc
 *
 * REGRA DE OURO: nunca comite o GeoJSON aberto de um corretor que usa cofre —
 * só o .enc vai pro repositório. A senha NÃO fica guardada em lugar nenhum.
 * ========================================================================== */

const fs = require("fs");
const crypto = require("crypto");

const [, , entrada, senha, saida] = process.argv;
if (!entrada || !senha || !saida) {
  console.error("Uso: node ferramentas/encriptar.js <entrada.geojson> <senha> <saida.enc>");
  process.exit(1);
}

// PBKDF2 deriva a chave a partir da senha; iterações altas atrasam força-bruta.
const ITER = 300000;

const dados = fs.readFileSync(entrada);
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(senha, salt, ITER, 32, "sha256");

const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
const ct = Buffer.concat([cipher.update(dados), cipher.final()]);
const tag = cipher.getAuthTag();          // 16 bytes de autenticação (GCM)
const ctComTag = Buffer.concat([ct, tag]); // o navegador espera a tag no fim

const saidaObj = {
  v: 1,
  iter: ITER,
  salt: salt.toString("base64"),
  iv: iv.toString("base64"),
  ct: ctComTag.toString("base64")
};

fs.writeFileSync(saida, JSON.stringify(saidaObj));
console.log("OK: " + saida + "  (" + ctComTag.length + " bytes cifrados, a partir de " + dados.length + " bytes)");
