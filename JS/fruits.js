const plants = [
    { name: "Apple Tree", price:100,img:"../assets/fruits/1.jpg"},
    { name: "Banana Plant",price:200,img:"../assets/fruits/2.jpg"},
    { name: "Cherry Tree", price:300,img:"../assets/fruits/3.jpg"},
    { name: "Orange Tree", price:400,img:"../assets/fruits/4.jpg"},
    { name: "Mango Tree", price:500,img:"../assets/fruits/5.jpg"},
    { name: "Pineapple Plant", price:600,img:"../assets/fruits/6.jpg"},
    { name: "Strawberry Plant", price:700,img:"../assets/fruits/7.jpg"},
    { name: "Lemon Tree", price:800,img:"../assets/fruits/8.jpg"},
];

// Ensure cart is always an array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayPlants() {
    const gallery = document.getElementById("plant-gallery");
    gallery.innerHTML = "";

    plants.forEach((plant, index) => {
        const plantCard = document.createElement("div");
        plantCard.classList.add("plant-card");
        plantCard.innerHTML = `
            <img src="${plant.img}" alt="${plant.name}">
            <h3>${plant.name}</h3>
            <p>Price: $<span class="price">${plant.price}</span></p>
            <button onclick="addToCart(${index})" class="add-to-cart">Add to Cart</button>
        `;
        gallery.appendChild(plantCard);
    });
}

function addToCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get latest cart data
    let selectedPlant = plants[index]; // Get the selected plant

    // Check if the item already exists in the cart
    let existingItem = cart.find(item => item.name === selectedPlant.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: selectedPlant.name, price: selectedPlant.price,img : selectedPlant.img, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Store updated cart
    updateCart();
}

function updateCart(iem) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContent = "";
    let totalCost = 0;

    cart.forEach(item => {
        totalCost += item.quantity * item.price;
        cartContent += `<p>${item.name} x${item.quantity} - $${item.quantity * item.price}</p>`;
    });

    document.getElementById("cart-items").innerHTML = cartContent || "Cart is empty";
    document.getElementById("total-price").textContent = `Total: $${totalCost}`;
}

function goToCart() {
    window.location.href = "../categories/cart.html";
}

// Run functions when page loads
displayPlants();
updateCart();
