var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var db = mongoose.connect("mongodb://52.15.130.243:27017/WebAppMaker", {useMongoClient: true});
