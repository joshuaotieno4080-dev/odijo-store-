document.addEventListener("DOMContentLoaded", function(){

const content = document.getElementById("content");
const orderCount = document.getElementById("orderCount");

let products = JSON.parse(localStorage.getItem("products")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let cart = [];

function saveData(){
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("orders", JSON.stringify(orders));
    updateOrderCount();
}

function updateOrderCount(){
    orderCount.innerText = orders.length;
}

/* ================= HOME ================= */

window.showHome = function(){
    content.innerHTML = `
        <h2>Welcome to ODIJO Store</h2>
        <p>Snacks & Fashion available at affordable prices.</p>
        <button onclick="showShop()">Go To Shop</button>
    `;
}

/* ================= ADMIN LOGIN ================= */

window.showAdmin = function(){
    const password = prompt("Enter Admin Password:");
    if(password !== "1234"){
        alert("Wrong Password");
        return;
    }

    content.innerHTML = `
        <h2>Admin Panel</h2>

        <h3>Add Product</h3>
        <input type="text" id="pname" placeholder="Product Name"><br><br>
        <input type="number" id="pprice" placeholder="Price"><br><br>
        <input type="file" id="pimage"><br><br>
        <button onclick="addProduct()">Add Product</button>

        <h3>Existing Products</h3>
        <div id="adminProducts"></div>
    `;

    loadAdminProducts();
}

window.addProduct = function(){
    const name = document.getElementById("pname").value;
    const price = document.getElementById("pprice").value;
    const file = document.getElementById("pimage").files[0];

    if(!name || !price || !file){
        alert("All fields required");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(){
        products.push({
            name: name,
            price: price,
            image: reader.result
        });
        saveData();
        alert("Product Added!");
        showAdmin();
    };
    reader.readAsDataURL(file);
}

function loadAdminProducts(){
    let html = "";
    products.forEach((p, index) => {
        html += `
            <div class="card">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>Ksh ${p.price}</p>
                <button onclick="deleteProduct(${index})">Delete</button>
            </div>
        `;
    });
    document.getElementById("adminProducts").innerHTML = html;
}

window.deleteProduct = function(index){
    products.splice(index,1);
    saveData();
    showAdmin();
}

/* ================= SHOP ================= */

window.showShop = function(){
    let html = "<h2>Shop</h2><div class='products'>";
    products.forEach((p, index) => {
        html += `
            <div class="card">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>Ksh ${p.price}</p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            </div>
        `;
    });
    html += "</div>";

    html += `
        <h3>Cart (${cart.length})</h3>
        <div id="cartArea"></div>
        <button onclick="checkout()">Checkout</button>
    `;

    content.innerHTML = html;
    renderCart();
}

window.addToCart = function(index){
    cart.push(products[index]);
    renderCart();
}

function renderCart(){
    let total = 0;
    let html = "";

    cart.forEach((item,i) => {
        total += Number(item.price);
        html += `
            <p>${item.name} - Ksh ${item.price}
            <button onclick="removeFromCart(${i})">X</button></p>
        `;
    });

    html += `<h4>Total: Ksh ${total}</h4>`;

    const cartArea = document.getElementById("cartArea");
    if(cartArea) cartArea.innerHTML = html;
}

window.removeFromCart = function(index){
    cart.splice(index,1);
    renderCart();
}

/* ================= CHECKOUT ================= */

window.checkout = function(){
    if(cart.length === 0){
        alert("Cart is empty");
        return;
    }

    const customer = prompt("Enter your name:");
    const phone = prompt("Enter your phone number:");

    if(!customer || !phone){
        alert("Details required");
        return;
    }

    cart.forEach(item => {
        orders.push({
            product: item.name,
            customer: customer,
            phone: phone
        });
    });

    cart = [];
    saveData();
    alert("Order placed successfully!");
    showShop();
}

/* ================= ORDERS ================= */

window.showOrders = function(){
    let html = "<h2>Orders</h2>";

    orders.forEach(o => {
        html += `
            <div class="card">
                <h3>${o.product}</h3>
                <p>Customer: ${o.customer}</p>
                <p>Phone: ${o.phone}</p>
            </div>
        `;
    });

    content.innerHTML = html;
}

updateOrderCount();
showHome();

});
