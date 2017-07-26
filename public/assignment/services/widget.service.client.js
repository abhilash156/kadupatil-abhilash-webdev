(function () {
    angular.module("WebAppMaker").factory("widgetService", widgetService);

    function widgetService() {
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
            {"_id": "447", "widgetType": "HTML", "pageId": "333", "text": "<p>There’s something about being dropped into a brand new game world and finding it to be dense\n" +
            "                        with deeply considered lore, terrifyingly aggressive creatures, and tantalizing questions that\n" +
            "                        leaves an indelible mark on the memory. <a href=\"#\">Horizon Zero Dawn</a> is one of those games,\n" +
            "                        and it carves out a unique identity within the popular action-roleplaying genre. Coupled with\n" +
            "                        wonderfully flexible combat and a story that touches on unexpectedly profound themes. A sense of\n" +
            "                        urgency\n" +
            "                        is established from the get-go, as Horizon’s premise is a big mystery that begs to be solved.\n" +
            "                        The questions raised by protagonist Aloy and the primitive, feral machine-infested open world\n" +
            "                        she\n" +
            "                        inhabits kept me guessing throughout: what’s at the centre of it all? Although Horizon suffers\n" +
            "                        from\n" +
            "                        occasionally corny dialogue that belies its smarts, the broader ideas it prods at - the nature\n" +
            "                        of creation,\n" +
            "for example - are remarkably ambitious.</p>"},
            {"_id": "448", "widgetType": "HEADING", "pageId": "333", "size": 4, "text": "Horizon Zero Dawn: Story Trailer | PS4"},
            {
                "_id": "449", "widgetType": "YOUTUBE", "pageId": "333", "width": "100%",
                "url": "https://youtu.be/RRQDqurZJNk"
            }
        ];


        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;


        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function findWidgetsByPageId(pageId) {
            var currentWidgets = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    currentWidgets.push(widgets[w]);
                }
            }
            return currentWidgets;
        }

        function findWidgetById(widgetId) {
            for (var u in widgets) {
                var _widget = widgets[u];
                if (_widget._id === widgetId) {
                    return _widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widget._id = widgetId;
                    widgets[w] = widget;
                    return widget;
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                    return;
                }
            }
            return null;
        }
    }
})();