
const socket = io();

let msgs = document.getElementById("msgs");

function send(sender, msg) {
    socket.emit("msg", `<strong>${sender}</strong>: ${msg}`);
}


socket.on("msg", msg => {
    msgs.lastElementChild && msgs.lastElementChild.removeAttribute("id");
    let msgElement = document.createElement("li");
    msgElement.classList.add("msg");
    // msgElement.id = "scroll";
    msgElement.innerHTML = msg;
    msgs.appendChild(msgElement);

    // window.location.hash = "#scroll"
})
