const content = document.getElementById("content");

let products = JSON.parse(localStorage.getItem("products")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveData(){
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("orders", JSON.stringify(orders));
    updateOrderCount();
}

function updateOrderCount(){
    document.getElementById("orderCount").innerText = orders.length;
}

function showHome(){
    content.innerHTML = `
        <h2>Welcome to ODIJO Store</h2>
        <p>Add products in Admin section.</p>
        <p>Customers can order from Shop.</p>
    `;
}

function showAdmin(){
    content.innerHTML = `
        <h2>Add Product</h2>
        <input type="text" id="pname" placeholder="Product Name"><br><br>
        <input type="number" id="pprice" placeholder="Price"><br><br>
        <input type="file" id="pimage"><br><br>
        <button onclick="addProduct()">Add Product</button>
    `;
}

function addProduct(){
    const name = document.getElementById("pname").value;
    const price = document.getElementById("pprice").value;
    const file = document.getElementById("pimage").files[0];

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

function showShop(){
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

function orderProduct(index){
    const customer = prompt("Enter your name:");
    const phone = prompt("Enter your phone number:");

    orders.push({
        product: products[index].name,
        customer: customer,
        phone: phone
    });

    saveData();
    alert("Order Placed Successfully!");
}

function showOrders(){
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
