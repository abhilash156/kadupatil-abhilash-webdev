var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
mongoose.Promise = require("q").Promise;

var widgetModel = mongoose.model("WidgetModel", widgetSchema);

require("../models.server");

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({"_page": pageId});
}

function findWidgetById(widgetId) {

    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {

    delete widget._page;
    delete widget.dateCreated;
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {

    return widgetModel.remove({_id: widgetId});
}


function reorderWidget(pageId, start, end) {

}


var widgets = [
    {"widgetType": "HEADING", "_page": "598962c9264e4e1208564ce4", "size": 2, "text": "GIZMODO"},
    {"widgetType": "HEADING", "_page": "598962c9264e4e1208564ce4", "size": 4, "text": "Lorem ipsum"},
    {
        "widgetType": "IMAGE", "_page": "598962c9264e4e1208564ce4", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"widgetType": "HTML", "_page": "598962c9264e4e1208564ce4", "text": "<p>Lorem ipsum</p>"},
    {"widgetType": "HEADING", "_page": "598962c9264e4e1208564ce4", "size": 4, "text": "Lorem ipsum"},
    {
        "widgetType": "YOUTUBE", "_page": "598962c9264e4e1208564ce4", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"widgetType": "HTML", "_page": "598962c9264e4e1208564ce", "text": "<p>Lorem ipsum</p>"},
    {"widgetType": "HEADING", "_page": "598962c9264e4e1208564ce", "size": 2, "text": "GAME-ON"},
    {"widgetType": "HEADING", "_page": "598962c9264e4e1208564ce", "size": 4, "text": "Horizon Zero Dawn: Review"},
    {
        "widgetType": "IMAGE", "_page": "598962c9264e4e1208564ce", "width": "100%",
        "url": "https://19818-presscdn-pagely.netdna-ssl.com/wp-content/uploads/019/c1/horizon-zero-dawn-screen-01-us-15jun15.jpeg"
    },
    {
        "widgetType": "HTML",
        "_page": "598962c9264e4e1208564ce",
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
        "widgetType": "HEADING",
        "_page": "598962c9264e4e1208564ce",
        "size": 4,
        "text": "Horizon Zero Dawn: Story Trailer | PS4"
    },
    {
        "widgetType": "YOUTUBE", "_page": "598962c9264e4e1208564ce", "width": "100%", "url": "https://youtu.be/RRQDqurZJNk"
    }
];

/*createWidget(widgets[0]._page, widgets[0]);
createWidget(widgets[1]._page, widgets[1]);
createWidget(widgets[2]._page, widgets[2]);
createWidget(widgets[3]._page, widgets[3]);
createWidget(widgets[4]._page, widgets[4]);
createWidget(widgets[5]._page, widgets[5]);
createWidget(widgets[6]._page, widgets[6]);
createWidget(widgets[7]._page, widgets[7]);
createWidget(widgets[8]._page, widgets[8]);
createWidget(widgets[9]._page, widgets[9]);
createWidget(widgets[10]._page, widgets[10]);
createWidget(widgets[11]._page, widgets[11]);
createWidget(widgets[12]._page, widgets[12]);*/
