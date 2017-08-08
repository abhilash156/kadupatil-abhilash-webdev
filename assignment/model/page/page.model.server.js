var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
mongoose.Promise = require("q").Promise;

var pageModel = mongoose.model("PageModel", pageSchema);

require("../models.server");

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel.create(page);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({"_website": websiteId});
}

function findPageById(pageId) {

    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {

    delete page._website;
    delete page.dateCreated;
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {

    return pageModel.remove({_id: pageId});
}


var pages = [
    {"name": "Post 1", "_website": "59895e2413afb7153c0c0259", "description": "Lorem"},
    {"name": "Post 2", "_website": "59895e2413afb7153c0c0259", "description": "Lorem"},
    {"name": "Post 3", "_website": "59895e2413afb7153c0c0259", "description": "Lorem"},
    {"name": "Horizon Zero Dawn", "_website": "59895e2413afb7153c0c025e", "description": "Horizon Zero Dawn is an " +
    "action role-playing video game developed by Guerrilla Games and published by Sony Interactive " +
    "Entertainment for PlayStation 4 and released in early 2017. The plot revolves around Aloy, a hunter " +
    "and archer living in a world overrun by robots. Having been an outcast her whole life, she sets out to " +
    "discover the dangers that kept her sheltered. The character uses ranged weapons and a spear and stealth " +
    "tactics to combat the mechanised creatures, whose remains can be looted for resources."
    }
];

/*createPage(pages[0]._website, pages[0]);
createPage(pages[1]._website, pages[1]);
createPage(pages[2]._website, pages[2]);
createPage(pages[3]._website, pages[3]);*/
