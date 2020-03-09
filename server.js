const express = require("express");
const path = require("path");
const fs = require("fs")


const app = express();
const PORT = process.env.PORT || 3000;

let db = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", function (req, res) {
    return res.json(db);
});


app.get("/api/notes/:notes", function (req, res) {
    var chosen = req.params.notes;

    for (var i = 0; i < db.length; i++) {
        if (chosen === db[i].routeName) {
            return res.json(db[i]);
        }
    }

    return res.json(false);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    db.push(newNote);
    res.json(newNote);
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});