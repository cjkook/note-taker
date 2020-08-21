// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")

// Sets up the Express App
// =============================================================
/// removed extra
const PORT = process.env.PORT || 3000;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This express.static middleware makes it possible to designate directories as "static"; this means that anytime a request comes in, Express looks in the directory specified *first* (in this case, "public") before checking any other routes which makes storing static files like CSS, front end JS, images, etc easy; when linking to a file stored in an this directory from a front end file, be sure to omit the "public" directory section of the url path, and instead begin the url path with the location INSIDE "public"
app.use(express.static("public"));

// Routes
// =============================================================

// The (app) at the end of each require threads the `app` object through to the routes, so they can use methods like app.get(), app.post(), etc
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});