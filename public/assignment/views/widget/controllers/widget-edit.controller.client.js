(function () {
    angular
        .module("WebAppMaker")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.widgetId = $routeParams["wgid"];

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();
    }
})();