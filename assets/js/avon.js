(() => {
  "use strict";

  const manifestPaths = [
    "data/avon-lote-piloto.v1.json",
    "data/avon-lote-2.v1.json",
    "data/avon-lote-3.v1.json",
    "data/avon-lote-4.v1.json",
    "data/avon-lote-5.v1.json",
    "data/avon-lote-6.v1.json",
    "data/avon-lote-7.v1.json",
    "data/avon-lote-8.v1.json",
    "data/avon-lote-9.v1.json",
    "data/avon-lote-10.v1.json",
    "data/avon-lote-11.v1.json",
    "data/avon-lote-12.v1.json",
    "data/avon-lote-13.v1.json",
    "data/avon-lote-14.v1.json",
    "data/avon-lote-15.v1.json",
  ];
  const imagePath =
    /^assets\/images\/catalogos\/avon\/[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/;
  const textFields = ["nome", "descricao", "categoria", "tipo", "volume"];
  const isText = (value) =>
    typeof value === "string" &&
    value.length > 0 &&
    value === value.trim() &&
    !/[<>]/.test(value);
  const isImage = (value) => typeof value === "string" && imagePath.test(value);

  function validate(manifest, seen = { ids: new Set(), codes: new Set() }) {
    if (
      manifest?.versao !== 1 ||
      typeof manifest.ativo !== "boolean" ||
      !Array.isArray(manifest.produtos)
    ) {
      throw new Error("Manifesto Avon v1 inválido.");
    }

    const { ids, codes } = manifest.ativo
      ? seen
      : { ids: new Set(), codes: new Set() };
    function addCode(sku) {
      if (typeof sku !== "string" || !/^\d{6}$/.test(sku) || codes.has(sku)) {
        throw new Error(`Código Avon inválido ou duplicado: ${sku}.`);
      }
      codes.add(sku);
    }

    for (const product of manifest.produtos) {
      if (
        !product ||
        !isText(product.id) ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.id) ||
        ids.has(product.id) ||
        !textFields.every((field) => isText(product[field])) ||
        !isImage(product.imagemOficial)
      ) {
        throw new Error(`Card Avon inválido ou duplicado: ${product?.id}.`);
      }
      ids.add(product.id);
      if (!Object.hasOwn(product, "tons")) {
        addCode(product.sku);
        continue;
      }
      if (
        Object.hasOwn(product, "sku") ||
        !Array.isArray(product.tons) ||
        product.tons.length < 2
      ) {
        throw new Error(`Agrupamento de tons Avon inválido: ${product.id}.`);
      }
      const names = new Set();
      for (const tone of product.tons) {
        const name = tone?.nome;
        const key =
          isText(name) && name.normalize("NFC").toLocaleLowerCase("pt-BR");
        if (
          !key ||
          names.has(key) ||
          (Object.hasOwn(tone, "imagemOficial") && !isImage(tone.imagemOficial))
        ) {
          throw new Error(`Tom Avon inválido ou duplicado: ${product.id}.`);
        }
        names.add(key);
        addCode(tone.sku);
      }
    }
    return manifest.ativo ? manifest.produtos : [];
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { manifestPaths, validate };
    return;
  }

  const root = new URL("../../", document.currentScript.src);
  window.loadAvonCatalog = async () => {
    const manifests = await Promise.all(
      manifestPaths.map(async (path) => {
        const response = await fetch(new URL(path, root), {
          cache: "no-cache",
        });
        if (!response.ok)
          throw new Error(
            `Manifesto Avon indisponível: ${path} (HTTP ${response.status}).`,
          );
        return response.json();
      }),
    );
    const seen = { ids: new Set(), codes: new Set() };
    return manifests
      .flatMap((manifest) => validate(manifest, seen))
      .map((product) => ({
        id: `avon-${product.id}`,
        brand: "Avon",
        code: product.sku,
        name: product.nome,
        shortDescription: product.descricao,
        category: product.categoria,
        productType: product.tipo,
        volume: product.volume,
        image: product.imagemOficial,
        variations: product.tons?.map((tone) => ({
          name: tone.nome,
          code: tone.sku,
          image: tone.imagemOficial,
        })),
      }));
  };
})();
