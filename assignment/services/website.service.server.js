var app = require("../../express");

var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"},
        {
            "_id": "222", "name": "Game-On", "developerId": "156", "description": "Game-On is an video game blog " +
        "featuring articles, news, strategy, and reviews of video games and associated consoles."
        }
    ]
;

app.get("/api/user/:userId/website", findWebsitesByUser);

function createWebsite(userId, website) {
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);
    return website;
}

function findWebsitesByUser(request, response) {
    var userId = request.params.userId;

    var sites = [];
    for (var w in websites) {
        if (websites[w].developerId === userId) {
            sites.push(websites[w]);
        }
    }
    return response.json(sites);
}

function findWebsiteById(websiteId) {
    for (var u in websites) {
        var _website = websites[u];
        if (_website._id === websiteId) {
            return angular.copy(_website);
        }
    }
    return null;
}

function updateWebsite(websiteId, website) {
    for (var u in websites) {
        if (websites[u]._id === websiteId) {
            website._id = websiteId;
            websites[u] = website;
            return website;
        }
    }
    return null;
}

function deleteWebsite(websiteId) {
    for (var w in websites) {
        if (websites[w]._id === websiteId) {
            websites.splice(w, 1);
            return;
        }
    }
    return null;
}
