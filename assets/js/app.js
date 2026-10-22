// Produtos reais serão cadastrados aqui após confirmação de nome, marca, categoria e disponibilidade.
const products = [];
const button = document.querySelector(".menu-toggle"),
  nav = document.querySelector("#nav");
button.addEventListener("click", () => {
  const open = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
});
const grid = document.querySelector("#products");
if (grid) {
  const brand = document.querySelector("#brand-filter"),
    search = document.querySelector("#search"),
    empty = document.querySelector("#empty");
  function render() {
    const result = products.filter(
      (p) =>
        p.category === grid.dataset.category &&
        (!brand.value || p.brand === brand.value) &&
        p.name
          .toLocaleLowerCase("pt-BR")
          .includes(search.value.toLocaleLowerCase("pt-BR")),
    );
    grid.replaceChildren();
    result.forEach((p) => {
      const card = document.createElement("article");
      card.className = "card";
      const name = document.createElement("h3");
      name.textContent = p.name;
      const label = document.createElement("p");
      label.textContent = p.brand;
      const link = document.createElement("a");
      link.textContent = "Consultar no WhatsApp ↗";
      link.href =
        "https://wa.me/5547997854773?text=" +
        encodeURIComponent(
          "Olá, Carol! Gostaria de saber mais sobre " + p.name + ".",
        );
      card.append(label, name, link);
      grid.append(card);
    });
    empty.hidden = result.length > 0;
    empty.textContent = products.length
      ? "Nenhum produto encontrado para os filtros selecionados."
      : "O catálogo de produtos está sendo preparado. Entre em contato para conhecer as opções disponíveis.";
  }
  brand.addEventListener("change", render);
  search.addEventListener("input", render);
  render();
}

// Paginas de marca e categoria compartilham products.
const brandGrid = document.querySelector("#brand-products");
if (brandGrid) {
  const filter = document.querySelector("#type-filter");
  const empty = document.querySelector("#brand-empty");
  const brandProducts = products.filter((p) => p.brand === brandGrid.dataset.brand);
  const types = [...new Set(brandProducts.map((p) => p.type).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  types.forEach((type) => { const option = document.createElement("option"); option.value = type; option.textContent = type; filter.append(option); });
  filter.disabled = types.length === 0;
  function renderBrand() {
    const result = brandProducts.filter((p) => !filter.value || p.type === filter.value);
    brandGrid.replaceChildren();
    result.forEach((p) => {
      const card = document.createElement("article"); card.className = "card";
      if (p.type) { const type = document.createElement("span"); type.className = "eyebrow"; type.textContent = p.type; card.append(type); }
      const name = document.createElement("h3"); name.textContent = p.name; card.append(name); brandGrid.append(card);
    });
    empty.hidden = result.length > 0;
    empty.textContent = brandProducts.length ? "Nenhum produto encontrado para o tipo selecionado." : "O catálogo de produtos está sendo preparado.";
  }
  filter.addEventListener("change", renderBrand); renderBrand();
}

const carousel = document.querySelector(".carousel");
if (carousel) {
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const controls = carousel.querySelector(".carousel-controls");
  const pause = carousel.querySelector("[data-carousel-pause]");
  const status = carousel.querySelector(".carousel-status");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const rotationDelay = 6000;
  let index = 0;
  let paused = reducedMotion.matches;
  let hovered = false;
  let resumeWhileHovered = false;
  let timer;

  function updatePause() {
    const label = paused ? "Retomar rotação" : "Pausar rotação";
    pause.setAttribute("aria-label", label);
    pause.title = label;
    pause.querySelector("[data-carousel-pause-label]").textContent = label;
    pause
      .querySelector("[data-carousel-pause-icon]")
      .setAttribute(
        "d",
        paused ? "M7 4v16l13-8z" : "M6 4h4v16H6z M14 4h4v16h-4z",
      );
  }
  function stopTimer() {
    clearTimeout(timer);
    timer = undefined;
  }
  function startTimer() {
    stopTimer();
    if (!paused && !document.hidden && (!hovered || resumeWhileHovered)) {
      timer = setTimeout(() => show(index + 1, false), rotationDelay);
    }
  }
  function show(next, announce = true) {
    const nextIndex = (next + slides.length) % slides.length;
    // Uma seta acionada sobre o link não pode deixar o foco em um slide oculto.
    if (nextIndex !== index && slides[index].contains(document.activeElement)) {
      carousel.focus({ preventScroll: true });
    }
    index = nextIndex;
    slides.forEach((slide, i) => {
      slide.hidden = i !== index;
    });
    dots.forEach((dot, i) => {
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (announce) {
      paused = true;
      updatePause();
      status.textContent = `Slide ${index + 1} de ${slides.length}: ${slides[index].querySelector("h2").textContent}`;
    }
    startTimer();
  }
  carousel
    .querySelector("[data-carousel-prev]")
    .addEventListener("click", () => show(index - 1));
  carousel
    .querySelector("[data-carousel-next]")
    .addEventListener("click", () => show(index + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));
  pause.addEventListener("click", () => {
    paused = !paused;
    // Retomar tem efeito mesmo se o foco e o ponteiro ainda estiverem no botão.
    resumeWhileHovered = !paused;
    updatePause();
    startTimer();
  });
  carousel.addEventListener("keydown", (event) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.target.closest("input, select, textarea, [contenteditable]")
    ) {
      return;
    }
    const destinations = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: slides.length - 1,
    };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    show(destinations[event.key]);
  });
  carousel.addEventListener("mouseenter", () => {
    hovered = true;
    resumeWhileHovered = false;
    startTimer();
  });
  carousel.addEventListener("mouseleave", () => {
    hovered = false;
    resumeWhileHovered = false;
    startTimer();
  });
  carousel.addEventListener("focusin", (event) => {
    if (event.target === pause) return;
    paused = true;
    updatePause();
    stopTimer();
  });
  document.addEventListener("visibilitychange", startTimer);
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      paused = true;
      updatePause();
      stopTimer();
    }
  });
  controls.hidden = false;
  updatePause();
  startTimer();
}

// Destaques de categorias: um estado para abertura e sele??o.
const categoryExplorer = document.querySelector(".category-explorer");
if (categoryExplorer) {
  const categoryGrid = categoryExplorer.querySelector(".category-grid");
  const detail = categoryExplorer.querySelector(".category-detail");
  const cards = [...categoryGrid.querySelectorAll("[data-category]")];
  const controls = [...detail.querySelectorAll("[data-category]")];
  const panels = [...detail.querySelectorAll("[data-panel]")];
  const positions = ["center center", "center center", "center center"];
  let active = null;
  let isOpen = false;
  let opener = null;
  let restoringFocus = false;
  function openCategory(index, moveFocus = false) {
    if (!isOpen) opener = cards.find((button) => button.dataset.category === index);
    active = index;
    isOpen = true;
    const panel = panels.find((item) => item.dataset.panel === active);
    const card = cards.find((item) => item.dataset.category === active);
    // Os caminhos do HTML devem ser resolvidos em rela??o ? p?gina, n?o ao CSS.
    const desktopImage = new URL(card.querySelector("img").getAttribute("src"), document.baseURI).href;
    const mobileImage = new URL(panel.dataset.mobileImage, document.baseURI).href;
    detail.style.setProperty("--category-image", `url("${desktopImage}")`);
    detail.style.setProperty("--category-mobile-image", `url("${mobileImage}")`);
    detail.style.setProperty("--category-position", positions[Number(active)]);
    panels.forEach((item) => { item.hidden = item !== panel; });
    controls.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.category === active)));
    cards.forEach((button) => button.setAttribute("aria-expanded", String(button.dataset.category === active)));
    detail.inert = false;
    detail.setAttribute("aria-hidden", "false");
    categoryExplorer.classList.add("is-open");
    if (moveFocus) controls.find((button) => button.dataset.category === active).focus();
    categoryGrid.inert = true;
    categoryGrid.setAttribute("aria-hidden", "true");
  }
  function closeCategory(moveFocus = false) {
    if (!isOpen) return;
    isOpen = false;
    categoryGrid.inert = false;
    categoryGrid.removeAttribute("aria-hidden");
    categoryExplorer.classList.remove("is-open");
    cards.forEach((button) => button.setAttribute("aria-expanded", "false"));
    if (moveFocus && opener) {
      restoringFocus = true;
      opener.focus();
      restoringFocus = false;
    }
    detail.inert = true;
    detail.setAttribute("aria-hidden", "true");
  }
  cards.forEach((button) => {
    button.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") openCategory(button.dataset.category); });
    button.addEventListener("focus", () => { if (!restoringFocus) openCategory(button.dataset.category, true); });
    button.addEventListener("click", () => openCategory(button.dataset.category, true));
  });
  controls.forEach((button) => {
    button.addEventListener("click", () => openCategory(button.dataset.category));
    button.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") openCategory(button.dataset.category); });
    button.addEventListener("focus", () => openCategory(button.dataset.category));
  });
  detail.querySelector(".category-close").addEventListener("click", () => closeCategory(true));
  categoryExplorer.addEventListener("pointerleave", (event) => { if (event.pointerType === "mouse" && !categoryExplorer.contains(document.activeElement)) closeCategory(); });
  categoryExplorer.addEventListener("focusout", (event) => { if (!categoryExplorer.contains(event.relatedTarget)) closeCategory(); });
  categoryExplorer.addEventListener("keydown", (event) => { if (event.key === "Escape" && isOpen) { event.preventDefault(); closeCategory(true); } });
}

// Produtos confirmados; inclua image somente depois de conferir a foto exata.
// Os registros sem imagem ficam fora da vitrine.
const favoriteCandidates = [
  { id: "kaiak-masculino", brand: "Natura", name: "Kaiak Masculino tradicional", category: "Perfumaria" },
  { id: "tododia-algodao", brand: "Natura", name: "Sabonetes Tododia Algodão, caixa com 5 unidades", category: "Corpo e banho" },
  { id: "luna", brand: "Natura", name: "Luna tradicional", category: "Perfumaria" },
  { id: "tododia-macadamia", brand: "Natura", name: "Hidratante corporal Tododia Macadâmia, 400 ml", category: "Corpo e banho" },
  { id: "lumina-antioleosidade", brand: "Natura", name: "Shampoo Lumina anti-oleosidade", category: "Cabelos" },
  { id: "homem-sagaz", brand: "Natura", name: "Homem Sagaz", category: "Perfumaria" },
  { id: "peppermint", brand: "dōTERRA", name: "Óleo essencial Peppermint", category: "Bem-estar" },
  { id: "lavanda", brand: "dōTERRA", name: "Óleo essencial Lavanda", category: "Bem-estar" },
  { id: "hydra-glow", brand: "Eudora", name: "Base Niina Secrets Hydra Glow, 30 ml", category: "Maquiagem" },
  { id: "timewise-matte-3d", brand: "Mary Kay", name: "Base TimeWise Matte 3D", category: "Maquiagem" },
];
const favorites = document.querySelector(".favorites");
if (favorites) {
  const grid = favorites.querySelector(".favorites-grid");
  const count = favorites.querySelector(".favorites-count");
  const empty = favorites.querySelector(".favorites-empty");
  const filters = [...favorites.querySelectorAll("[data-favorite-filter]")];
  let selected = "";
  let available = [];
  function renderFavorites() {
    const shown = available.filter((product) => !selected || product.category === selected);
    grid.replaceChildren();
    shown.forEach((product) => {
      const card = document.createElement("article"); card.className = "favorite-card";
      const image = document.createElement("img"); image.src = product.image; image.alt = `${product.name} - ${product.brand}`; image.loading = "lazy"; image.decoding = "async";
      const picture = document.createElement("div"); picture.className = "favorite-image"; picture.append(image);
      const body = document.createElement("div"); body.className = "favorite-body";
      const brand = document.createElement("span"); brand.className = "favorite-brand"; brand.textContent = product.brand;
      const name = document.createElement("h3"); name.textContent = product.name;
      const category = document.createElement("p"); category.className = "favorite-category"; category.textContent = product.category;
      const link = document.createElement("a"); link.className = "favorite-link"; link.textContent = "Consultar com a Carol ↗";
      link.href = "https://wa.me/5547997854773?text=" + encodeURIComponent(`Olá, Carol! Gostaria de saber mais sobre ${product.brand} ${product.name}.`);
      body.append(brand, name, category, link); card.append(picture, body); grid.append(card);
    });
    count.textContent = `${shown.length} ${shown.length === 1 ? "produto exibido" : "produtos exibidos"}`;
    empty.hidden = shown.length > 0;
    empty.textContent = available.length ? "Nenhum produto nesta categoria por enquanto." : "A seleção de produtos está sendo preparada.";
    filters.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.favoriteFilter === selected)));
  }
  filters.forEach((button) => button.addEventListener("click", () => { selected = button.dataset.favoriteFilter; renderFavorites(); }));
  renderFavorites();
  // Só apresenta imagens que carregam; preserva a ordem dos registros.
  Promise.all(favoriteCandidates.filter((product) => product.image).map((product) => new Promise((resolve) => {
    const image = new Image(); image.onload = () => resolve(product); image.onerror = () => resolve(null); image.src = product.image;
  }))).then((results) => { available = results.filter(Boolean); renderFavorites(); });
}
