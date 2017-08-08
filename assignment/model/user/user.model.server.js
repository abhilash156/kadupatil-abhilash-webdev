var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
mongoose.Promise = require("q").Promise;

var userModel = mongoose.model("UserModel", userSchema);

require("../models.server");

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(userId) {

    return userModel.findById(userId);
}

function findUserByUsername(username) {

    return userModel.findOne({"username": username});
}

function findUserByCredentials(username, password) {

    return userModel.findOne({"username": username, "password": password});
}

function updateUser(userId, user) {

    delete user.username;
    delete user.dateCreated;
    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {

    return userModel.remove({_id: userId});
}

user = {
    "username": "alice",
    "password": "alice",
    "firstName": "Alice",
    "lastName": "Wonder",
    "email": "alice@wonderland.com"
};

user2 = {
    "username": "bob",
    "password": "bob",
    "firstName": "Bob",
    "lastName": "Marley",
    "email": "bob@wonderland.com"
};

user3 = {
    "username": "charly",
    "password": "charly",
    "firstName": "Charly",
    "lastName": "Garcia",
    "email": "charly@wonderland.com"
};

user4 = {
    "username": "jannunzi",
    "password": "jannunzi",
    "firstName": "Jose",
    "lastName": "Annunzi",
    "email": "jannunzi@wonderland.com"
};

user5 = {
    "username": "desmond",
    "password": "desmond",
    "firstName": "Desmond",
    "lastName": "Miles",
    "email": "desmond@assassins.com"
};