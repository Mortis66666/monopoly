
const socket = io();

let msgs = document.getElementById("msgs");

function send(sender, msg) {
    socket.emit("msg", `<strong>${sender}</strong>: ${msg}`);
}

function info(msg) {
    send("System", msg);
}


socket.on("msg", msg => {
    let oldscrollHeight = $("#msgs")[0].scrollHeight - 20;

    msgs.lastElementChild && msgs.lastElementChild.removeAttribute("id");
    let msgElement = document.createElement("li");
    msgElement.classList.add("msg");

    msgElement.innerHTML = msg;
    msgs.appendChild(msgElement);

    let newscrollHeight = $("#msgs")[0].scrollHeight - 20;

    if (newscrollHeight > oldscrollHeight) {
        $("#msgs").animate({ scrollTop: newscrollHeight }, 'normal');
    }
})

socket.on("new-player", (name, color) => {
    let newPlayer = new Player(name, color);
    places[0].add(newPlayer);
    players.push(newPlayer);
})
