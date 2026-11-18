(() => {
  "use strict";

  const store = "https://www.minhaloja.natura.com";
  const fields = ["sku", "nome", "descricao", "categoria", "imagemOficial", "linkLojaCarol"];
  const imagePath = /^assets\/images\/catalogos\/natura\/[a-z0-9][a-z0-9_-]*\.(?:avif|jpe?g|png|webp)$/i;

  function validate(manifest) {
    if (!manifest || manifest.versao !== 1 || typeof manifest.ativo !== "boolean" ||
        !Array.isArray(manifest.produtos)) {
      throw new Error("Manifesto Natura v1 invalido.");
    }

    const { produtos } = manifest;
    if (produtos.length !== 20 && (manifest.ativo || produtos.length !== 0)) {
      throw new Error("O lote piloto deve conter exatamente 20 produtos.");
    }

    const seen = new Set();
    produtos.forEach((product, index) => {
      const row = index + 1;
      if (!product || Object.keys(product).length !== fields.length ||
          !fields.every((field) => Object.hasOwn(product, field) &&
            typeof product[field] === "string" && product[field].trim() &&
            product[field] === product[field].trim())) {
        throw new Error(`Produto Natura ${row}: esperado o conjunto de seis campos obrigatorios.`);
      }

      const sku = product.sku.normalize("NFC").toUpperCase();
      if (/\s/.test(sku) || seen.has(sku)) {
        throw new Error(`Produto Natura ${row}: SKU invalido ou duplicado.`);
      }
      seen.add(sku);

      const expectedLink = `${store}/p/produto/NATBRA-${encodeURIComponent(product.sku)}?consultoria=carolinescherer`;
      if (fields.some((field) => /[<>]/.test(product[field])) ||
          !imagePath.test(product.imagemOficial) || product.linkLojaCarol !== expectedLink) {
        throw new Error(`Produto Natura ${row}: texto, imagem ou link invalido.`);
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
  const manifestUrl = new URL("data/natura-piloto.v1.json", root);

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

  async function render() {
    const response = await fetch(manifestUrl, { cache: "no-cache" });
    if (!response.ok) throw new Error("Manifesto Natura indisponivel.");

    const products = validate(await response.json());
    if (!products.length) return;

    const cards = await Promise.all(products.map(card));
    grid.replaceChildren(...cards);
    count.textContent = `${cards.length} produtos exibidos`;
    notice.hidden = true;
  }

  render().catch((error) => {
    console.error("Catalogo Natura:", error);
  });
})();
