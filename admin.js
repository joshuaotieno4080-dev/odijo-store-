document.addEventListener("DOMContentLoaded", () => {

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "1234";

  const loginForm = document.getElementById("login-form");
  const adminPanel = document.getElementById("admin-panel");
  const form = document.getElementById("add-product-form");
  const container = document.getElementById("admin-products");

  // LOGIN
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      loginForm.style.display = "none";
      adminPanel.style.display = "block";
      loadProducts();
    } else {
      alert("Wrong login details");
    }
  });

  // LOAD PRODUCTS
  async function loadProducts() {
    const products = await fetchProducts();
    container.innerHTML = "";

    products.forEach(p => {
      container.innerHTML += `
        <div>
          <img src="${p.image}" width="80"/>
          <p>${p.name}</p>
          <p>Ksh ${p.price}</p>
          <p>${p.category}</p>
          <button onclick="removeProduct(${p.id})">Delete</button>
          <hr/>
        </div>
      `;
    });
  }

  window.removeProduct = async function(id) {
    await deleteProduct(id);
    loadProducts();
  }

  // ADD PRODUCT
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const file = document.getElementById("image-file").files[0];

    if (!file) return alert("Select image");

    const filePath = `${Date.now()}_${file.name}`;

    const { data, error } = await db.storage
      .from("images")
      .upload(filePath, file);

    if (error) return alert(error.message);

    const { data: urlData } = db.storage
      .from("images")
      .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    const { error: insertError } = await db
      .from("products")
      .insert([{ name, price, category, image: imageUrl }]);

    if (insertError) return alert(insertError.message);

    alert("Product added successfully");
    form.reset();
    loadProducts();
  });

});
