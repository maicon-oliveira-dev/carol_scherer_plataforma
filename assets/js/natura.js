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

  const grid = document.querySelector("#natura-products");
  const count = document.querySelector("#brand-count");
  const notice = document.querySelector("#brand-empty");
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
    "data/natura-lote-37.v1.json"
  ];

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  async function card(product) {
    const image = new Image();
    image.alt = product.nome;
    image.src = new URL(product.imagemOficial, root).href;
    await image.decode();

    const article = element("article", "favorite-card");
    article.dataset.brand = "Natura";
    const picture = element("div", "favorite-image");
    picture.append(image);

    const body = element("div", "favorite-body");
    const contact = element("a", "favorite-link", "Consultar com a Carol ↗");
    const message = ["Olá, Carol! Tenho interesse neste produto:", "", `Produto: ${product.nome}`];
    if (product.sku) message.push(`Código: ${product.sku}`);
    contact.href = "https://wa.me/5547997854773?text=" + encodeURIComponent(message.join("\n"));
    body.append(
      element("h3", "", product.nome),
      element("p", "favorite-category", product.categoria),
      element("p", "product-details", `SKU: ${product.sku}`),
      element("p", "product-description", product.descricao),
      contact
    );
    article.append(picture, body);
    return article;
  }

  async function appendBatch(path, seen) {
    const response = await fetch(new URL(path, root), { cache: "no-cache" });
    if (!response.ok) throw new Error(`Manifesto Natura indisponivel (HTTP ${response.status}).`);

    const batchSeen = new Set(seen);
    const products = validate(await response.json(), batchSeen);
    if (products.length) {
      const cards = await Promise.all(products.map(card));
      grid.append(...cards);
      count.textContent = `${grid.childElementCount} produtos exibidos`;
      notice.hidden = true;
    }
    return batchSeen;
  }

  async function render() {
    let seen = new Set();
    for (const path of manifestPaths) {
      try {
        seen = await appendBatch(path, seen);
      } catch (error) {
        console.error(`Catalogo Natura: falha no manifesto ${path}`, error);
      }
    }
  }

  render().catch((error) => {
    console.error("Catalogo Natura:", error);
  });
})();
