var express = require("express");

var router = express.Router();

//Import the article.js and note.js to use its database functions
var index = require("../models/index.js");

//scraping tools
var axios = require("axios")
var cheerio = require("cheerio");

//require all models
var db = require("../models/index.js");

//Export routes for server.js to use
module.exports = router;

//Routes
// get route -> index
router.get("/", function(req, res) {
    res.redirect("/articles");
  });

//A GET route for scraping BBC website
router.get("/scrape", function(req,res) {
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
        res.redirect("/articles");  
    });
});

//route for getting all Articles from the db
router.get("/articles", function(req,res) {
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

router.get("/saved", function(req,res) {
    db.Article.find({saved: true})
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
        res.render("saved", {article: articleArray});
        console.log("saved: " + articleArray)
    })
    .catch(function(err) {
        res.json(err);
    });
});

//add saved article
router.put("/saved/:id", function(req,res) {
    db.Article.updateOne({ _id: req.params.id}, {$set: {"saved": true}})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(error) {
        res.json(error);
    });
});

//removes saved article
router.put("/unsave/:id", function(req,res) {
    db.Article.updateOne({ _id: req.params.id}, {$set: {"saved": false}})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(error) {
        res.json(error);
    });
});

//clears any unsaved articles from database
router.get("/deleteArticles", function(req, res) {
    db.Article.deleteMany({saved: false}, function(error, result) {
        if (error) {
            res.send(result)
        } else {console.log("made it")}
        res.redirect("/articles");  
    })
})

router.get("/articles/:id", function(req,res) {
    db.Article.find({_id: req.params.id})
    .populate("note")
    .then(function(dbArticle) {
        var noteArray = [];
        for (i=0; i < dbArticle.note.length; i++) {
            noteArray.push({
                "id": dbArticle.note[i]._id,
                "date": dbArticle.note[i].date, 
                "body": dbArticle.note[i].body, 
            })
        };
        res.json(noteArray);
    })
    .catch(function(err) {
        res.json(err)
    });
});

router.post("/articles/:id", function(req,res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: { note: dbNote._id}}, {new: true});
    })
    .then(function(dbArticle) {
        res.json(dbArticle)
        res.redirect("/saved");  
    })
    .catch(function(err) {
        res.json(err)
    });
});




