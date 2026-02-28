document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("login-form");
  const adminPanel = document.getElementById("admin-panel");
  const form = document.getElementById("add-product-form");
  const container = document.getElementById("admin-products");
  const logoutBtn = document.getElementById("logout-btn");

  // Check session
  db.auth.getSession().then(res => {
    if (res.data.session) showAdminPanel();
  });

  // Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await db.auth.signInWithPassword({ email, password });
    if(error) return alert("Login failed: " + error.message);
    showAdminPanel();
  });

  function showAdminPanel() {
    loginForm.style.display = "none";
    adminPanel.style.display = "block";
    loadProducts();
  }

  logoutBtn.addEventListener("click", async () => {
    await db.auth.signOut();
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

  window.removeProduct = async function(id) {
    if(confirm("Delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  }

});
