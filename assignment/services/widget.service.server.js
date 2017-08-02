var app = require("../../express");

var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "444", "widgetType": "HEADING", "pageId": "333", "size": 2, "text": "GAME-ON"},
    {"_id": "445", "widgetType": "HEADING", "pageId": "333", "size": 4, "text": "Horizon Zero Dawn: Review"},
    {
        "_id": "446", "widgetType": "IMAGE", "pageId": "333", "width": "100%",
        "url": "https://19818-presscdn-pagely.netdna-ssl.com/wp-content/uploads/019/c1/horizon-zero-dawn-screen-01-us-15jun15.jpeg"
    },
    {
        "_id": "447",
        "widgetType": "HTML",
        "pageId": "333",
        "text": "<p>There’s something about being dropped into a brand new game world and finding it to be dense\n" +
        "with deeply considered lore, terrifyingly aggressive creatures, and tantalizing questions that\n" +
        "leaves an indelible mark on the memory. <a href=\"#\">Horizon Zero Dawn</a> is one of those games,\n" +
        "and it carves out a unique identity within the popular action-roleplaying genre. Coupled with\n" +
        "wonderfully flexible combat and a story that touches on unexpectedly profound themes. A sense of\n" +
        "urgency is established from the get-go, as Horizon’s premise is a big mystery that begs to be solved.\n" +
        "The questions raised by protagonist Aloy and the primitive, feral machine-infested open world\n" +
        "she inhabits kept me guessing throughout: what’s at the centre of it all? Although Horizon suffers\n" +
        "from occasionally corny dialogue that belies its smarts, the broader ideas it prods at - the nature\n" +
        "of creation, for example - are remarkably ambitious.</p>"
    },
    {
        "_id": "448",
        "widgetType": "HEADING",
        "pageId": "333",
        "size": 4,
        "text": "Horizon Zero Dawn: Story Trailer | PS4"
    },
    {
        "_id": "449", "widgetType": "YOUTUBE", "pageId": "333", "width": "100%",
        "url": "https://youtu.be/RRQDqurZJNk"
    }
];

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.put("/api/page/:pageId/widget", updateWidgetLocationForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);

function createWidget(request, response) {
    var pageId = request.params.pageId;
    var widget = request.body;

    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    response.json(widget);
}

function findAllWidgetsForPage(request, response) {

    return response.json(getAllWidgetsForPage(request.params.pageId));
}

function getAllWidgetsForPage(pageId) {
    var sites = [];
    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            sites.push(widgets[w]);
        }
    }
    return sites;
}

function filterAllWidgetsForPage(pageId) {
    return widgets.filter(function (element) {
        return element.pageId === pageId;
    });
}

function filterAllWidgetsNotForPage(pageId) {
    return widgets.filter(function (element) {
        return element.pageId !== pageId;
    });
}


function findWidgetById(request, response) {
    var widgetId = request.params.widgetId;

    for (var w in widgets) {
        var _widget = widgets[w];
        if (_widget._id === widgetId) {
            response.json(_widget);
            return;
        }
    }
    response.sendStatus(404);
}

function getWidgetById(widgetId) {
    for (var w in widgets) {
        var _widget = widgets[w];
        if (_widget._id === widgetId) {
            return _widget;
        }
    }
    return null;
}

function updateWidget(request, response) {
    var widget = request.body;
    var widgetId = request.params.widgetId;

    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widget._id = widgetId;
            widgets[w] = widget;
            response.json(widget);
            return;
        }
    }
    response.sendStatus(404);
}

function deleteWidget(request, response) {
    var widgetId = request.params.widgetId;

    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets.splice(w, 1);
            response.sendStatus(200);
            return;
        }
    }
    response.sendStatus(404);
}


function updateWidgetLocationForPage(request, response) {
    var initial = request.query.initial;
    var final = request.query.final;
    var pageId = request.params.pageId;

    var widgetsList = filterAllWidgetsForPage(pageId);
    widgetsList.splice(final, 0, widgetsList.splice(initial, 1)[0]);
    widgets = filterAllWidgetsNotForPage(pageId);
    widgets = widgets.concat(widgetsList);
    response.sendStatus(200);
}

function uploadImage(request, response) {
    var widgetId = request.body.widgetId;
    var width = request.body.width;
    var myFile = request.file;

    var userId = request.body.userId;
    var websiteId = request.body.websiteId;
    var pageId = request.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var widget = getWidgetById(widgetId);
    widget.url = '/assignment/uploads/' + filename;
    widget.width = width;

    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    response.redirect(callbackUrl);
}