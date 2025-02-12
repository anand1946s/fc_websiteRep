document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents form submission (if inside a form)
        alert("You searched for: " + this.value); // Replace this with your function
    }
});