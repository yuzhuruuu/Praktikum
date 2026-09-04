// PRODUCT EXPLORER 

// State global
let products = [];       
let currentView = [];     
let sortAscending = true; 


const container = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortButton = document.getElementById("sort-button");
const productCountEl = document.getElementById("product-count");

// 1. FETCH DATA (Async/Await + Fetch API)
async function fetchProducts() {
  container.innerHTML = `<p class="loading-text"> Sedang memuat data...</p>`;

  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();

    products = data.products;
    currentView = products;

    populateCategoryOptions(products);
    renderProducts(currentView);
  } catch (error) {
    console.error("Wah, gagal mengambil data nih:", error);
    container.innerHTML = `<p class="loading-text"> Gagal memuat data. Coba periksa koneksi internetmu.</p>`;
  }
}

// 2. RENDER PRODUK (Arrow Function + Object Destructuring)
const renderProducts = (dataToRender) => {
  currentView = dataToRender;

  if (dataToRender.length === 0) {
    container.innerHTML = `<p class="empty-text">Produk tidak ditemukan </p>`;
    updateStats(dataToRender);
    return;
  }

  const htmlContent = dataToRender
    .map(({ title, price, category, thumbnail, description }) => {
      return `
        <div class="card">
          <img src="${thumbnail}" alt="${title}" onerror="this.src='https://via.placeholder.com/220x150?text=No+Image'" />
          <span class="category">${category}</span>
          <h3>${title}</h3>
          <p class="price">Rp ${price.toLocaleString("id-ID")}</p>
          <p class="description">${description ? description.slice(0, 80) + "..." : ""}</p>
        </div>
      `;
    })
    .join("");

  container.innerHTML = htmlContent;
  updateStats(dataToRender);
};

// 3. STATISTIK SEDERHANA (reduce)
const updateStats = (dataToRender) => {
  const totalCount = dataToRender.reduce((total, product) => total + 1, 0);
  productCountEl.textContent = `Total produk ditampilkan: ${totalCount}`;
};

// 4. FILTER KATEGORI (Bonus - dropdown dinamis)
const populateCategoryOptions = (dataProducts) => {
  const categories = [...new Set(dataProducts.map((product) => product.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
};

// 5. FUNGSI GABUNGAN: SEARCH + FILTER KATEGORI
const applyFilters = () => {
  const keyword = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  let filtered = products.filter((product) =>
    product.title.toLowerCase().includes(keyword)
  );

  if (selectedCategory !== "all") {
    filtered = filtered.filter((product) => product.category === selectedCategory);
  }

  renderProducts(filtered);
};

// 6. SORTING HARGA (Bonus)
const toggleSort = () => {
  const sorted = [...currentView].sort((a, b) =>
    sortAscending ? a.price - b.price : b.price - a.price
  );

  sortAscending = !sortAscending;
  sortButton.textContent = sortAscending
    ? "Urutkan Harga: Termurah ➜ Termahal"
    : "Urutkan Harga: Termahal ➜ Termurah";

  renderProducts(sorted);
};

// EVENT LISTENERS
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortButton.addEventListener("click", toggleSort);

// JALANKAN APLIKASI
fetchProducts();