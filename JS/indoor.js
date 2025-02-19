let plants = [
    { name: "Moth Orchid", price: 900, img: "../assets/indoor/moth orchid.jpg"},
    { name: "Rosemary", price: 300, img: "../assets/indoor/rosemary.jpg"},
    { name: "Bromeliad", price: 650, img: "../assets/indoor/bromeliad.jpg"},
    { name: "Oyestar Plant", price: 400, img: "../assets/indoor/oyestar plant.jpeg"},
    { name: "Spider Plant", price: 350, img: "../assets/indoor/spider plant.jpg"},
    { name: "Lucky Bamboo", price: 400, img: "../assets/indoor/lucky bamboo.png"},
    { name: "Snake Plant", price: 300, img: "../assets/indoor/Snake Plant.jpg"},
    { name: "Peace Lilly", price: 600, img: "../assets/indoor/peace lily.jpg"},
    { name: "ZZ Plant", price: 750, img: "../assets/indoor/ZZ plant.jpg"},
    { name: "Golden Pothos", price: 600, img: "../assets/indoor/golden pothos.jpg"},
    { name: "Jade Plant", price: 450, img: "../assets/indoor/jade plant.jpg"},
    { name: "Aloe Vera", price: 350, img: "../assets/indoor/aloe vera.jpg"},
    
];

function searchPlant() {
    let input = document.getElementById('search-bar').value.toLowerCase();
    let plants = document.getElementsByClassName('plant-card');
    for (let plant of plants) {
        let plantName = plant.innerText.toLowerCase();
        if (plantName.includes(input) && input !== '') {
            plant.classList.add('highlight');
        } else {
            plant.classList.remove('highlight');
        }
    }
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function addToCart(index) {
    let existingItem = cart.find(item => item.name === plants[index].name);
    let quantitySelected = parseInt(document.getElementById(`quantity${index}`).textContent);
    if (existingItem) {
        existingItem.quantity += quantitySelected; 
        alert(`${existingItem.name} added to cart! \nTotal Quantity in Cart : ${existingItem.quantity}`); 
    } else {
        let newItem = { ...plants[index], quantity: quantitySelected }
        cart.push(newItem);
        alert(`${newItem.name} added to cart! \nTotal Quantity in Cart : ${newItem.quantity}`);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
}
window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".plant-card").forEach((card, index) => {
        let quantityElem = document.getElementById(`quantity${index}`);
        if (!quantityElem) return; // Prevents the error if element is not found

        let minusButton = card.querySelector(".minus");
        if (!minusButton) return; // Prevents the error if button is missing

        let quantity = parseInt(quantityElem.textContent);
        if (quantity === 1) {
            minusButton.disabled = true;
            minusButton.style.cursor = "not-allowed";
        }
    });
});

function updateQuantity(index, change) {
    let quantityElem = document.getElementById(`quantity${index}`);
    if (!quantityElem) return; // Prevents error if element is not found

    let newQuantity = parseInt(quantityElem.textContent) + change;
    if (newQuantity < 1) return; // Prevent negative quantity

    quantityElem.textContent = newQuantity;

    let plantCard = quantityElem.closest(".plant-card");
    let minusButton = plantCard ? plantCard.querySelector(".minus") : null;

    if (newQuantity === 1) {
        minusButton.disabled = true;
        minusButton.style.cursor = "not-allowed"
        
    } else {
        minusButton.disabled = false;
        minusButton.style.cursor = "pointer"
        console.log("null")
    }
}



