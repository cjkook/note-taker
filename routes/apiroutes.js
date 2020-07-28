// Imports the table and waitList arrays
const noteData = require("../db/db.json");

// The function we export here takes in the app object to allow the routing below
module.exports = app => {
    // These two routes each act to send data (tableData or waitListData) to the front end, and act as an API... upon page load of tables.html, the tables.js file makes AJAX calls to receive the JSON data from these routes and generates HTML for each reservation included in the corresponding array
    app.get("/api/notes", (req, res) => {
        res.json(tableData);
    });

    app.get("/api/notes", (req, res) => {
        res.json(waitListData);
    });

    // This route received POST data from the HTML reservation form and adds the reservation to the appropriate table or waitlist array
    app.post("/api/notes", (req, res) => {
        // req.body gives us access to the client's POST data (in this case the reservation), thanks to the express.urlencoded and express.json middleware
        const reservation = req.body;

        if (tableData.length < 5) {
            // If there are fewer than 5 tables in the tableData array, that means the new reservation gets added as a table
            tableData.push(reservation);
            // res.json(true) terminates the req/res cycle and hands control over to the front end; sending `true` here indicates to the front end that the user gets a table
            res.json(true);
        }
        else {
            // If there are not any tables remaining, that means the new reservation gets added to the waitlist instead
            waitListData.push(reservation);
            // res.json(false) terminates the req/res cycle and hands control over to the front end; sending `false` here indicates to the front end that the user got waitlisted
            res.json(false);
        }
    });


    // This route empties out the tableData and waitList data
    app.post("/api/clear", (req, res) => {
        // Setting an array's length to 0 is a lesser-used way of clearing that array out
        tableData.length = 0;
        waitListData.length = 0;

        // Every route must resolve with a `res.something()` method, which hands control back over to the client
        res.json({ ok: true });
    });
};
