
window.addEventListener("scroll", function() {
    h2 = document.getElementById("h2");
    tab=document.getElementById("reviews");
    if(window.scrollY>=100) {
        tab.style.opacity=1;
        h2.style.opacity= 1; 
        tab.style.transform = "translateY(0px)";
        h2.style.transform = "translateY(0)";
    }
    else{
        tab.style.opacity=0
        tab.style.transform = "translateY(20px)";
        h2.style.opacity= 0; 
        h2.style.transform = "translateY(20px)";
    }
});


document.querySelectorAll('.reviews img').forEach(img => {
    img.addEventListener('click', function() {
        document.getElementById('fullscreen-img').src = this.src;
        document.getElementById('fullscreen').style.display = 'flex';
    });
});

document.getElementById('fullscreen').addEventListener('click', function() {
    this.style.display = 'none';
});
