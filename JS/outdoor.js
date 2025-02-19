let plants = [
    { name: "Aloevera", price: 100, img: "../assets/Outdoor/aloevera.png", description: "Aloe" },
    { name: "Marigold", price: 100, img: "../assets/Outdoor/marigold.png", description: "Aloe" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(index) {
    let existingItem = cart.find(item => item.name === plants[index].name);
    
    if (existingItem) {
        existingItem.quantity += 1;  // Increase quantity if item exists
    } else {
        cart.push({...plants[index], quantity: 1 });  // Add new item with quantity 1
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added to cart!`);
}


function goToCart() {
    window.location.href = "../categories/cart.html";
}

function goHome(){
    window.location.href = "../main.html";
}
