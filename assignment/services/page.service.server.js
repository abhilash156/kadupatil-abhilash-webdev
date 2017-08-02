var app = require("../../express");

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
    {
        "_id": "333", "name": "Horizon Zero Dawn", "websiteId": "222", "description": "Horizon Zero Dawn is an " +
    "action role-playing video game developed by Guerrilla Games and published by Sony Interactive " +
    "Entertainment for PlayStation 4 and released in early 2017. The plot revolves around Aloy, a hunter " +
    "and archer living in a world overrun by robots. Having been an outcast her whole life, she sets out to " +
    "discover the dangers that kept her sheltered. The character uses ranged weapons and a spear and stealth " +
    "tactics to combat the mechanised creatures, whose remains can be looted for resources."
    }
];

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function createPage(request, response) {
    var websiteId = request.params.websiteId;
    var page = request.body;

    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    response.json(page);
}

function findAllPagesForWebsite(request, response) {
    var websiteId = request.params.websiteId;

    var sites = [];
    for (var p in pages) {
        if (pages[p].websiteId === websiteId) {
            sites.push(pages[p]);
        }
    }
    return response.json(sites);
}

function findPageById(request, response) {
    var pageId = request.params.pageId;

    for (var p in pages) {
        var _page = pages[p];
        if (_page._id === pageId) {
            response.json(_page);
            return;
        }
    }
    response.sendStatus(404);
}

function updatePage(request, response) {
    var page = request.body;
    var pageId = request.params.pageId;

    for (var p in pages) {
        if (pages[p]._id === pageId) {
            page._id = pageId;
            pages[p] = page;
            response.json(page);
            return;
        }
    }
    response.sendStatus(404);
}

function deletePage(request, response) {
    var pageId = request.params.pageId;

    for (var p in pages) {
        if (pages[p]._id === pageId) {
            pages.splice(p, 1);
            response.sendStatus(200);
            return;
        }
    }
    response.sendStatus(404);
}