#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { createHash, randomUUID } = require("node:crypto");
const { execFileSync } = require("node:child_process");
const { parseArgs } = require("node:util");
const { validateCatalogs } = require("./validar-catalogos");
const validateManifest = require("../assets/js/boticario");

const data = path.resolve(__dirname, "../data");
const limit = 60;
const batchSize = 20;
const skuPattern = /^B\d{5}$/;
const initialQueue = {
  versao: 1,
  fonte: { ciclo: "16/2026", arquivo: "catalogo_boticario_202616.pdf", sha256: null },
  primeiroLote: 25,
  inicio: { pagina: 124, sku: "B90717" },
  retomada: { pagina: 124, sku: "B90717" },
  ordem: [],
  porSku: {},
};

function saveJson(filename, value) {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const temporary = `${filename}.${randomUUID()}.tmp`;
  try {
    fs.writeFileSync(temporary, JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
    fs.renameSync(temporary, filename);
  } finally {
    fs.rmSync(temporary, { force: true });
  }
}

function priorAudit() {
  const audit = fs.readFileSync(path.join(data, "BOTICARIO-LOTE-PILOTO-AUDITORIA.md"), "utf8");
  const records = new Map();
  for (const match of audit.matchAll(/^\| `(B\d{5})` \| (\d+) \| (.+) \|\r?$/gm)) {
    const [, sku, page, result] = match;
    const photo = result.match(/\[Foto oficial\]\(([^)]+)\)/i)?.[1] ?? null;
    const sheet = result.match(/\[Ficha oficial\]\(([^)]+)\)/i)?.[1] ?? null;
    records.set(sku, { pagina: Number(page), fichaOficial: sheet, foto: photo, resultado: result.split(" · [")[0] });
  }
  return records;
}

function pdfSkus(filename, start) {
  const extraction = String.raw`
import json, re, sys, fitz
with fitz.open(sys.argv[1]) as pdf:
    start = int(sys.argv[2])
    hits = [[page + 1, "B" + m.group(1), " ".join(line.split())]
            for page in range(start - 1, len(pdf))
            for line in pdf[page].get_text().splitlines()
            for m in re.finditer(r"(?<!\w)B?([0-9]{5})(?!\w)", line)]
print(json.dumps(hits))
`;
  try {
    return JSON.parse(execFileSync("python", ["-c", extraction, filename, String(start)], {
      encoding: "utf8", windowsHide: true, stdio: ["ignore", "pipe", "pipe"],
    }));
  } catch (error) {
    throw new Error(`Extração do PDF falhou. Verifique o arquivo e a instalação do PyMuPDF. ${error.stderr?.trim() || error.message}`);
  }
}

function addFromPdf(queue, filename, existingSkus, scanLimit) {
  const fingerprint = createHash("sha256").update(fs.readFileSync(filename)).digest("hex");
  if (queue.fonte.sha256 && queue.fonte.sha256 !== fingerprint) {
    throw new Error("O PDF difere da fonte já registrada na fila.");
  }
  if (!queue.retomada) return;

  const audit = priorAudit();
  const cursor = queue.retomada;
  const entries = pdfSkus(filename, cursor.pagina);
  const offset = entries.findIndex(([page, sku]) => page === cursor.pagina && sku === cursor.sku);
  if (offset < 0) throw new Error("O ponto de retomada não foi encontrado no PDF.");
  queue.fonte.sha256 = fingerprint;
  queue.retomada = null;
  let candidates = queue.ordem.filter((sku) => queue.porSku[sku].status !== "excluido" && !existingSkus.has(sku)).length;
  for (const [pagina, sku, trechoPdf] of entries.slice(offset)) {
    if (existingSkus.has(sku) || Object.hasOwn(queue.porSku, sku)) continue;
    if (candidates >= scanLimit) {
      queue.retomada = { pagina, sku };
      break;
    }
    const previous = audit.get(sku);
    queue.ordem.push(sku);
    queue.porSku[sku] = {
      pagina, trechoPdf, fichaOficial: previous?.fichaOficial ?? null, foto: previous?.foto ?? null,
      status: "pendente",
      motivo: previous?.resultado ?? "Conferir variante, volume, apresentação e foto na ficha oficial.",
      ...(previous ? { auditoriaAnterior: previous } : {}),
    };
    candidates += 1;
  }
}

function isOfficial(url, hosts, sku) {
  try {
    const source = new URL(url);
    return source.protocol === "https:" && hosts.includes(source.hostname) &&
      (!sku || new RegExp(`/imagens/products?/${sku}/`).test(source.pathname));
  } catch {
    return false;
  }
}

function plan(queue, catalog) {
  const failures = [];
  const pending = Object.create(null);
  let firstPending = null;
  let excluded = 0;
  let reused = 0;
  let reusedEvidence = 0;
  const products = [];
  for (const sku of queue.ordem) {
    const entry = queue.porSku[sku];
    if (!entry || !skuPattern.test(sku) || !Number.isInteger(entry.pagina) || entry.pagina < 1) {
      failures.push(`${sku}: registro ou página do PDF inválidos.`);
      continue;
    }
    if (catalog.skus.has(sku)) {
      reused += 1;
      continue;
    }
    if (entry.auditoriaAnterior) reusedEvidence += 1;
    if (entry.status === "excluido" && entry.motivo?.trim()) {
      excluded += 1;
    } else if (entry.status === "pendente" && entry.motivo?.trim()) {
      pending[entry.motivo] = (pending[entry.motivo] ?? 0) + 1;
      firstPending ??= { pagina: entry.pagina, sku };
    } else if (entry.status === "conferido") {
      if (entry.produto?.sku !== sku ||
          !isOfficial(entry.fichaOficial, ["www.boticario.com.br", "boticario.com.br"]) ||
          !isOfficial(entry.foto, ["cdn.gbmedia.com.br", "res.cloudinary.com"], sku) ||
          !new RegExp(`/${sku}\\.(avif|webp|png|jpe?g)$`).test(entry.produto?.imagemOficial)) {
        failures.push(`${sku}: ficha, foto ou produto incompatível com o SKU.`);
      } else {
        products.push(entry.produto);
      }
    } else {
      failures.push(`${sku}: status ou motivo inválido.`);
    }
  }
  const selected = products.slice(0, limit);
  const seen = new Set(catalog.skus);
  const lots = Array.from({ length: limit / batchSize }, (_, index) => {
    const file = `boticario-lote-${queue.primeiroLote + index}.v1.json`;
    const candidate = { versao: 1, ativo: false, produtos: selected.slice(index * batchSize, (index + 1) * batchSize) };
    try {
      validateManifest(candidate, seen);
    } catch (error) {
      failures.push(`${file}: ${error.message}`);
    }
    if (catalog.files.includes(file)) failures.push(`${file}: o lote já existe no catálogo.`);
    return { file, candidate };
  });
  return { lots, pending, firstPending, excluded, reused, reusedEvidence, failures, overflow: products.length - selected.length };
}

function run() {
  const { values } = parseArgs({ options: {
    pdf: { type: "string" }, fila: { type: "string" },
    simular: { type: "boolean" }, preparar: { type: "boolean" },
    candidatos: { type: "string" },
  } });
  if (values.simular && values.preparar) throw new Error("Escolha simular ou preparar.");
  const scanLimit = Number(values.candidatos ?? limit);
  if (!Number.isSafeInteger(scanLimit) || scanLimit < 1) throw new Error("Limite de candidatos inválido.");
  const filename = path.resolve(values.fila ?? path.join(data, "boticario-fila-25-27.v1.json"));
  const queue = fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, "utf8")) : initialQueue;
  if (queue.versao !== 1 || !Array.isArray(queue.ordem) || !queue.porSku || !queue.fonte ||
      !Number.isSafeInteger(queue.primeiroLote) || queue.primeiroLote < 1 ||
      new Set(queue.ordem).size !== queue.ordem.length ||
      Object.keys(queue.porSku).length !== queue.ordem.length ||
      !queue.ordem.every((sku) => Object.hasOwn(queue.porSku, sku))) throw new Error("Fila inválida.");
  const catalog = validateCatalogs().get("O Boticário");
  if (values.pdf && !catalog.failures.length) addFromPdf(queue, values.pdf, catalog.skus, scanLimit);
  const { lots, pending, firstPending, excluded, reused, reusedEvidence, failures, overflow } = plan(queue, catalog);
  const validated = validateCatalogs({ candidates: lots }).get("O Boticário");
  failures.push(...validated.failures);

  if (values.preparar && !failures.length) {
    for (const { file, candidate } of lots) {
      saveJson(path.join(path.dirname(filename), "boticario-preparacao", file), candidate);
    }
    saveJson(filename, queue);
  }
  console.log(JSON.stringify({
    totais: {
      ativos: catalog.activeProducts, fila: queue.ordem.length, excluidos: excluded,
      jaCadastradosNaFila: reused, verificacoesReaproveitadas: reusedEvidence,
      preparados: lots.reduce((total, { candidate }) => total + candidate.produtos.length, 0),
      lotes: Object.fromEntries(lots.map(({ file, candidate }) => [file, candidate.produtos.length])),
      ativados: 0, excedentes: overflow,
    },
    pendencias: { porMotivo: pending, primeira: firstPending, retomada: queue.retomada },
    falhas: failures,
  }, null, 2));
  if (failures.length) process.exitCode = 1;
}

try {
  run();
} catch (error) {
  console.error(JSON.stringify({ falhas: [error.message] }, null, 2));
  process.exitCode = 1;
}
