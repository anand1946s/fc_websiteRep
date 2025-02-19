let plants = [
    { name: "Aloevera", price: 100, img: "../assets/Outdoor/aloevera.png", description: "Aloe" },
    { name: "Marigold", price: 50, img: "../assets/Outdoor/Marigold.png", description: "Marigold" },
    { name: "Hibiscus", price: 120, img: "../assets/Outdoor/Hibiscus.png", description: "Hibiscus" },
    { name: "Bougainvillea", price: 350, img: "../assets/Outdoor/Bougainvillea.png", description: "Bougainvillea" },
    { name: "Sunflower", price: 150, img: "../assets/Outdoor/Sunflower.png", description: "Sunflower" },
    { name: "Clover", price: 80, img: "../assets/Outdoor/Clover.png", description: "Clover" },

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
