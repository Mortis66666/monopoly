const express = require('express');
const app = express();
const server = require("http").createServer(app);


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("create.ejs");
})


app.post("/game", (req, res) => {
    res.render("game.ejs", {amt: req.body.amt});
})



server.listen(port = process.env.PORT || 3000, () => {
    console.log(`Running server at http://localhost:${port}`);
})
