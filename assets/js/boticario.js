(() => {
  "use strict";

  const fields = ["sku", "nome", "descricao", "categoria", "apresentacao", "linha", "tipo", "volume", "imagemOficial"];
  const imagePath = /^assets\/images\/catalogos\/boticario\/(?:[A-Z]\d{5}\.(?:avif|jpe?g|png|webp)|foto-pendente\.webp)$/;
  // Tons escritos nos nomes do catálogo sem a indicação “Tom”.
  const namedShades = {
    B59051: "Red Velvet", B59052: "Pink Hibiscus", B59053: "Caramel Classic",
    B58981: "Invisível",
    B52794: "Cor 1 (tons 100–150)", B52795: "Cor 2 (tons 160–220)",
    B52798: "Cor 3 (tons 220–260)", B52797: "Cor 4 (tons 270–330)",
    B50706: "Rose", B51179: "Brown", B50705: "Coral", B50704: "Berry",
    B59134: "Gold", B85668: "Rose", B85666: "Pink Hit", B85667: "Cherry Hit",
  };

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
    "data/boticario-lote-25.v1.json",
    "data/boticario-lote-26.v1.json",
    "data/boticario-lote-27.v1.json",
    "data/boticario-lote-28.v1.json",
    "data/boticario-lote-29.v1.json",
    "data/boticario-lote-30.v1.json",
    "data/boticario-lote-31.v1.json",
    "data/boticario-lote-32.v1.json",
    "data/boticario-lote-33.v1.json",
    "data/boticario-lote-34.v1.json",
    "data/boticario-lote-35.v1.json",
    "data/boticario-lote-36.v1.json",
    "data/boticario-lote-37.v1.json",
    "data/boticario-lote-38.v1.json",
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
      shade: product.nome.match(/\bTom (\d+[A-Z])\b/u)?.[1] || namedShades[product.sku] || "",
      shortDescription: product.descricao,
      image: product.imagemOficial,
    }));
  }

  window.loadBoticarioCatalog = load;
})();
