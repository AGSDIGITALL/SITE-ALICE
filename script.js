const WHATSAPP_NUMBER = "5531983559685";

const products = [
  {
    id: 1,
    category: "cestas",
    name: "Combo Amor Infinito",
    description: "Buqu\u00ea com 7 rosas eternas e Cesta Doce Paix\u00e3o. O presente perfeito para surpreender quem voc\u00ea ama, unindo a beleza das rosas eternas ao sabor irresist\u00edvel dos chocolates mais amados.",
    price: 230,
    image: "assets/cesta-combo-amor-infinito.jpg",
  },
  {
    id: 2,
    category: "cestas",
    name: "Cesta Doce Paix\u00e3o",
    description: "1 Doritos, 1 Pringles, 1 Pling Show, 1 Ferrero Rocher, 1 Kinder Bueno, 1 Suflair, 1 Bis Xtra, 1 KitKat, 1 Trento, 1 Mentos, 1 Nutella, 1 5Star e 2 Ouro Branco. Uma sele\u00e7\u00e3o especial de sabores para surpreender quem voc\u00ea ama.",
    price: 185,
    image: "assets/cesta-doce-paixao.jpg",
  },
  {
    id: 3,
    category: "cestas",
    name: "Cesta Romance Gourmet",
    description: "1 rosa eterna em cetim, 1 Pringles, 1 Pling Show, 1 Kinder Bueno, 1 KitKat, 1 Ouro Branco e 1 Ferrero Rocher. A combina\u00e7\u00e3o perfeita entre a delicadeza de uma rosa eterna e o sabor dos chocolates mais amados.",
    price: 95,
    image: "assets/cesta-romance-gourmet.jpg",
  },
  {
    id: 4,
    category: "cestas",
    name: "Doce Encanto",
    description: "2 rosas eternas em cetim e 3 bombons Ouro Branco. A uni\u00e3o perfeita entre a delicadeza das rosas e a do\u00e7ura do chocolate para surpreender quem faz seu cora\u00e7\u00e3o sorrir.",
    price: 35,
    image: "assets/doce-encanto.jpg",
  },
  {
    id: 5,
    category: "buques",
    name: "Buqu\u00ea Amor Infinito",
    description: "Buqu\u00ea com 20 rosas eternas. Porque algumas hist\u00f3rias de amor merecem durar para sempre. Uma pe\u00e7a sofisticada, criada artesanalmente para surpreender quem faz seu cora\u00e7\u00e3o bater mais forte.",
    price: 155,
    image: "assets/buque-amor-infinito.jpg",
  },
  {
    id: 6,
    category: "buques",
    name: "Buqu\u00ea Encanto Eterno",
    description: "Buqu\u00ea com 7 rosas eternas. Um presente que transforma sentimentos em lembran\u00e7as inesquec\u00edveis. Cada rosa \u00e9 cuidadosamente confeccionada para simbolizar um amor que permanece belo atrav\u00e9s do tempo.",
    price: 55,
    image: "assets/buque-encanto-eterno.jpg",
  },
  {
    id: 7,
    category: "buques",
    name: "Rosa Ess\u00eancia do Amor",
    description: "Rosa \u00fanica. H\u00e1 sentimentos que podem ser expressos na delicadeza de uma \u00fanica rosa, criada para permanecer t\u00e3o bela quanto a lembran\u00e7a de quem a recebe.",
    price: 15,
    image: "assets/rosa-essencia-do-amor.jpg",
  },
  {
    id: 8,
    category: "canecas",
    name: "Mini Elegance Stanley",
    description: "Copo Stanley com uma combina\u00e7\u00e3o especial de 1 barra de Talento e 1 Ferrero Rocher. Finalizado com detalhes florais, bal\u00e3o personalizado e uma embalagem encantadora. Dispon\u00edvel nas cores branco e rosa.",
    price: 109.9,
    image: "assets/mini-elegance-stanley.jpg",
  },
  {
    id: 9,
    category: "canecas",
    name: "Elegance Stanley",
    description: "Copo Stanley de 1,2 L acompanhado de chocolates selecionados: 1 barra de Alpino e 2 trios de Ferrero Rocher. Finalizado com detalhes florais, bal\u00e3o personalizado e uma embalagem encantadora. Dispon\u00edvel nas cores branco e preto.",
    price: 169.9,
    image: "assets/elegance-stanley.jpg",
  },
  {
    id: 10,
    category: "canecas",
    name: "Caneca Doce Carinho",
    description: "Caneca de lou\u00e7a acompanhada de uma combina\u00e7\u00e3o irresist\u00edvel: 1 barra de Talento, 1 Fini Beijos e 2 Sonho de Valsa. Finalizada com detalhes florais, bal\u00e3o personalizado e uma embalagem encantadora. Consulte as cores dispon\u00edveis.",
    price: 89.9,
    image: "assets/caneca-doce-carinho.jpg",
  },
];

const cart = [];
const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const productGrids = document.querySelectorAll("[data-products-category]");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const addMoreButton = document.getElementById("addMoreButton");
const checkoutButton = document.getElementById("checkoutButton");
const contactWhatsApp = document.getElementById("contactWhatsApp");

function formatPrice(value) {
  return formatter.format(value);
}

function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

function createProductCard(product) {
  return `
        <article class="product-card">
          <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-body">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
              <span class="price">${formatPrice(product.price)}</span>
              <button class="button" type="button" data-product-id="${product.id}">
                Comprar
              </button>
            </div>
          </div>
        </article>
      `;
}

function renderProducts() {
  productGrids.forEach((grid) => {
    const categoryProducts = products.filter(
      (product) => product.category === grid.dataset.productsCategory
    );

    grid.innerHTML = categoryProducts.map(createProductCard).join("");
  });
}

function calculateTotal() {
  return cart.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + product.price * item.quantity;
  }, 0);
}

function updateCartCount() {
  const quantity = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = quantity;
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Seu carrinho est\u00e1 vazio.</p>';
    cartTotal.textContent = formatPrice(0);
    checkoutButton.disabled = true;
    updateCartCount();
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      const product = getProductById(item.productId);
      const subtotal = product.price * item.quantity;

      return `
        <article class="cart-item">
          <div class="cart-product">
            <strong>${product.name}</strong>
            <span>${product.description}</span>
          </div>
          <div class="cart-detail">
            <span>Quantidade</span>
            <strong>${item.quantity}x</strong>
          </div>
          <div class="cart-detail">
            <span>Pre&ccedil;o unit&aacute;rio</span>
            <strong>${formatPrice(product.price)}</strong>
          </div>
          <div class="cart-detail">
            <span>Subtotal</span>
            <strong>${formatPrice(subtotal)}</strong>
          </div>
        </article>
      `;
    })
    .join("");

  cartTotal.textContent = formatPrice(calculateTotal());
  checkoutButton.disabled = false;
  updateCartCount();
}

function addToCart(productId) {
  const item = cart.find((cartItem) => cartItem.productId === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  renderCart();
  document.getElementById("carrinho").scrollIntoView({ behavior: "smooth" });
}

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function createCheckoutMessage() {
  const lines = cart.map((item) => {
    const product = getProductById(item.productId);
    const subtotal = product.price * item.quantity;

    return `${item.quantity}x ${product.name} - ${formatPrice(product.price)} cada | Subtotal: ${formatPrice(subtotal)}`;
  });

  return [
    "Ol\u00e1! Tenho interesse nos seguintes produtos:",
    ...lines,
    `Total: ${formatPrice(calculateTotal())}`,
  ].join("\n");
}

productGrids.forEach((grid) => {
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-id]");

    if (!button) {
      return;
    }

    addToCart(Number(button.dataset.productId));
  });
});

addMoreButton.addEventListener("click", () => {
  document.getElementById("cestas").scrollIntoView({ behavior: "smooth" });
});

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    return;
  }

  window.open(createWhatsAppUrl(createCheckoutMessage()), "_blank", "noopener");
});

contactWhatsApp.href = createWhatsAppUrl(
  "Ol\u00e1! Quero montar uma surpresa especial para o Dia dos Namorados."
);

renderProducts();
renderCart();
