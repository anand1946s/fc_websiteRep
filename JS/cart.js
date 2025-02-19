document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    document.body.classList.add("loaded");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;
    let total_qty=0;

    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
        document.getElementById("total-price").textContent = `0`;
        let proceed_buy = document.getElementById("proceed-buy");
        proceed_buy.textContent = 'Procced to Buy (0 Items)';
        proceed_buy.style.backgroundColor = "#b0b0b0";
        proceed_buy.style.cursor = "not-allowed";
        proceed_buy.disabled = true;
        return;
    }

    document.getElementById("proceed-buy").disabled = false;

    cart.forEach((item, index) => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="${item.img}" class="cart-item-image">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">₹ ${item.price*item.quantity}</p>
                <div class="quantity-container">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${index})" class="remove-item">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
        total_qty += item.quantity
    });
    document.getElementById("proceed-buy").textContent = `Procced to Buy (${total_qty.toFixed(0)} Items)`;
    document.getElementById("total-price").textContent = ` ${totalPrice.toFixed(2)}`;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);  // Remove item if quantity is less than 1
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

document.getElementById("proceed-buy").addEventListener("click", function () {
    
    window.location.href = "../categories/checkout.html";
});


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

function goBack() {
    document.body.classList.add('fade-out');
    setTimeout(() => { {window.history.back()} }, 400);
}