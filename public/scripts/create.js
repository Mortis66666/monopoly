let a = document.getElementById("a");
let slider = document.getElementById("amt");

change()

slider.oninput = change;

function change() {
    a.innerHTML = slider.value;
}
