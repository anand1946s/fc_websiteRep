let plants = [
    { name: "Moth Orchid", price: 10, img: "../assets/indoor/moth orchid.jpg", description: "" },
    { name: "Rosemary", price: 10, img: "../assets/indoor/rosemary.jpg", description: "" },
    { name: "Bromeliad", price: 10, img: "../assets/indoor/bromeliad.jpg", description: "" },
    { name: "Oyestar Plant", price: 10, img: "../assets/indoor/oyestar plant.jpeg", description: "" },
    { name: "Spider Plant", price: 10, img: "../assets/indoor/spider plant.jpg", description: "" },
    { name: "Lucky Bamboo", price: 10, img: "../assets/indoor/lucky bamboo.jpg", description: "" },
    { name: "Snake Plant", price: 10, img: "../assets/indoor/Snake Plant.jpg", description: "" },
    { name: "", price: 10, img: "../assets/indoor/.jpg", description: "" },
    { name: "", price: 10, img: "../assets/indoor/.jpg", description: "" },
    { name: "", price: 10, img: "../assets/indoor/.jpg", description: "" },
    { name: "", price: 10, img: "../assets/indoor/.jpg", description: "" },
    { name: "", price: 10, img: "../assets/indoor/.jpg", description: "" },
    
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
        alert(`${existingItem.name} added to cart! \nQuantity : ${existingItem.quantity}`); 
    } else {
        let newItem = { ...plants[index], quantity: quantitySelected }
        cart.push(newItem);
        alert(`${newItem.name} added to cart! \nQuantity : ${newItem.quantity}`);
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



