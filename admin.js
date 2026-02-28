// admin.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const adminPanel = document.getElementById("admin-panel");
  const form = document.getElementById("add-product-form");
  const container = document.getElementById("admin-products");

  // --- Admin credentials ---
  const ADMIN_EMAIL = "odijoadmin@gmail.com"; // change if you want
  const ADMIN_PASSWORD = "admin1234";         // change if you want

  // --- Login ---
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

  // --- Logout ---
  document.getElementById("logout-btn").addEventListener("click", () => {
    location.reload();
  });

  // --- Load all products ---
  async function loadProducts() {
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
  }

  // --- Delete product ---
  window.removeProduct = async function(id){
    if(confirm("Delete this product?")){
      await deleteProduct(id);
      loadProducts();
    }
  }

  // --- Add product with image upload ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const category = document.getElementById("category").value;
    const file = document.getElementById("image-file").files[0];

    if(!file) return alert("Please select an image.");

    try {
      // Upload image to Supabase Storage (bucket: images)
      const { data: uploadData, error: uploadError } = await db.storage
        .from("images")
        .upload(`images/${Date.now()}_${file.name}`, file);

      if(uploadError) throw uploadError;

      // Get public URL
      const { publicUrl, error: urlError } = db.storage
        .from("images")
        .getPublicUrl(uploadData.path);

      if(urlError) throw urlError;

      // Add product to database
      await addProduct({
        name,
        price,
        category,
        image: publicUrl
      });

      form.reset();
      loadProducts();
    } catch(err) {
      alert("Error: " + err.message);
      console.error(err);
    }
  });
});
