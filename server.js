var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//scraping tools
var exphbs = require("express-handlebars");

//setting the port for Heroku
var PORT = process.env.PORT || 3000;

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

// Connect to Mongo
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articleScraper";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, useFindAndModify: false
});

//Start the server
app.listen(PORT, function() {
    console.log("App running on port" + PORT + "!");
})