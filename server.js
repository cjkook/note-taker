// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var notes = []

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname,"public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// read all saved notes
app.get("/api/notes", function(req, res) {
  fs.readFile("db/db.json",(err, data) => {
    if (err) throw err;
    notes = JSON.parse(data)
    // console.log(notes)
    return res.json(notes)
  });
});

// add note
app.post("/api/notes", function(req, res) {
  // ! encapsulate note into an object/class
  let newNote = req.body
  
  console.log(newNote);

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNote.noteId = 123 // ! random number generation for id? Needs to check old ids for duplicates

  
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});