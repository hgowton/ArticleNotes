var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//scraping tools
var axios = require("axios")
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

//require all models
var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Make public a static folder (for styling)
app.use(express.static("public"));

//Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articleScraper", {useNewUrlParser: true});

//Routes
// get route -> index
app.use("/", function(req, res) {
    console.log("here")
    res.redirect("/articles");
  });

//A GET route for scraping BBC website
app.get("/scrape", function(req,res) {
    axios.get("https://www.pewresearch.org/topics/news-sources").then(function(response) {
        var $ = cheerio.load(response.data);
        $("article.story-item").each(function(i, element) {
            var result = {};

            //check out Practice2.js in Activity 06-Unsolved
            result.title = $(element).children("div.content").children("div.header").children().text();
            result.link = $(element).children("div.content").children("div.header").find("a").attr("href");
            result.date = $(element).children("div.content").children("div.meta").children(".date").text();
            result.description = $(element).children("div.content").children("div.description").text().split("\n").join("").split("\t\t\t\t\t").join("").split("\t\t\t\t").join("");
            result.image = $(element).children("div.has-thumbnail").children().children().children("img").attr("src");
        
            //Create a new Article from the scraping result
            db.Article.create(result)
            .then(function(dbArticle) {
                // console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        });

        //Send message letting client know scraping worked
        res.send("Scrape Complete");
    });
});

//route for getting all Articles from the db
app.get("/articles", function(req,res) {
    db.Article.find({})
    .then(function(dbArticle) {
            var articleArray = [];
            for (i=0; i < dbArticle.length; i++) {
                articleArray.push({
                    "_id": dbArticle[i]._id, 
                    "title": dbArticle[i].title, 
                    "link": dbArticle[i].link,
                    "date": dbArticle[i].date,
                    "description": dbArticle[i].description,
                    "image": dbArticle[i].image,
                    "saved": dbArticle[i].saved
                })
            };
        res.render("index", {article: articleArray});
        console.log("NOT saved: " + articleArray)

    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/saved", function(req,res) {
    db.Article.find({saved: false})
    .then(function(dbArticle) {
            var articleArray = [];
            for (i=0; i < dbArticle.length; i++) {
                articleArray.push({
                    "_id": dbArticle[i]._id, 
                    "title": dbArticle[i].title, 
                    "link": dbArticle[i].link,
                    "date": dbArticle[i].date,
                    "description": dbArticle[i].description,
                    "image": dbArticle[i].image,
                    "saved": dbArticle[i].saved
                })
            };
        res.render("index", {article: articleArray});
        console.log("saved: " + articleArray)
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.put("/saved/:id", function(req,res) {
    db.Article.updateOne({ _id: req.params.id}, {$set: {"saved": true}})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(error) {
        res.json(error);
    });
});

app.get("/deleteArticles", function(req, res) {
    db.Article.remove({saved: false}, function(error, result) {
        if (error) {
            res.send(result)
        }
    })
})

//route for grabbing a specific Article by id, populate with it's note
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id})
    .populate("note")
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err)
    });
});

//route for saving/updating an Article's associated note
app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id}, {note: dbNote._id}, {new: true});
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(error) {
        res.json(err);
    })
})


//Start the server
app.listen(PORT, function() {
    console.log("App running on port" + PORT + "!");
})