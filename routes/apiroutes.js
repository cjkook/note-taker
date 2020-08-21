// Imports the table and waitList arrays
const noteData = require("../db/db.json");
const fs = require('fs')


// The function we export here takes in the app object to allow the routing below
module.exports = app => {
    // These two routes each act to send data (tableData or waitListData) to the front end, and act as an API... upon page load of tables.html, the tables.js file makes AJAX calls to receive the JSON data from these routes and generates HTML for each reservation included in the corresponding array
    app.get("/api/notes", (req, res) => {
        console.log(noteData)
        res.json(noteData);
    });

    

    // This route received POST data from the HTML reservation form and adds the reservation to the appropriate table or waitlist array
    app.post("/api/notes", (req, res) => {
       console.log(req.body)
       noteData.push(req.body);
       fs.writeFile("./db/db.json", noteData, (err) => {
           console.log(err)
       })
       res.json(noteData)
    });
};
