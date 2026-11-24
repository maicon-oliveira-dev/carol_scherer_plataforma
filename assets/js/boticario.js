(() => {
  "use strict";

  const fields = ["sku", "nome", "descricao", "categoria", "apresentacao", "linha", "tipo", "volume", "imagemOficial"];
  const imagePath = /^assets\/images\/catalogos\/boticario\/[A-Z]\d{5}\.(?:avif|jpe?g|png|webp)$/;

  function validate(manifest, seen = new Set()) {
    if (!manifest || manifest.versao !== 1 || typeof manifest.ativo !== "boolean" || !Array.isArray(manifest.produtos)) {
      throw new Error("Manifesto O Boticário v1 inválido.");
    }

    manifest.produtos.forEach((product, index) => {
      const row = index + 1;
      if (!product || Object.keys(product).length !== fields.length || !fields.every((field) =>
        Object.hasOwn(product, field) && typeof product[field] === "string" && product[field].trim() && product[field] === product[field].trim())) {
        throw new Error(`Produto O Boticário ${row}: campos obrigatórios inválidos.`);
      }
      if (!/^B\d{5}$/.test(product.sku) || seen.has(product.sku) || fields.some((field) => /[<>]/.test(product[field])) || !imagePath.test(product.imagemOficial)) {
        throw new Error(`Produto O Boticário ${row}: SKU, texto ou imagem inválidos.`);
      }
      seen.add(product.sku);
    });

    return manifest.ativo ? manifest.produtos : [];
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = validate;
    return;
  }

  const root = new URL("../../", document.currentScript.src);
  const manifests = [
    "data/boticario-lote-piloto.v1.json",
    "data/boticario-lote-1.v1.json",
    "data/boticario-lote-2.v1.json",
    "data/boticario-lote-3.v1.json",
    "data/boticario-lote-4.v1.json",
    "data/boticario-lote-5.v1.json",
    "data/boticario-lote-6.v1.json",
    "data/boticario-lote-7.v1.json",
    "data/boticario-lote-8.v1.json",
    "data/boticario-lote-9.v1.json",
    "data/boticario-lote-10.v1.json",
    "data/boticario-lote-11.v1.json",
    "data/boticario-lote-12.v1.json",
    "data/boticario-lote-13.v1.json",
    "data/boticario-lote-14.v1.json",
    "data/boticario-lote-15.v1.json",
    "data/boticario-lote-16.v1.json",
    "data/boticario-lote-17.v1.json",
    "data/boticario-lote-18.v1.json",
    "data/boticario-lote-19.v1.json",
    "data/boticario-lote-20.v1.json",
    "data/boticario-lote-21.v1.json",
    "data/boticario-lote-22.v1.json",
    "data/boticario-lote-23.v1.json",
    "data/boticario-lote-24.v1.json",
  ];

  async function load() {
    const results = await Promise.allSettled(manifests.map(async (path) => {
      const response = await fetch(new URL(path, root), { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    }));
    const products = [];
    let seen = new Set();
    results.forEach((result, index) => {
      try {
        if (result.status === "rejected") throw result.reason;
        const batchSeen = new Set(seen);
        const batch = validate(result.value, batchSeen);
        if (batch.length) {
          products.push(...batch);
          seen = batchSeen;
        }
      } catch (error) {
        console.error(`Catálogo O Boticário: falha no manifesto ${manifests[index]}.`, error);
      }
    });
    return products.map((product) => ({
      brand: "O Boticário",
      code: product.sku,
      name: product.nome,
      category: product.categoria,
      presentation: product.apresentacao,
      line: product.linha,
      productType: product.tipo,
      volume: product.volume,
      shortDescription: product.descricao,
      image: product.imagemOficial,
    }));
  }

  window.loadBoticarioCatalog = load;
})();
