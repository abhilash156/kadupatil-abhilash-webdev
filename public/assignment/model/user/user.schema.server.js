var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type : mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
    dob: Date,
    created: {type: Date, default: Date.now}
}, {collection: "user"});

modules.exports = userSchema;
