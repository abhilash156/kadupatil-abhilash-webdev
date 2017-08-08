var app = require("../../express");

var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

var widgetModel = require("../model/widget/widget.model.server");

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

    widgetModel.createWidget(pageId, widget)
        .then(function (newWidget) {
            response.send(newWidget);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

function findAllWidgetsForPage(request, response) {
    var pageId = request.params.pageId;
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            response.send(widgets);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
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

    var widget = getWidgetById(widgetId);
    if (widget === null) {
        response.sendStatus(404);
    } else {
        response.json(widget);
    }
}

function getWidgetById(widgetId) {
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            return widget;
        }, function () {
            return null;
        });
}

function updateWidget(request, response) {
    var widget = request.body;
    var widgetId = request.params.widgetId;

    widgetModel.updateWidget(widgetId, widget)
        .then(function () {
            response.sendStatus(200);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
}

function deleteWidget(request, response) {
    var widgetId = request.params.widgetId;

    widgetModel.deleteWidget(widgetId)
        .then(function () {
            response.sendStatus(200);
        }, function (error) {
            response.sendStatus(404).error(error);
        });
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

    var filename = myFile.filename;     // new file name in upload folder

    var widget = getWidgetById(widgetId);
    widget.url = '/assignment/uploads/' + filename;
    widget.width = width;

    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    response.redirect(callbackUrl);
}
