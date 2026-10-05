// Shared site code
const $ = s => document.querySelector(s);
const PH = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#2a2630"/><circle cx="100" cy="100" r="40" fill="#3f9f4a"/></svg>');
const money = n => SITE.currency + Number(n).toFixed(2);
const find = id => PRODUCTS.find(p => p.id === id);
const getCart = () => JSON.parse(localStorage.getItem("cart") || "{}");
const setCart = c => { localStorage.setItem("cart", JSON.stringify(c)); badge(); };
const badge = () => { const b = $("#cart-count"); if (b) b.textContent = Object.values(getCart()).reduce((a, b) => a + b, 0); };
const img = p => `<img src="images/${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src=PH">`;
const wa = text => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

function add(id, btn) {
  const c = getCart(); c[id] = (c[id] || 0) + 1; setCart(c);
  btn.textContent = "Added"; setTimeout(() => btn.textContent = "Add to cart", 1200);
}
function change(id, d) {
  const c = getCart(); c[id] = (c[id] || 0) + d; if (c[id] <= 0) delete c[id];
  setCart(c); renderCart();
}
const card = p => `<div class="card"><a href="product.html?id=${p.id}">${img(p)}<h3>${p.name}</h3></a>
  <small>${p.short}</small><div class="row">${money(p.price)}<button onclick="add('${p.id}',this)">Add to cart</button></div></div>`;

const merchCard = m => `<div class="card merch-card">${img(m)}<h3>${m.name}</h3>
  <small>${m.short}</small><p>${m.description}</p>
  <a class="btn" href="${wa("Hi! I'm interested in the " + m.name + ". Please send me the available sizes, colours and price.")}">Enquire on WhatsApp</a></div>`;

function renderCart() {
  const c = getCart(), ids = Object.keys(c).filter(find);
  if (!ids.length) { $("#cart").innerHTML = '<p>Your cart is empty.</p><a class="btn" href="index.html#merchandise">View merchandise</a>'; return; }
  let total = 0, lines = [];
  const rows = ids.map(id => { const p = find(id), q = c[id]; total += p.price * q; lines.push(`${q} x ${p.name} - ${money(p.price * q)}`);
    return `<div class="line"><span>${p.name}</span><span><button onclick="change('${id}',-1)">-</button> ${q} <button onclick="change('${id}',1)">+</button></span><b>${money(p.price * q)}</b></div>`; }).join("");
  $("#cart").innerHTML = rows + `<p class="total">Total: ${money(total)}</p>
    <a class="btn" href="${wa("Hi! I would like to order:\n" + lines.join("\n") + "\nTotal: " + money(total))}">Send order on WhatsApp</a>`;
}

// Header, footer, WhatsApp button
$("#site-header").innerHTML = `<div class="wrap bar"><a class="brand" href="index.html">${SITE.name}</a>
  <nav><a href="index.html">Home</a><a href="shop.html">Shop</a><a href="index.html#merchandise">Merch</a><a href="learn.html">Learn</a><a href="index.html#about">About</a><a href="index.html#contact">Contact</a><a href="cart.html">Cart (<span id="cart-count">0</span>)</a></nav></div>`;
$("#site-footer").innerHTML = `<div class="wrap bar"><span>© ${new Date().getFullYear()} ${SITE.name}. ${SITE.tagline}</span>
  <span><a href="${SITE.instagram}">Instagram</a> · <a href="${SITE.facebook}">Facebook</a></span></div>`;
document.body.insertAdjacentHTML("beforeend", `<a class="wa" href="${wa("Hi! I have a question.")}" aria-label="Chat on WhatsApp">WhatsApp</a>`);
badge();

const page = document.body.dataset.page;
const articleHTML = a => `<article><h3>${a.title}</h3>${a.body.map(t => `<p>${t}</p>`).join("")}</article>`;
const emptyProducts = `<div class="empty-state"><h3>Coffee products coming soon</h3><p>We're adding the real Brad Bar Coffee products as the product photos and details are finalised.</p><a class="btn" href="${wa("Hi! I would like to know what coffee products are currently available.")}">Ask on WhatsApp</a></div>`;

if (page === "home") {
  $("#featured").innerHTML = PRODUCTS.length ? PRODUCTS.slice(0, 4).map(card).join("") : emptyProducts;
  $("#merch-grid").innerHTML = MERCH.map(merchCard).join("");
  $("#learn-teaser").innerHTML = ARTICLES.slice(0, 3).map(a => `<article><h3>${a.title}</h3><p>${a.summary}</p><a href="learn.html">Read more</a></article>`).join("");
  $("#contact-links").innerHTML = `<a class="btn" href="${wa("Hi!")}">WhatsApp us</a><a class="btn" href="${SITE.instagram}">Instagram</a><a class="btn" href="${SITE.facebook}">Facebook</a>`;
}
if (page === "shop") $("#shop-grid").innerHTML = PRODUCTS.length ? PRODUCTS.map(card).join("") : emptyProducts;
if (page === "learn") $("#articles").innerHTML = ARTICLES.map(articleHTML).join("");
if (page === "cart") renderCart();
if (page === "product") {
  const p = find(new URLSearchParams(location.search).get("id")) || PRODUCTS[0];
  if (!p) {
    $("#product").innerHTML = emptyProducts;
  } else {
    document.title = p.name + " | " + SITE.name;
    $("#product").innerHTML = `<div class="pdp">${img(p)}<div><h2>${p.name}</h2><p class="price">${money(p.price)}</p><p>${p.description}</p>
      <button class="btn" onclick="add('${p.id}',this)">Add to cart</button> <a class="btn ghost dk" href="cart.html">View cart</a></div></div>`;
  }
}
