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


app.get("/api/notes", function (req, res) {
    return res.json(dbnote);
});


app.get("/api/notes/:notes", function (req, res) {
    var chosen = req.params.notes;

    console.log(chosen);

    for (var i = 0; i < dbnote.length; i++) {
        if (chosen === dbnote[i].routeName) {
            return res.json(dbnote[i]);
        }
    }

    return res.json(false);
});

app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

    console.log(cd);

    dbnote.push(newNote);

    res.json(newNote);
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});