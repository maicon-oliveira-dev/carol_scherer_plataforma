#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const avon = require("../assets/js/avon.js");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const brands = [
  {
    name: "Natura",
    pattern: /^natura-(?:piloto|lote-\d+|refis)\.v1\.json$/i,
    sku: /^\S+$/,
  },
  {
    name: "O Boticário",
    pattern: /^boticario-lote-(?:piloto|\d+)\.v1\.json$/i,
    sku: /^B\d{5}$/,
  },
];

function validateCatalogs({ candidates = [], report = () => {} } = {}) {
  const results = new Map();
  for (const brand of brands) {
    const files = fs
      .readdirSync(dataDir)
      .filter((file) => brand.pattern.test(file))
      .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
    const inputs = files.map((file) => ({ file }));
    if (brand.name === "O Boticário") inputs.push(...candidates);
    const seen = new Set();
    const skus = new Set();
    const failures = [];
    const fail = (message) => {
      failures.push(message);
      report(message);
    };
    let activeProducts = 0;

    for (const { file, candidate } of inputs) {
      const filePath = path.join(dataDir, file);
      let manifest;
      try {
        manifest = candidate ?? JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch {
        fail(`${brand.name}: ${file} não contém JSON válido.`);
        continue;
      }

      if (
        manifest?.versao !== 1 ||
        typeof manifest.ativo !== "boolean" ||
        !Array.isArray(manifest.produtos)
      ) {
        fail(`${brand.name}: ${file} não segue o formato do manifesto v1.`);
        continue;
      }

      for (const product of manifest.produtos) {
        const sku = String(product?.sku || "")
          .trim()
          .toUpperCase();
        const image = String(product?.imagemOficial || "").trim();
        const expectedDirectory =
          brand.name === "Natura" ? "natura" : "boticario";
        const imagePath = path.resolve(root, image);
        if (
          !brand.sku.test(sku) ||
          !image ||
          !image.startsWith(`assets/images/catalogos/${expectedDirectory}/`) ||
          !fs.statSync(imagePath, { throwIfNoEntry: false })?.isFile()
        ) {
          fail(
            `${brand.name}: ${file} tem produto com SKU ou imagem inválida (${sku || "sem SKU"}).`,
          );
        }
        if (manifest.ativo && seen.has(sku)) {
          fail(`${brand.name}: SKU ativo duplicado (${sku}) em ${file}.`);
        }
        if (manifest.ativo) seen.add(sku);
        if (brand.sku.test(sku)) skus.add(sku);
      }
      if (manifest.ativo) activeProducts += manifest.produtos.length;
    }

    results.set(brand.name, { activeProducts, seen, skus, files, failures });
  }

  const avonResult = {
    activeProducts: 0,
    seen: new Set(),
    files: avon.manifestPaths,
    failures: [],
  };
  const avonSeen = { ids: new Set(), codes: avonResult.seen };
  try {
    for (const file of avon.manifestPaths) {
      const manifest = JSON.parse(
        fs.readFileSync(path.join(root, file), "utf8"),
      );
      avonResult.activeProducts += avon.validate(manifest, avonSeen).length;
      for (const product of manifest.produtos) {
        for (const item of [product, ...(product.tons || [])]) {
          if (!item.imagemOficial) continue;
          if (
            !fs
              .statSync(path.join(root, item.imagemOficial), {
                throwIfNoEntry: false,
              })
              ?.isFile()
          ) {
            throw new Error(`Imagem inexistente: ${item.imagemOficial}.`);
          }
        }
      }
    }
  } catch (error) {
    const message = `Avon: ${error.message}`;
    avonResult.failures.push(message);
    report(message);
  }
  results.set("Avon", avonResult);
  return results;
}

module.exports = { validateCatalogs };
if (require.main === module) {
  for (const [name, result] of validateCatalogs({ report: console.error })) {
    console.log(
      `${name}: ${result.activeProducts} produtos ativos, ${result.seen.size} SKUs únicos, ${result.files.length} manifestos.`,
    );
    if (result.failures.length) process.exitCode = 1;
  }
}
