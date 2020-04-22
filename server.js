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

//Make public a static folder (for styling)
app.use(express.static("public"));

//Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articleScraper", {useNewUrlParser: true});

//Routes