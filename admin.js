const ADMIN_PASSWORD = "12345"; // change this

const loginForm = document.getElementById("login-form");
const loginContainer = document.getElementById("login-container");
const adminSection = document.getElementById("admin-section");
const addProductForm = document.getElementById("add-product-form");
const productContainer = document.getElementById("product-container");

let products = JSON.parse(localStorage.getItem("products")) || [];

/* LOGIN */
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const password = document.getElementById("password").value;

  if (password === ADMIN_PASSWORD) {
    loginContainer.style.display = "none";
    adminSection.style.display = "block";
    loadProducts();
  } else {
    alert("Wrong password!");
  }
});

/* LOGOUT */
function logout() {
  adminSection.style.display = "none";
  loginContainer.style.display = "block";
}

/* ADD PRODUCT */
addProductForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const category = document.getElementById("product-category").value;
  const image = document.getElementById("product-image").value;

  products.push({ name, price, category, image });
  localStorage.setItem("products", JSON.stringify(products));

  addProductForm.reset();
  loadProducts();
});

/* LOAD PRODUCTS */
function loadProducts() {
  productContainer.innerHTML = "";
  products.forEach((product, index) => {
    productContainer.innerHTML += `
      <div class="product-card">
        <div>
          <img src="${product.image}" />
          <strong>${product.name}</strong>
          <p>Ksh ${product.price} | ${product.category}</p>
        </div>
        <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

/* DELETE */
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}
