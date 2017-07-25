(function () {
    angular
        .module("WebAppMaker")
        .controller("newWidgetController", newWidgetController);

    function newWidgetController($routeParams, widgetService, $location) {
        var model = this;
        model.createWidget = createWidget;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        function init() {
        }

        init();

        function createWidget(widgetType) {
            var widget = {
                "widgetType": widgetType
            };

            widgetService.createWidget(model.pageId, widget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId
                + "/widget/" + widget._id);
        }
    }
})();
