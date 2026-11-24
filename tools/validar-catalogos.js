#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const brands = [
  { name: "Natura", pattern: /^natura-(?:piloto|lote-\d+|refis)\.v1\.json$/i, sku: /^\S+$/ },
  { name: "O Boticário", pattern: /^boticario-lote-(?:piloto|\d+)\.v1\.json$/i, sku: /^B\d{5}$/ },
];

let failures = 0;

for (const brand of brands) {
  const files = fs.readdirSync(dataDir)
    .filter((file) => brand.pattern.test(file))
    .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
  const seen = new Set();
  let activeProducts = 0;

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {
      console.error(`${brand.name}: ${file} não contém JSON válido.`);
      failures += 1;
      continue;
    }

    if (manifest.versao !== 1 || typeof manifest.ativo !== "boolean" || !Array.isArray(manifest.produtos)) {
      console.error(`${brand.name}: ${file} não segue o formato do manifesto v1.`);
      failures += 1;
      continue;
    }

    for (const product of manifest.produtos) {
      const sku = String(product.sku || "").trim().toUpperCase();
      const image = String(product.imagemOficial || "").trim();
      const expectedDirectory = brand.name === "Natura" ? "natura" : "boticario";
      const imagePath = path.resolve(root, image);
      if (!brand.sku.test(sku) || !image || !image.startsWith(`assets/images/catalogos/${expectedDirectory}/`) || !fs.existsSync(imagePath)) {
        console.error(`${brand.name}: ${file} tem produto com SKU ou imagem inválida (${sku || "sem SKU"}).`);
        failures += 1;
      }
      if (manifest.ativo && seen.has(sku)) {
        console.error(`${brand.name}: SKU ativo duplicado (${sku}) em ${file}.`);
        failures += 1;
      }
      if (manifest.ativo) seen.add(sku);
    }
    if (manifest.ativo) activeProducts += manifest.produtos.length;
  }

  console.log(`${brand.name}: ${activeProducts} produtos ativos, ${seen.size} SKUs únicos, ${files.length} manifestos.`);
}

if (failures) process.exit(1);
