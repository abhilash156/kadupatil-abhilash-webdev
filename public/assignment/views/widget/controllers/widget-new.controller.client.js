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
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }

        init();

        function createWidget(widget) {
            widgetService.createWidget(model.pageId, widget);
            //$location.url("user/" + model.userId + "/ed");
        }
    }
})();
