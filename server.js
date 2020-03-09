const express = require("express");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

let dbnote = require("./db/db.json");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


app.get("/api/notes/:character", function(req, res) {
    var chosen = req.params.character;  



app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});