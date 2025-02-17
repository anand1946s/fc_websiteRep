let plants = [
    { name: "Rose", price: 100, img: "../assets/flowering/rose1.jpeg", description: "Roses are popular ornamental plants known for their fragrance and beauty." },
    { name: "Lily", price: 200, img: "../assets/flowering/lily.jpg", description: "Lilies symbolize purity and are often used in bouquets and decorations." },
    { name: "Jasmine", price: 120, img: "../assets/flowering/jasmine.jpg", description: "Jasmine flowers are small, fragrant, and commonly used for making perfumes." },
    { name: "Bougainvillea", price: 300, img: "../assets/flowering/bougainvillea.jpg", description: "A vibrant flowering plant that thrives in warm climates and needs minimal care." },
    { name: "Petunia", price: 120, img: "../assets/flowering/petunia.jpg",description:"Popular for their vibrant colors and long blooming season. They are easy to grow and perfect for hanging baskets."},
    { name: "Lotus", price: 500, img: "../assets/flowering/lotus.jpg",description:"India’s national flower, symbolizing purity and enlightenment. Grows in water bodies."},
    { name: "Hibiscus", price: 150, img: "../assets/flowering/hibiscus.jpg", description: "A tropical plant known for its large and colorful blooms." },
    { name: "Marigold", price: 80, img: "../assets/flowering/marigold.jpg", description: "Widely used in decorations and religious ceremonies in India." },
    { name: "Orchid", price: 800, img: "../assets/flowering/orchid.jpg", description: "Orchids are exotic flowers that require specific care but bloom beautifully." },    
    { name: "Ixora", price: 150, img: "../assets/flowering/ixora.jpg", description: "A common Kerala garden shrub with dense clusters of red flowers. Blooms year-round, attracts butterflies, and is often used in temple rituals."},
    { name: "Golden Shower Tree", price: 500, img: "../assets/flowering/golden.png", description: "The official flower of Kerala, with cascading yellow blooms, famously used during Vishu."},
    { name: "Globe amaranth", price: 100, img: "../assets/flowering/globe-amaranth.jpg", description: "A hardy plant with small, round, vibrant purple or pink flowers. Popular in Kerala for garlands and floral decorations."},
    { name: "Daisy", price: 180, img: "../assets/flowering/daisy.jpg",description:"Large, cheerful flowers in bright colors, often used in bouquets and indoor decorations."},
    { name: "Hydrangea ", price: 600, img: "../assets/flowering/hydrangea.jpg",description:"Large, globe-shaped flowers that change color based on soil pH, making them unique and beautiful additions to gardens."},
    { name: "Dahlia", price: 180, img: "../assets/flowering/dahlia.png",description:"Known for its stunning, intricate flowers in various shapes and colors, perfect for garden borders."},
    { name: "Daffodils", price: 110, img: "../assets/flowering/daffodils.jpg", description: "Bright yellow flowers that signal the arrival of spring." },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayPlants() {
    let container = document.getElementById("floweringPlantsContainer");
    container.innerHTML = "";

    plants.forEach((plant, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${plant.img}" alt="${plant.name}" onclick="showDetails(${index})">
            <div class="card-title">${plant.name}</div>
            <div class="card-price">₹${plant.price}</div>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}


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

function showDetails(index) {
    let modal = document.getElementById("plantModal");
    let modalImg = document.getElementById("modalImg");
    let modalName = document.getElementById("modalName");
    let modalDesc = document.getElementById("modalDesc");

    modalImg.src = plants[index].img;
    modalName.textContent = plants[index].name;
    modalDesc.textContent = plants[index].description;

    modal.style.display = "flex";  // Change from block to flex for centering
}

function closeModal() {
    let modal = document.getElementById("plantModal");
    modal.classList.add("fade-out"); // Add fade-out class

    setTimeout(() => {
        modal.style.display = "none"; // Hide after animation
        modal.classList.remove("fade-out"); // Reset for next use
    }, 300); // Match this duration to CSS transition
}

function goToCart() {
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = "../categories/cart.html"; }, 400);
}

function goHome(){
    window.location.href = "../main.html";
}

displayPlants();

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal(); // Call your function to close the modal
    }
});
window.addEventListener("click", function (event) {
    let modal = document.getElementById("plantModal"); // Replace with your modal's ID
    if (event.target === modal) {
        closeModal();
    }
});
