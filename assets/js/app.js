// Produtos confirmados; inclua image somente depois de conferir a foto exata.
// Os registros sem imagem ficam fora da vitrine.
const products = [
  { id: "kaiak-masculino", brand: "Natura", name: "Kaiak Masculino tradicional", category: "Perfumaria", image: "assets/images/products/natura-kaiak-masculino-100ml.jpg", audience: "masculino" },
  { id: "tododia-algodao", brand: "Natura", name: "Sabonetes Tododia Algodão, caixa com 5 unidades", category: "Corpo e banho", image: "assets/images/products/natura-tododia-sabonetes-algodao-5x90g.jpg" },
  { id: "luna", brand: "Natura", name: "Luna tradicional", category: "Perfumaria", image: "assets/images/products/natura-luna-75ml.jpg", audience: "feminino" },
  { id: "tododia-macadamia", brand: "Natura", name: "Hidratante corporal Tododia Macadâmia, 400 ml", category: "Corpo e banho", image: "assets/images/products/natura-tododia-macadamia-400ml.jpg" },
  { id: "lumina-antioleosidade", brand: "Natura", name: "Shampoo Lumina anti-oleosidade", category: "Cabelos", image: "assets/images/products/natura-lumina-shampoo-antioleosidade-300ml.jpg" },
  { id: "homem-sagaz", brand: "Natura", name: "Homem Sagaz", category: "Perfumaria", image: "assets/images/products/natura-homem-sagaz-100ml.jpg", audience: "masculino" },
  { id: "peppermint", brand: "dōTERRA", name: "Óleo essencial Peppermint", category: "Bem-estar", image: "assets/images/products/Frasco dōTERRA Peppermint minimalista.png" },
  { id: "lavanda", brand: "dōTERRA", name: "Óleo essencial Lavanda", category: "Bem-estar", image: "assets/images/products/Óleo essencial de lavanda dōTERRA.png" },
  { id: "hydra-glow", brand: "Eudora", name: "Base Niina Secrets Hydra Glow, 30 ml", category: "Maquiagem", image: "assets/images/products/Base Hidra Glow Niina Secrets-1.png", audience: "feminino" },
  { id: "timewise-matte-3d", brand: "Mary Kay", name: "Base TimeWise Matte 3D", category: "Maquiagem", image: "assets/images/products/Base Mary Kay TimeWise Matte 3D.png", audience: "feminino" },
  { id: "herbia-cristal", brand: "Herbia", name: "Desodorante Cristal", category: "Corpo e banho", image: "assets/images/products/Desodorante cristal Herbia em vidro elegante.png" },
  { id: "nature-roll-on-rosa", brand: "Natura", name: "Desodorante roll-on Naturé rosa", category: "Corpo e banho", image: "assets/images/products/Desodorante Natura Naturé Kids rosa coral-2.png" },
  { id: "acqua-di-cleo-difusor", brand: "Acqua Di Cleo", name: "Difusor 110 ml", category: "Bem-estar", image: "assets/images/products/Difusor Acqua Di Cleo 110 ml.png" },
  { id: "cuide-se-bem-deleite", brand: "O Boticário", name: "Sabonetes em barra Cuide-se Bem Deleite Especial", category: "Corpo e banho", image: "assets/images/products/Duo Deleite em caixa de leite.png" },
  { id: "jequiti-cebolinha", brand: "Jequiti", name: "Cebolinha 50 ml", category: "Perfumaria", image: "assets/images/products/Frasco Jequiti Cebolinha 50 ml.png" },
  { id: "avon-super-shock-max", brand: "Avon", name: "Máscara Super Shock Max", category: "Maquiagem", image: "assets/images/products/Máscara Avon Super Shock Max.png", audience: "feminino" },
  { id: "chronos-derma-45", brand: "Natura", name: "Chronos Derma 45+ Dia FPS 30", category: "Bem-estar", image: "assets/images/products/Natura Chronos Derma 45+ Dia FPS 30.png" },
  { id: "natura-solar-fps-50", brand: "Natura", name: "Natura Solar FPS 50", category: "Bem-estar", image: "assets/images/products/Natura Solar FPS 50 em tubo.png" },
  { id: "biospor-shampoo", brand: "Biozenthi", name: "Shampoo Biospor", category: "Cabelos", image: "assets/images/products/Packshot premium do shampoo Biospor.png" },
  { id: "tododia-sem-perfume", brand: "Natura", name: "Desodorante roll-on Tododia sem perfume", category: "Corpo e banho", image: "assets/images/products/Roll-on Natura Tododia sem perfume.png" },
  { id: "herbia-rosa-mosqueta", brand: "Herbia", name: "Óleo de Rosa Mosqueta", category: "Bem-estar", image: "assets/images/products/Óleo de Rosa Mosqueta Herbia.png" },
  { id: "boticario-body-splash-acerola-e-vai", brand: "O Boticário", name: "Body Splash Acerola e Vai", category: "Corpo e banho", image: "assets/images/produtos_30_10_2025/Body splash O Boticário Acerola e Vai.png", audience: "feminino" },
  { id: "eudora-siage-ultra-bond-reset-condicionador", brand: "Eudora", name: "Siàge Ultra Bond Reset, condicionador", category: "Cabelos", image: "assets/images/produtos_30_10_2025/Condicionador Eudora Siàge Ultra Bond Reset-2.png", audience: "feminino" },
  { id: "mary-kay-gel-colageno-fucsia", brand: "Mary Kay", name: "Gel de colágeno, pote fúcsia", category: "Cuidados faciais", image: "assets/images/produtos_30_10_2025/Gel de colágeno Mary Kay-2.png", audience: "feminino" },
  { id: "mary-kay-gel-hidratante-colageno-rosa-claro", brand: "Mary Kay", name: "Gel hidratante de colágeno, pote rosa-claro", category: "Cuidados faciais", image: "assets/images/produtos_30_10_2025/Gel hidratante de colágeno Mary Kay.png", audience: "feminino" },
  { id: "boticario-leau-de-lily-soleil", brand: "O Boticário", name: "L’Eau de Lily Soleil", category: "Perfumaria", image: "assets/images/produtos_30_10_2025/L’Eau de Lily Soleil em fundo marfim.png", audience: "feminino" },
  { id: "boticario-locao-corporal-acerola-e-vai-400ml", brand: "O Boticário", name: "Loção corporal Acerola e Vai, 400 ml", category: "Corpo e banho", image: "assets/images/produtos_30_10_2025/Loção corporal Acerola e Vai 400 ml.png", audience: "feminino" },
  { id: "avon-mascara-rosa-aplicador-preto", brand: "Avon", name: "Máscara para cílios rosa com aplicador preto", category: "Maquiagem", image: "assets/images/produtos_30_10_2025/Máscara Avon rosa com aplicador preto.png", audience: "feminino" },
  { id: "eudora-siage-ultra-bond-reset-mascara", brand: "Eudora", name: "Siàge Ultra Bond Reset, máscara capilar", category: "Cabelos", image: "assets/images/produtos_30_10_2025/Máscara Siàge Ultra Bond Reset-1.png", audience: "feminino" },
  { id: "doterra-oleo-essencial-bergamota", brand: "dōTERRA", name: "Óleo essencial de bergamota", category: "Bem-estar", image: "assets/images/produtos_30_10_2025/Óleo essencial de bergamota doTERRA.png" },
  { id: "eudora-siage-ultra-bond-reset-oleo-leve", brand: "Eudora", name: "Siàge Ultra Bond Reset, óleo leve", category: "Cabelos", image: "assets/images/produtos_30_10_2025/Óleo Leve Reset Eudora Siàge-4.png", audience: "feminino" },
  { id: "boticario-make-b-scandal-blend", brand: "O Boticário", name: "Make B. — Paleta Scandal Blend", category: "Maquiagem", image: "assets/images/produtos_30_10_2025/Paleta Make B. Scandal Blend em destaque.png", audience: "feminino" },
  { id: "boticario-liz-desodorante-colonia", brand: "O Boticário", name: "Liz Desodorante Colônia", category: "Perfumaria", image: "assets/images/produtos_30_10_2025/Perfume Liz em frasco rosé elegante.png", audience: "feminino" },
  { id: "mary-kay-patches-gel", brand: "Mary Kay", name: "Máscaras faciais em patches de gel", category: "Cuidados faciais", image: "assets/images/produtos_30_10_2025/Pote amarelo de patches Mary Kay-1.png", audience: "feminino" },
  { id: "mary-kay-balsamo-limpeza", brand: "Mary Kay", name: "Bálsamo de limpeza", category: "Cuidados faciais", image: "assets/images/produtos_30_10_2025/Pote de bálsamo de limpeza Mary Kay.png", audience: "feminino" },
  { id: "eudora-siage-ultra-bond-reset-tratamento", brand: "Eudora", name: "Siàge Ultra Bond Reset, tratamento capilar", category: "Cabelos", image: "assets/images/produtos_30_10_2025/Tratamento capilar Eudora Siàge Ultra Bond Reset-3.png", audience: "feminino" },
];
const assetBase = new URL("../../", document.querySelector('script[src$="app.js"]').src);

/* Tema visual persistente: claro é o padrão e dark é uma preferência opcional. */
const themeStorageKey = "carol-scherer-theme";
function initializeThemeToggle() {
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem(themeStorageKey) || "light"; } catch (_) { /* armazenamento indisponível: mantém claro */ }
  const root = document.documentElement;
  root.dataset.theme = savedTheme === "dark" ? "dark" : "light";

  const head = document.querySelector(".head");
  if (!head) return;
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "theme-toggle";
  toggle.setAttribute("aria-live", "polite");
  function renderThemeToggle() {
    const isDark = root.dataset.theme !== "light";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Mudar para tema claro" : "Mudar para tema escuro");
    toggle.innerHTML = `<span aria-hidden="true">${isDark ? "Claro" : "Escuro"}</span><span class="theme-toggle-state">${isDark ? "Dark" : "Claro"}</span>`;
  }
  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem(themeStorageKey, root.dataset.theme); } catch (_) { /* preferência vale nesta página */ }
    renderThemeToggle();
  });
  const menuToggle = head.querySelector(".menu-toggle");
  if (menuToggle) menuToggle.before(toggle); else head.append(toggle);
  renderThemeToggle();
}
initializeThemeToggle();

const menuButton = document.querySelector(".menu-toggle");
const menuNav = document.querySelector("#nav");
if (menuButton && menuNav) menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuNav.classList.toggle("open", open);
});
// Navegação progressiva: os links originais permanecem disponíveis sem JavaScript.
if (menuNav && menuButton) {
  const brandRoutes = { "Natura": "natura", "Avon": "avon", "Mary Kay": "mary-kay", "Eudora": "eudora", "dōTERRA": "doterra", "Jequiti": "jequiti", "O Boticário": "o-boticario", "Biozenthi": "biozenthi", "Herbia": "herbia", "Acqua Di Cleo": "acqua-di-cleo" };
  const routes = { feminino: "pages/feminino.html", masculino: "pages/masculino.html", marcas: "pages/marcas.html" };
  const media = window.matchMedia("(max-width: 959px)");
  const entries = [];
  let active = null, closeTimer, restoringMegaFocus = false;
  const url = (path) => new URL(path, assetBase).href;
  function closePanel(restore = false) {
    clearTimeout(closeTimer);
    if (!active) return;
    const previous = active; active = null; previous.panel.hidden = true;
    previous.trigger.setAttribute("aria-expanded", "false"); previous.wrapper.classList.remove("is-open");
    if (restore) { restoringMegaFocus = true; previous.trigger.focus(); restoringMegaFocus = false; }
  }
  function openPanel(entry) {
    clearTimeout(closeTimer);
    if (active === entry) return;
    closePanel(); active = entry; entry.panel.hidden = false;
    entry.trigger.setAttribute("aria-expanded", "true"); entry.wrapper.classList.add("is-open");
  }
  function addLink(parent, label, href) {
    const a = document.createElement("a"); a.href = href; a.textContent = label; parent.append(a); return a;
  }
  function heading(parent, label) { const h = document.createElement("h3"); h.textContent = label; parent.append(h); }
  const catalogLink = document.createElement("a");
  catalogLink.href = url("pages/todos-os-produtos.html");
  catalogLink.textContent = "Todos os produtos";
  const aboutLink = [...menuNav.querySelectorAll(":scope > a")].find((link) => link.getAttribute("href").endsWith("/sobre.html"));
  if (aboutLink) aboutLink.before(catalogLink); else menuNav.append(catalogLink);
  for (const key of ["feminino", "masculino", "marcas"]) {
    const original = [...menuNav.querySelectorAll(":scope > a")].find((a) => a.getAttribute("href").endsWith(key + ".html"));
    if (!original) continue;
    const wrapper = document.createElement("div"); wrapper.className = "mega-item";
    original.before(wrapper); wrapper.append(original);
    const trigger = document.createElement("button"); trigger.type = "button"; trigger.className = "mega-trigger";
    trigger.setAttribute("aria-label", `Abrir menu ${original.textContent.trim()}`); trigger.setAttribute("aria-expanded", "false"); trigger.setAttribute("aria-controls", `mega-${key}`); trigger.textContent = "⌄"; wrapper.append(trigger);
    const panel = document.createElement("div"); panel.id = `mega-${key}`; panel.className = "mega-panel"; panel.hidden = true;
    const content = document.createElement("div"); content.className = "mega-content";
    const top = document.createElement("div"); top.className = "mega-top";
    const title = document.createElement("strong"); title.textContent = original.textContent.trim(); top.append(title);
    const close = document.createElement("button"); close.type = "button"; close.className = "mega-close"; close.textContent = "Fechar ×"; close.setAttribute("aria-label", `Fechar menu ${title.textContent}`); top.append(close); content.append(top);
    const columns = document.createElement("div"); columns.className = "mega-columns";
    const scope = key === "marcas" ? products : products.filter((product) => product.audience === key);
    const categories = [...new Set(scope.map((product) => product.category))].sort((a,b) => a.localeCompare(b,"pt-BR"));
    const brands = [...new Set(scope.map((product) => product.brand))].filter((name) => brandRoutes[name]).sort((a,b) => a.localeCompare(b,"pt-BR"));
    if (key !== "marcas") {
      const section = document.createElement("section"); heading(section, "Categorias");
      categories.forEach((category) => addLink(section, category, url(routes[key]))); columns.append(section);
    }
    const brandSection = document.createElement("section"); heading(brandSection, "Marcas");
    if (key === "marcas") {
      const label = document.createElement("label"); label.className = "mega-search"; label.textContent = "Buscar marca";
      const input = document.createElement("input"); input.type = "search"; input.placeholder = "Nome da marca"; label.append(input); brandSection.append(label);
      const links = document.createElement("div"); links.className = "mega-brand-list";
      brands.forEach((name) => { const a = addLink(links, name, url(`pages/marcas/${brandRoutes[name]}.html`)); a.dataset.brandName = name; });
      const noResults = document.createElement("p"); noResults.className = "mega-no-results"; noResults.hidden = true; noResults.textContent = "Nenhuma marca encontrada.";
      input.addEventListener("input", () => { let visible = 0; links.querySelectorAll("a").forEach((a) => { const matches = a.dataset.brandName.toLocaleLowerCase("pt-BR").includes(input.value.trim().toLocaleLowerCase("pt-BR")); a.hidden = !matches; if (matches) visible++; }); noResults.hidden = visible > 0; });
      brandSection.append(links, noResults);
    } else {
      brands.forEach((name) => { const destination = new URL(routes[key], assetBase); destination.searchParams.set("marca", name); addLink(brandSection, name, destination.href); });
    }
    columns.append(brandSection); content.append(columns);
    const all = addLink(content, key === "marcas" ? "Ver todas as marcas →" : "Ver todo o catálogo →", url(routes[key])); all.className = "mega-all";
    const generalCatalog = addLink(content, "Todos os produtos →", url("pages/todos-os-produtos.html")); generalCatalog.className = "mega-all";
    panel.append(content); wrapper.append(panel);
    const entry = { wrapper, trigger, panel }; entries.push(entry);
    wrapper.addEventListener("pointerenter", (event) => { if (!media.matches && event.pointerType === "mouse") openPanel(entry); });
    wrapper.addEventListener("pointerleave", (event) => { if (!media.matches && event.pointerType === "mouse") { clearTimeout(closeTimer); closeTimer = setTimeout(() => { if (!wrapper.contains(document.activeElement)) closePanel(); }, 180); } });
    trigger.addEventListener("focus", () => { if (!restoringMegaFocus) openPanel(entry); });
    trigger.addEventListener("click", (event) => { event.stopPropagation(); if (active === entry && (trigger.dataset.wasOpen === "true" || event.detail === 0)) closePanel(); else openPanel(entry); delete trigger.dataset.wasOpen; });
    trigger.addEventListener("pointerdown", () => { trigger.dataset.wasOpen = String(active === entry); });
    close.addEventListener("click", () => closePanel(true));
  }
  menuNav.classList.add("has-mega");
  menuNav.addEventListener("focusout", (event) => { if (active && !active.wrapper.contains(event.relatedTarget)) closePanel(); });
  document.addEventListener("pointerdown", (event) => { if (!menuNav.contains(event.target)) closePanel(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { if (active) { event.preventDefault(); closePanel(true); } else if (menuNav.classList.contains("open")) { menuNav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); menuButton.focus(); } } });
  menuButton.addEventListener("click", () => { if (!menuNav.classList.contains("open")) closePanel(); });
}

function productCard(product) {
  const card = document.createElement("article"); card.className = "favorite-card";
  const picture = document.createElement("div"); picture.className = "favorite-image";
  const image = document.createElement("img"); image.src = new URL(product.image, assetBase).href; image.alt = `${product.name} - ${product.brand}`; image.loading = "lazy"; image.decoding = "async"; picture.append(image);
  const body = document.createElement("div"); body.className = "favorite-body";
  const brand = document.createElement("span"); brand.className = "favorite-brand"; brand.textContent = product.brand;
  const name = document.createElement("h3"); name.textContent = product.name;
  const category = document.createElement("p"); category.className = "favorite-category"; category.textContent = product.category;
  const link = document.createElement("a"); link.className = "favorite-link"; link.textContent = "Consultar com a Carol ↗";
  link.href = "https://wa.me/5547997854773?text=" + encodeURIComponent(`Olá, Carol! Gostaria de saber mais sobre ${product.brand} ${product.name}.`);
  body.append(brand, name, category, link); card.append(picture, body); return card;
}
function loadProducts(items) {
  return Promise.all(items.filter((p) => p.image).map((p) => new Promise((resolve) => {
    const image = new Image(); image.onload = () => resolve(p); image.onerror = () => resolve(null); image.src = new URL(p.image, assetBase).href;
  }))).then((results) => results.filter(Boolean));
}
const grid = document.querySelector("#products");
if (grid) {
  const brand = document.querySelector("#brand-filter"), search = document.querySelector("#search"), empty = document.querySelector("#empty"), count = document.querySelector("#catalog-count");
  const category = document.querySelector("#category-filter"), clear = document.querySelector("#clear-filters");
  let available = [];
  function render() {
    const query = search.value.trim().toLocaleLowerCase("pt-BR");
    const result = available.filter((p) => (!brand.value || p.brand === brand.value) && (!category || !category.value || p.category === category.value) && p.name.toLocaleLowerCase("pt-BR").includes(query));
    grid.replaceChildren(...result.map(productCard));
    count.textContent = `${result.length} ${result.length === 1 ? "produto exibido" : "produtos exibidos"}`;
    empty.hidden = result.length > 0;
    empty.textContent = available.length ? "Nenhum produto encontrado para os filtros selecionados." : "O catálogo de produtos está sendo preparado.";
  }
  brand.addEventListener("change", render); search.addEventListener("input", render); render();
  if (category) category.addEventListener("change", render);
  if (clear) clear.addEventListener("click", () => { brand.value = ""; category.value = ""; search.value = ""; render(); });
  loadProducts(grid.dataset.category ? products.filter((p) => p.audience === grid.dataset.category) : products).then((items) => {
    available = items; const names = [...new Set(items.map((p) => p.brand))].sort((a,b) => a.localeCompare(b, "pt-BR"));
    if (category) {
      const types = [...new Set(items.map((p) => p.category).filter(Boolean))].sort((a,b) => a.localeCompare(b, "pt-BR"));
      category.replaceChildren(new Option("Todas as categorias", "")); types.forEach((type) => category.add(new Option(type, type))); category.disabled = !types.length;
    }
    brand.replaceChildren(new Option("Todas as marcas", "")); names.forEach((name) => brand.add(new Option(name, name))); brand.disabled = !names.length; const requestedBrand = new URL(window.location.href).searchParams.get("marca"); if (names.includes(requestedBrand)) brand.value = requestedBrand; render();
  });
}
const brandGrid = document.querySelector("#brand-products");
if (brandGrid) {
  const filter = document.querySelector("#type-filter"), empty = document.querySelector("#brand-empty"), count = document.querySelector("#brand-count");
  let available = [];
  function renderBrand() {
    const result = available.filter((p) => !filter.value || p.category === filter.value);
    brandGrid.replaceChildren(...result.map(productCard)); count.textContent = `${result.length} ${result.length === 1 ? "produto exibido" : "produtos exibidos"}`;
    empty.hidden = result.length > 0; empty.textContent = available.length ? "Nenhum produto encontrado para o tipo selecionado." : "O catálogo de produtos está sendo preparado.";
  }
  filter.addEventListener("change", renderBrand); renderBrand();
  loadProducts(products.filter((p) => p.brand === brandGrid.dataset.brand)).then((items) => {
    available = items; const types = [...new Set(items.map((p) => p.category).filter(Boolean))].sort((a,b) => a.localeCompare(b, "pt-BR"));
    filter.replaceChildren(new Option("Todos os tipos", "")); types.forEach((type) => filter.add(new Option(type, type))); filter.disabled = !types.length; renderBrand();
  });
}

function upgradeSelects() {
  document.querySelectorAll("select").forEach((select) => {
    if (select.dataset.premiumSelect) return;
    select.dataset.premiumSelect = "true";
    const shell = document.createElement("div"); shell.className = "premium-select";
    const button = document.createElement("button"); button.type = "button"; button.className = "premium-select-trigger";
    const list = document.createElement("div"); list.className = "premium-select-list"; list.id = `premium-${select.id}`; list.setAttribute("role", "listbox"); list.hidden = true;
    button.setAttribute("aria-haspopup", "listbox"); button.setAttribute("aria-controls", list.id); button.setAttribute("aria-expanded", "false");
    select.before(shell); shell.append(select, button, list); select.classList.add("premium-select-native"); select.tabIndex = -1;
    const close = () => { list.hidden = true; button.setAttribute("aria-expanded", "false"); shell.classList.remove("is-open"); };
    const render = () => {
      const selected = select.selectedOptions[0]; button.textContent = selected ? selected.textContent : ""; button.disabled = select.disabled;
      list.replaceChildren(...[...select.options].map((option) => {
        const item = document.createElement("button"); item.type = "button"; item.className = "premium-select-option"; item.setAttribute("role", "option"); item.textContent = option.textContent; item.dataset.value = option.value; item.disabled = option.disabled; item.setAttribute("aria-selected", String(option.selected)); return item;
      }));
    };
    const open = () => { if (button.disabled) return; document.querySelectorAll(".premium-select.is-open").forEach((other) => { if (other !== shell) other.querySelector(".premium-select-trigger").click(); }); list.hidden = false; button.setAttribute("aria-expanded", "true"); shell.classList.add("is-open"); };
    button.addEventListener("click", () => list.hidden ? open() : close());
    button.addEventListener("keydown", (event) => { if (["ArrowDown", "ArrowUp", " ", "Enter"].includes(event.key)) { event.preventDefault(); open(); list.querySelector(".premium-select-option:not(:disabled)")?.focus(); } if (event.key === "Escape") close(); });
    list.addEventListener("click", (event) => { const item = event.target.closest(".premium-select-option"); if (!item || item.disabled) return; select.value = item.dataset.value; select.dispatchEvent(new Event("change", { bubbles: true })); close(); button.focus(); });
    list.addEventListener("keydown", (event) => { if (event.key === "Escape") { event.preventDefault(); close(); button.focus(); } });
    select.addEventListener("change", render); new MutationObserver(render).observe(select, { childList: true, subtree: true, attributes: true, attributeFilter: ["disabled"] });
    document.addEventListener("pointerdown", (event) => { if (!shell.contains(event.target)) close(); }); render();
  });
}
upgradeSelects();

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
  Promise.all(products.filter((product) => product.image).map((product) => new Promise((resolve) => {
    const image = new Image(); image.onload = () => resolve(product); image.onerror = () => resolve(null); image.src = product.image;
  }))).then((results) => { available = results.filter(Boolean); renderFavorites(); });
}

// Atualiza o ano do rodapé compartilhado.
document.querySelectorAll("[data-footer-year]").forEach((year) => { year.textContent = String(new Date().getFullYear()); });
