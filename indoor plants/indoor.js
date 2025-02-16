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