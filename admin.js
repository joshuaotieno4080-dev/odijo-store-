document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const adminPanel = document.getElementById("admin-panel");
  const form = document.getElementById("add-product-form");
  const container = document.getElementById("admin-products");

  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "him1234";

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
      loginForm.style.display = "none";
      adminPanel.style.display = "block";
      loadProducts();
    } else alert("Wrong credentials!");
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    location.reload();
  });

  async function loadProducts() {
    const products = await fetchProducts();
    container.innerHTML = "";
    products.forEach(product => {
      container.innerHTML += `
        <div class="admin-card">
          <img src="${product.image}">
          <div>
            <strong>${product.name}</strong>
            <p>Ksh ${product.price}</p>
            <small>${product.category}</small>
          </div>
          <button onclick="removeProduct(${product.id})">Delete</button>
        </div>
      `;
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const product = {
      name: document.getElementById("name").value,
      price: document.getElementById("price").value,
      category: document.getElementById("category").value,
      image: document.getElementById("image").value
    };
    await addProduct(product);
    form.reset();
    loadProducts();
  });

  window.removeProduct = async function(id){
    if(confirm("Delete this product?")){
      await deleteProduct(id);
      loadProducts();
    }
  };
});
