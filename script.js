document.addEventListener("DOMContentLoaded", function(){

const content = document.getElementById("content");
const orderCount = document.getElementById("orderCount");

let products = JSON.parse(localStorage.getItem("products")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveData(){
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("orders", JSON.stringify(orders));
    updateOrderCount();
}

function updateOrderCount(){
    orderCount.innerText = orders.length;
}

window.showHome = function(){
    content.innerHTML = `
        <h2>Welcome to ODIJO Store</h2>
        <p>Add products in Admin section.</p>
        <p>Customers can order from Shop.</p>
    `;
}

window.showAdmin = function(){
    content.innerHTML = `
        <h2>Add Product</h2>
        <input type="text" id="pname" placeholder="Product Name"><br><br>
        <input type="number" id="pprice" placeholder="Price"><br><br>
        <input type="file" id="pimage"><br><br>
        <button onclick="addProduct()">Add Product</button>
    `;
}

window.addProduct = function(){
    const name = document.getElementById("pname").value;
    const price = document.getElementById("pprice").value;
    const file = document.getElementById("pimage").files[0];

    if(!file){
        alert("Please select an image");
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
    };
    reader.readAsDataURL(file);
}

window.showShop = function(){
    let html = "<h2>Shop</h2><div class='products'>";
    products.forEach((p, index) => {
        html += `
            <div class="card">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>Ksh ${p.price}</p>
                <button onclick="orderProduct(${index})">Order</button>
            </div>
        `;
    });
    html += "</div>";
    content.innerHTML = html;
}

window.orderProduct = function(index){
    const customer = prompt("Enter your name:");
    const phone = prompt("Enter your phone number:");

    if(!customer || !phone){
        alert("Name and phone required");
        return;
    }

    orders.push({
        product: products[index].name,
        customer: customer,
        phone: phone
    });

    saveData();
    alert("Order Placed Successfully!");
}

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
