const content = document.getElementById("content");

function showHome(){
    content.innerHTML = `
        <h2>Welcome to ODIJO Divine Enterprise</h2>
        <p>
        We provide affordable snacks at our Bite Point and
        stylish fashion at our Nguo section.
        </p>
        <p>
        Click on the menu to explore products and order now.
        </p>
    `;
}

function showCategory(category){

    if(category === "bite"){
        content.innerHTML = `
            <h2>Bite Point 🍟</h2>
            <div class="products">

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1585238342024-78d387f4a707">
                    <h3>Chips</h3>
                    <p>Ksh 50</p>
                    <button onclick="addToCart('Chips')">Order to Cart</button>
                </div>

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1604909053191-3adbe9b7c5a2">
                    <h3>Bhajia</h3>
                    <p>Ksh 50</p>
                    <button onclick="addToCart('Bhajia')">Order to Cart</button>
                </div>

            </div>
        `;
    }

    if(category === "nguo"){
        content.innerHTML = `
            <h2>Nguo 👕</h2>
            <div class="products">

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab">
                    <h3>Men Shirt</h3>
                    <p>Ksh 230</p>
                    <button onclick="addToCart('Men Shirt')">Order to Cart</button>
                </div>

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1520975922203-b41a10a6e9ef">
                    <h3>Ladies Top</h3>
                    <p>Ksh 150</p>
                    <button onclick="addToCart('Ladies Top')">Order to Cart</button>
                </div>

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b">
                    <h3>Jeans</h3>
                    <p>Ksh 1100</p>
                    <button onclick="addToCart('Jeans')">Order to Cart</button>
                </div>

                <div class="card">
                    <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c">
                    <h3>Dresses</h3>
                    <p>Ksh 450</p>
                    <button onclick="addToCart('Dress')">Order to Cart</button>
                </div>

            </div>
        `;
    }
}

function addToCart(product){
    alert(product + " added to cart!");
}

showHome();
