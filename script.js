document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("product-grid");
  const products = await fetchProducts();
  grid.innerHTML = "";

  products.forEach(product => {
    grid.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Ksh ${product.price}</p>
        <button onclick="orderProduct('${product.name}', ${product.price})">Order via WhatsApp</button>
      </div>
    `;
  });
});

async function orderProduct(name, price) {
  await fetch("/functions/v1/send_whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product: name, price })
  });
  alert("Order received! Admin will be notified.");
}
