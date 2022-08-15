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
    res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
})


server.listen(port = process.env.PORT || 3000, () => {
    console.log(`Running server at http://localhost:${port}`);
})