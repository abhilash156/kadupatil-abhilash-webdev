(function () {
    angular
        .module("WebAppMaker")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($routeParams, widgetService, $location) {
        var model = this;

        model.getWidgetUrlForType = getWidgetUrlForType;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.widgetId = $routeParams["wgid"];

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
        }

        init();

        function getWidgetUrlForType(type) {
            console.log(type);
            var widgetUrl = 'views/widget/templates/widget-' + type.toLowerCase() + '-edit.view.client.html';
            return widgetUrl;
        }

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }
    }
})();