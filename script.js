document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("product-grid");
  if(!grid) return;

  const categoryElement = document.getElementById("category-name");
  const category = categoryElement ? categoryElement.textContent : null;

  let products = await fetchProducts();
  if(category) products = products.filter(p => p.category === category);

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
  const adminNumber = "254712345678"; // your WhatsApp number
  const apiKey = "YOUR_API_KEY";      // CallMeBot API key
  const message = `New order received:\nProduct: ${name}\nPrice: Ksh ${price}`;

  const url = `https://api.callmebot.com/whatsapp.php?phone=${adminNumber}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;

  const resp = await fetch(url);
  if(resp.ok) alert("Order received! Admin will be notified.");
  else alert("Failed to notify admin.");
}
