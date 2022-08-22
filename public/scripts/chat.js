
let form = document.getElementById("form");
let input = document.getElementById("input");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        // TODO change name
        send("morits", input.value);
        input.value = "";
    }
});

