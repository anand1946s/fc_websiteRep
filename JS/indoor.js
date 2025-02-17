let plants = [
    { name: "Moth Orchid", price: 10, img: "../indoor plants/moth orchid.jpg", description: "" },
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