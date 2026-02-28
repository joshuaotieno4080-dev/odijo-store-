// WhatsApp Order
function orderProduct(name, price, category) {
  const phone = "254700238274"; // Kenya format
  const message = `Hello, I want to order:\nProduct: ${name}\nPrice: ${price}\nCategory: ${category}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

// Admin login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const password = document.getElementById("password").value;
      if (password === "1234") {
        document.getElementById("admin-section").style.display = "block";
        loginForm.style.display = "none";
      } else {
        alert("Wrong password!");
      }
    });
  }
});
