const express = require('express');
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("game.ejs", {abc:"hello"});
})


io.on("connection", socket => {
    console.log("A socket connected");

    socket.on("msg", msg => {
        io.emit("msg", msg);
    })

    socket.on("disconnect", () => {
        console.log("A socket disconnected");
    })
})


server.listen(port = process.env.PORT || 3000, () => {
    console.log(`Running server at http://localhost:${port}`);
})
