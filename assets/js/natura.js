(() => {
  "use strict";

  const fields = ["sku", "nome", "descricao", "categoria", "imagemOficial"];
  const imagePath = /^assets\/images\/catalogos\/natura\/[a-z0-9][a-z0-9_-]*\.(?:avif|jpe?g|png|webp)$/i;

  function validate(manifest, seen = new Set()) {
    if (!manifest || manifest.versao !== 1 || typeof manifest.ativo !== "boolean" ||
        !Array.isArray(manifest.produtos)) {
      throw new Error("Manifesto Natura v1 invalido.");
    }

    const { produtos } = manifest;
    produtos.forEach((product, index) => {
      const row = index + 1;
      if (!product || Object.keys(product).length !== fields.length ||
          !fields.every((field) => Object.hasOwn(product, field) &&
            typeof product[field] === "string" && product[field].trim() &&
            product[field] === product[field].trim())) {
        throw new Error(`Produto Natura ${row}: esperado o conjunto de cinco campos obrigatorios.`);
      }

      const sku = product.sku.normalize("NFC").toUpperCase();
      if (/\s/.test(sku) || seen.has(sku)) {
        throw new Error(`Produto Natura ${row}: SKU invalido ou duplicado.`);
      }
      seen.add(sku);

      if (fields.some((field) => /[<>]/.test(product[field])) ||
          !imagePath.test(product.imagemOficial)) {
        throw new Error(`Produto Natura ${row}: texto ou imagem invalida.`);
      }
    });

    return manifest.ativo ? produtos : [];
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = validate;
    return;
  }

  const root = new URL("../../", document.currentScript.src);
  const manifestPaths = [
    "data/natura-piloto.v1.json",
    "data/natura-lote-2.v1.json",
    "data/natura-lote-3.v1.json",
    "data/natura-lote-4.v1.json",
    "data/natura-lote-5.v1.json",
    "data/natura-lote-6.v1.json",
    "data/natura-lote-7.v1.json",
    "data/natura-lote-8.v1.json",
    "data/natura-lote-9.v1.json",
    "data/natura-lote-10.v1.json",
    "data/natura-lote-11.v1.json",
    "data/natura-lote-12.v1.json",
    "data/natura-lote-13.v1.json",
    "data/natura-lote-14.v1.json",
    "data/natura-lote-15.v1.json",
    "data/natura-lote-16.v1.json",
    "data/natura-lote-17.v1.json",
    "data/natura-lote-18.v1.json",
    "data/natura-lote-19.v1.json",
    "data/natura-lote-20.v1.json",
    "data/natura-lote-21.v1.json",
    "data/natura-lote-22.v1.json",
    "data/natura-lote-23.v1.json",
    "data/natura-lote-24.v1.json",
    "data/natura-lote-25.v1.json",
    "data/natura-lote-26.v1.json",
    "data/natura-lote-27.v1.json",
    "data/natura-lote-28.v1.json",
    "data/natura-lote-29.v1.json",
    "data/natura-lote-30.v1.json",
    "data/natura-lote-31.v1.json",
    "data/natura-lote-33.v1.json",
    "data/natura-lote-34.v1.json",
    "data/natura-lote-35.v1.json",
    "data/natura-lote-36.v1.json",
    "data/natura-lote-37.v1.json",
    "data/natura-lote-38.v1.json",
    "data/natura-lote-39.v1.json",
    "data/natura-lote-40.v1.json",
    "data/natura-lote-41.v1.json",
    "data/natura-lote-42.v1.json",
    "data/natura-lote-43.v1.json",
    "data/natura-lote-44.v1.json",
    "data/natura-refis.v1.json"
  ];

  // SKUs de público comprovado na auditoria, sem os presentes legados.
  const auditedAudiences = {
    feminino: [
      "88453", "16870", "56763", "56754", "189391", "189393", "248320", "69200", "95638", "95643",
      "95644", "71600", "73569", "73562", "73563", "73564", "73565", "199392", "250231", "103349",
      "76421", "76423", "167756", "27264", "17049", "18887", "76425", "165813", "214410", "86727",
      "131462", "54522", "122470", "102419", "83314", "173020", "108410", "108407", "108408", "236375",
      "68943", "41795", "68944", "86935", "2550", "56417", "204451", "44452", "171364", "128615",
      "232063", "2458", "2446",
    ],
    masculino: [
      "88454", "56948", "16623", "56747", "110686", "85393", "189392", "189398", "247693", "189390",
      "248628", "151018", "159952", "160210", "151020", "204440", "150227", "150229", "150225", "201466",
      "160273", "151019", "152331", "152277", "151021", "151022", "71601", "103348", "76420", "95560",
      "76422", "165811", "167755", "27263", "17052", "18888", "76424", "214411", "86725", "86728",
      "95949", "131465", "72468", "155607", "108405", "108402", "108401", "108400", "108403", "228528",
      "89834", "176285", "53255", "81951", "71770", "201463", "59847", "57525", "30410",
    ],
  };
  const audienceBySku = new Map(Object.entries(auditedAudiences)
    .flatMap(([audience, skus]) => skus.map((sku) => [sku, audience])));

  async function fetchManifest(path) {
    const response = await fetch(new URL(path, root), { cache: "no-cache" });
    if (!response.ok) throw new Error(`Manifesto Natura indisponivel (HTTP ${response.status}).`);
    return response.json();
  }

  async function load() {
    const manifests = await Promise.allSettled(manifestPaths.map(fetchManifest));
    const products = [];
    let seen = new Set();

    manifests.forEach((result, index) => {
      const path = manifestPaths[index];
      try {
        if (result.status === "rejected") throw result.reason;
        const batchSeen = new Set(seen);
        const batch = validate(result.value, batchSeen);
        if (!batch.length) return;
        const presentation = path === "data/natura-refis.v1.json" ? "Refil" : "Produto regular";
        products.push(...batch.map((product) => ({
          brand: "Natura",
          code: product.sku,
          audience: audienceBySku.get(product.sku),
          name: product.nome,
          category: product.categoria,
          shortDescription: product.descricao,
          image: product.imagemOficial,
          presentation,
        })));
        seen = batchSeen;
      } catch (error) {
        console.error(`Catalogo Natura: falha no manifesto ${path}`, error);
      }
    });
    return products;
  }

  window.loadNaturaCatalog = load;
})();
