document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const adminPanel = document.getElementById("admin-panel");
  const form = document.getElementById("add-product-form");
  const container = document.getElementById("admin-products");

  const ADMIN_EMAIL = "odijoadmin@gmail.com";
  const ADMIN_PASSWORD = "admin1234";

  // Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
      loginForm.style.display = "none";
      adminPanel.style.display = "block";
      loadProducts();
    } else {
      alert("Wrong credentials!");
    }
  });

  // Logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    location.reload();
  });

  // Load products
  async function loadProducts() {
    try {
      const products = await fetchProducts();
      container.innerHTML = "";
      products.forEach(product => {
        container.innerHTML += `
          <div class="admin-card">
            <img src="${product.image}" alt="${product.name}">
            <div>
              <strong>${product.name}</strong>
              <p>Ksh ${product.price}</p>
              <small>${product.category}</small>
            </div>
            <button onclick="removeProduct(${product.id})">Delete</button>
          </div>
        `;
      });
    } catch(err) {
      console.error("Load products error:", err);
    }
  }

  // Delete product
  window.removeProduct = async function(id){
    if(!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch(err) {
      console.error("Delete failed:", err);
    }
  }

  // Add product
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const category = document.getElementById("category").value;
    const file = document.getElementById("image-file").files[0];

    if(!name || !price || !category || !file) return alert("Fill all fields and select an image.");

    try {
      // Upload image
      const filePath = `images/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await db.storage
        .from("images")
        .upload(filePath, file, { upsert: true });
      if(uploadError) throw uploadError;

      // Get public URL
      const { publicUrl, error: urlError } = db.storage
        .from("images")
        .getPublicUrl(uploadData.path);
      if(urlError || !publicUrl) throw urlError || new Error("Cannot get public URL");

      // Insert into products
      const { error: insertError } = await db
        .from("products")
        .insert([{ name, price, category, image: publicUrl }]);
      if(insertError) throw insertError;

      alert("Product added successfully!");
      form.reset();
      loadProducts();
    } catch(err) {
      console.error("Add product failed:", err);
      alert("Failed to add product. Check console.");
    }
  });
});
