var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//scraping tools
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Import routes and give the server access to them
var routes = require("./controllers/article_controller.js")

app.use(routes);

//Make public a static folder (for styling)
app.use(express.static("public"));

//Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articleScraper", { useUnifiedTopology: true });

//Start the server
app.listen(PORT, function() {
    console.log("App running on port" + PORT + "!");
})