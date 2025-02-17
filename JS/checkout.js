document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("checkout-container");
    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = `<p>${item.name} - ₹${item.price} x ${item.quantity}</p>`;
        totalPrice += item.price * item.quantity;
        container.appendChild(div);
    });
    document.getElementById("total-price").textContent = ` ${totalPrice.toFixed(2)}`;

});

function confirmOrder() {
    alert("Order confirmed! Thank you for your purchase.");
    localStorage.removeItem("cart");
    window.location.href = "../main.html";
}
