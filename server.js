var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//scraping tools
var axios = require("axios")
var cheerio = require("cheerio");

//require all models
var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Make public a static folder (for styling)
app.use(express.static("public"));

//Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articleScraper", {useNewUrlParser: true});

//Routes

//A GET route for scraping BBC website
app.get("/scrape", function(req,res) {
    axios.get("https://www.pewresearch.org/topics/news-sources").then(function(response) {
        var $ = cheerio.load(response.data);
        $("div.header").each(function(i, element) {
            var result = {};

            result.title = $(this).children().text();
            result.link = $(this).find("a").attr("href");
            // result.image = $(element).children().children().children("img").attr("src");
        
            //Create a new Article from the scraping result
            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        });

        //Send message letting client know scraping worked
        res.send("Scrape Complete");
    });
});


//Start the server
app.listen(PORT, function() {
    console.log("App running on port" + PORT + "!");
})