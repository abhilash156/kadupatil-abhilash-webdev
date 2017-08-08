var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
mongoose.Promise = require("q").Promise;

var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("../user/user.model.server");

require("../models.server");

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

module.exports = websiteModel;

function addPage(websiteId, pageId) {
    return websiteModel.findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        })
}

function removePage(websiteId, pageId) {
    return websiteModel.findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel.create(website)
        .then(function (newWebsite) {
            return userModel.addWebsite(userId, newWebsite._id);
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({"_user": userId});
}

function findWebsiteById(websiteId) {

    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {

    delete website._user;
    delete website.dateCreated;
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId) {
    return websiteModel.findById(websiteId)
        .then(function (website) {
            return websiteModel.remove({_id: websiteId})
                .then(function () {
                    return userModel.removeWebsite(website._user, websiteId);
                });
        });
}

var websites = [
    {"name": "Facebook", "_user": "5989418d2266043c2815ad93", "description": "Lorem"},
    {"name": "Tweeter", "_user": "5989418d2266043c2815ad93", "description": "Lorem"},
    {"name": "Gizmodo", "_user": "5989418d2266043c2815ad93", "description": "Lorem"},
    {"name": "Go", "_user": "123", "description": "Lorem"},
    {"name": "Tic Tac Toe", "_user": "5988ace4bb2b232eacbac94c", "description": "Lorem"},
    {"name": "Checkers", "_user": "5988ace4bb2b232eacbac94c", "description": "Lorem"},
    {"name": "Chess", "_user": "5989418d2266043c2815ad91", "description": "Lorem"},
    {
        "name": "Game-On", "_user": "5989418d2266043c2815ad94", "description": "Game-On is an video game blog " +
    "featuring articles, news, strategy, and reviews of video games and associated consoles."
    }
];

/*createWebsiteForUser(websites[0]._user, websites[0]);
createWebsiteForUser(websites[1]._user, websites[1]);
createWebsiteForUser(websites[2]._user, websites[2]);
createWebsiteForUser(websites[3]._user, websites[3]);
createWebsiteForUser(websites[4]._user, websites[4]);
createWebsiteForUser(websites[5]._user, websites[5]);
createWebsiteForUser(websites[6]._user, websites[6]);
createWebsiteForUser(websites[7]._user, websites[7]);*/
