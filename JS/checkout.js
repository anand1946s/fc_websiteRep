document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orderItems = document.getElementById("order-items");
    let totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    if (cart.length === 0) {
        orderItems.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.textContent = "0.00";
        return;
    }

    cart.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("order-item");
        div.innerHTML = `<p>${item.name} - ₹${item.price} x ${item.quantity}</p>`;
        totalPrice += item.price * item.quantity;
        orderItems.appendChild(div);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
});

function confirmOrder() {
    let address = document.getElementById("address").value.trim();
    let paymentMethod = document.querySelector('input[name="payment"]:checked');
    console.log(paymentMethod)
    if (!address) {
        alert("Please enter your delivery address.");
        return;
    }

    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }
    
    if(paymentMethod.value="upi"){
        price = document.getElementById("total-price").textContent;
        alert(`GPay ₹ ${price} to 9496992173\nOrder confirmed! Thank you for your purchase.`);
    }
        
    localStorage.removeItem("cart");

    goBack();
}

function goBack(){
    setTimeout(() => {
        window.location.href = "../main.html";
    }, 100);
}
