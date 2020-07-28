// The path module is used in our `res.sendFile()` calls below, in order to join together multiple relative url paths into an absolute path
const path = require("path");

// The function we export here takes in the app object to allow the routing below
module.exports = app => {
    // Each of these routes renders an HTML page when the corresponding route is requested
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // The wildcard route (*) is used to capture any requests not captured by the previous routes; always put your wildcard route LAST else it will absorb your other routes
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};
