// List of fruit plants
const plants = [
    { name: "Apple Tree", image: "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: 10},
    { name: "Banana Plant", image: "https://plus.unsplash.com/premium_photo-1663047777831-4b65f1489ab0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFuYW5hJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D", price: 11 },
    { name: "Cherry Tree", image: "https://plus.unsplash.com/premium_photo-1661843593682-facc94cf9f33?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: 12},
    { name: "Orange Tree", image: "https://plus.unsplash.com/premium_photo-1664114727339-a710cdbc5455?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price:20},
    { name: "Mango Tree", image: "https://images.unsplash.com/photo-1608568881036-ebfcc7eb158a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: 14},
    { name: "Pineapple Plant", image: "https://plus.unsplash.com/premium_photo-1674751988294-a1afa23ec917?q=80&w=1881&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price : 12},
    { name: "Strawberry Plant", image: "https://plus.unsplash.com/premium_photo-1677781688642-f571db368c0f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: 17},
    { name: "Lemon Tree", image: "https://images.unsplash.com/photo-1432457990754-c8b5f21448de?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price : 12}
];

const finalCart = {};

function displayPlants(filteredPlants = plants) {
    const gallery = document.getElementById("plant-gallery");
    gallery.innerHTML = "";

    filteredPlants.forEach((plant) => {
        const plantCard = document.createElement("div");
        plantCard.classList.add("plant-card");
        plantCard.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}">
            <h3>${plant.name}</h3>
            <p>Price: $<span class="price">${plant.price}</span></p>
            <button class="add-to-cart" data-name="${plant.name}" data-price="${plant.price}">Add to Cart</button>
            
        `;
        gallery.appendChild(plantCard);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const plantName = this.getAttribute("data-name");
            const plantPrice = parseInt(this.getAttribute("data-price"));

            if (!cart[plantName]) {
                cart[plantName] = { quantity: 0, price: plantPrice };
            }
            cart[plantName].quantity++;
            updateCart();
        });
    });

    document.querySelectorAll(".add-to-list").forEach(button => {
        button.addEventListener("click", function () {
            const plantName = this.getAttribute("data-name");

            if (cart[plantName]) {
                if (!finalCart[plantName]) {
                    finalCart[plantName] = { quantity: 0, price: cart[plantName].price };
                }
                finalCart[plantName].quantity += cart[plantName].quantity;
                delete cart[plantName]; 
                updateCart();
                updateFinalCart();
            }
        });
    });
}


function updateCart() {
    let totalCost = 0;
    let cartContent = "";

    for (const [name, item] of Object.entries(cart)) {
        totalCost += item.quantity * item.price;
        cartContent += `<p>${name} x${item.quantity} - $${item.quantity * item.price}</p>`;
    }

    document.getElementById("cart-items").innerHTML = cartContent || "Cart is empty";
    document.getElementById("total-price").textContent = `Total: $${totalCost}`;
}


function updateFinalCart() {
    let finalCartContent = "";

    for (const [name, item] of Object.entries(finalCart)) {
        finalCartContent += `<p>${name} x${item.quantity} - $${item.quantity * item.price}</p>`;
    }

    document.getElementById("final-cart-items").innerHTML = finalCartContent || "Final cart is empty";
}


displayPlants();


function moveToFinalCart() {
    for (const [name, item] of Object.entries(cart)) {
        if (!finalCart[name]) {
            finalCart[name] = { quantity: 0, price: item.price };
        }
        finalCart[name].quantity += item.quantity;
    }
    
 
    Object.keys(cart).forEach(key => delete cart[key]);
    
    updateCart();
    updateFinalCart();
}
function goToCart() {
window.location.href = "../categories/cart.html";
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function addToCart(index) {
    let existingItem = cart.find(item => item.name === plants[index].name);
    
    if (existingItem) {
        existingItem.quantity += 1; 
        alert(`${existingItem.name} added to cart! \nQuantity : ${existingItem.quantity}\nQuantity can be changed in the cart menu`); 
    } else {
        let newItem = { ...plants[index], quantity: 1 }
        cart.push(newItem);
        alert(`${newItem.name} added to cart! \nQuantity : ${newItem.quantity}\nQuantity can be changed in the cart menu`);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
}
document.getElementById("add-to-list-button").addEventListener("click", moveToFinalCart);

/*const finalCart = {};
let cart = JSON.parse(localStorage.getItem("cart")) || {}; // Change cart to an object

function displayPlants(filteredPlants = plants) {
    const gallery = document.getElementById("plant-gallery");
    gallery.innerHTML = "";

    filteredPlants.forEach((plant) => {
        const plantCard = document.createElement("div");
        plantCard.classList.add("plant-card");
        plantCard.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}">
            <h3>${plant.name}</h3>
            <p>Price: $<span class="price">${plant.price}</span></p>
            <button class="add-to-cart" data-name="${plant.name}" data-price="${plant.price}">Add to Cart</button>
        `;
        gallery.appendChild(plantCard);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const plantName = this.getAttribute("data-name");
            const plantPrice = parseInt(this.getAttribute("data-price"));

            if (!cart[plantName]) {
                cart[plantName] = { quantity: 0, price: plantPrice };
            }
            cart[plantName].quantity++;

            localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
            updateCart();
        });
    });
}

function updateCart() {
    let totalCost = 0;
    let cartContent = "";

    for (const [name, item] of Object.entries(cart)) {
        if (item.quantity && item.price) { // Ensure values are defined
            totalCost += item.quantity * item.price;
            cartContent += `<p>${name} x${item.quantity} - $${item.quantity * item.price}</p>`;
        }
    }

    document.getElementById("cart-items").innerHTML = cartContent || "Cart is empty";
    document.getElementById("total-price").textContent = `Total: $${totalCost}`;
}

function moveToFinalCart() {
    for (const [name, item] of Object.entries(cart)) {
        if (!finalCart[name]) {
            finalCart[name] = { quantity: 0, price: item.price };
        }
        finalCart[name].quantity += item.quantity;
    }

    Object.keys(cart).forEach(key => delete cart[key]); // Clear cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cleared cart
    updateCart();
    updateFinalCart();
}

document.getElementById("add-to-list-button").addEventListener("click", moveToFinalCart);

// Initialize cart display on page load
updateCart();
displayPlants();
*/












const plants = [
    { name: "Apple Tree", img: "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: 10},
    { name: "Banana Plant", img: "https://plus.unsplash.com/premium_photo-1663047777831-4b65f1489ab0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFuYW5hJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D", price: 11 },
    { name: "Cherry Tree", img: "https://plus.unsplash.com/premium_photo-1661843593682-facc94cf9f33?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: 12},
    { name: "Orange Tree", img: "https://plus.unsplash.com/premium_photo-1664114727339-a710cdbc5455?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price:20},
    { name: "Mango Tree", img: "https://images.unsplash.com/photo-1608568881036-ebfcc7eb158a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: 14},
    { name: "Pineapple Plant", img: "https://plus.unsplash.com/premium_photo-1674751988294-a1afa23ec917?q=80&w=1881&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price : 12},
    { name: "Strawberry Plant", img: "https://plus.unsplash.com/premium_photo-1677781688642-f571db368c0f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price: 17},
    { name: "Lemon Tree", img: "https://images.unsplash.com/photo-1432457990754-c8b5f21448de?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price : 12}
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
        cart.push({ name: selectedPlant.name, price: selectedPlant.price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Store updated cart
    updateCart();
}

function updateCart() {
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

