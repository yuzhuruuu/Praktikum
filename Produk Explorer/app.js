// LEVEL 1 - DASAR JAVASCRIPT

const productName = "Laptop Asus ROG";
let price = 15000000;
let isAvailable = true;

let discount = 500000;
let finalPrice = price - discount;

console.log("Nama Produk:", productName);
console.log("Harga:", price);
console.log("Diskon:", discount);
console.log("Harga Final:", finalPrice);

if (finalPrice > 10000000) {
    console.log("Kategori: Barang Mewah");
} else {
    console.log("Kategori: Barang Standar");
}

// LEVEL 2 - ARRAY & OBJECT

let products = [];

async function fetchProducts() {
  try {
    console.log("Memuat data produk...");
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    products = data.products;
    console.log("Data produk berhasil dimuat:", products);
    renderProducts(products);
  } catch (error) {
    console.log("Gagal memuat data produk:", error);
  }
};

fetchProducts();

// Filter
const cheapProducts = products.filter(
    product => product.price < 10000000
);

console.log(cheapProducts);


// Map
const priceList = products.map(
    product => "Rp " + product.price
);

console.log(priceList);


// LEVEL 3 - DOM MANIPULATION

const container = document.getElementById("product-list");

// LEVEL 4 - SEARCH

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", (event) => {
    const keyword = event.target.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(keyword)
    );

    renderProducts(filteredProducts);
});

// LEVEL 5 - ARROW FUNCTION & DESTRUCTURING

const renderProducts = (dataToRender) => {
    const htmlContent = dataToRender
        .map(({ title, price, category }) => {
            return `
                <div class="card">
                    <h3>${title}</h3>
                    <span class="category">${category}</span>
                    <p>Rp ${price}</p>
                </div>
            `;
        })
        .join("");

    container.innerHTML = htmlContent;
};

renderProducts(products);