var app = require('../express');
var q = require('q');

app.get("/api/test", findAllMessages);
app.post("/api/test", createMessage);
app.delete("/api/test/:id", deleteMessage);

var connectionString = 'mongodb://52.15.130.243:27017/DeltaTest'; // for local
if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    var connectionUrl = process.env.MLAB_CONNECTION_URL;
    connectionString = 'mongodb://' + username + ':' + password + connectionUrl;
}
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"

var mongoose = require("mongoose");
mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = q.Promise;

var TestSchema = mongoose.Schema({
    message: String
});

var TestModel = mongoose.model("TestModel", TestSchema);

function findAllMessages(req, res) {
    TestModel
        .find()
        .then(
            function (tests) {
                res.json(tests);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
}

function createMessage(req, res) {
    TestModel
        .create(req.body)
        .then(
            function (test) {
                res.json(test);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
}

function deleteMessage(req, res) {
    TestModel
        .remove({_id: req.params.id})
        .then(
            function (result) {
                res.json(result);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
}