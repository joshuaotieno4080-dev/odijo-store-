// admin.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const adminPanel = document.getElementById("admin-panel");
  const form = document.getElementById("add-product-form");
  const container = document.getElementById("admin-products");

  // --- Admin credentials ---
  const ADMIN_EMAIL = "odijoadmin@gmail.com"; // change if needed
  const ADMIN_PASSWORD = "admin1234";         // change if needed

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
      console.error("Error loading products:", err);
      alert("Failed to load products. Check console.");
    }
  }

  // --- Delete product ---
  window.removeProduct = async function(id){
    if(!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch(err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product. Check console.");
    }
  }

  // --- Add product with image upload ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const category = document.getElementById("category").value;
    const fileInput = document.getElementById("image-file");
    const file = fileInput.files[0];

    if(!name || !price || !category || !file){
      return alert("Please fill all fields and select an image.");
    }

    try {
      // Upload image to Supabase Storage (bucket: images)
      const filePath = `images/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await db.storage
        .from("images")
        .upload(filePath, file, { upsert: true });

      if(uploadError) throw uploadError;

      // Get public URL
      const { publicUrl, error: urlError } = db.storage
        .from("images")
        .getPublicUrl(uploadData.path);

      if(urlError) throw urlError;
      if(!publicUrl) throw new Error("Could not get public URL");

      // Debug log
      console.log("Adding product:", { name, price, category, image: publicUrl });

      // Add product to database
      const { error: insertError } = await db
        .from("products")
        .insert([{ name, price, category, image: publicUrl }]);

      if(insertError) throw insertError;

      alert("Product added successfully!");
      form.reset();
      loadProducts();
    } catch(err) {
      console.error("Add product failed:", err);
      alert("Failed to add product. Check console for details.");
    }
  });

});
