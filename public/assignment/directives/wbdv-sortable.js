(function () {
    angular.module('WebAppMaker')
        .directive('deltaDraggable', deltaDraggable);

    function deltaDraggable($routeParams, widgetService) {
        function linkFunction(scope, element) {
            var pageId = $routeParams["pid"];
            var startIndex = -1;
            var endIndex = -1;
            $(element).sortable({
                handle : ".handle",
                axis : "y",
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    console.log([startIndex, endIndex]);
                    widgetService.reOrderWidgets(startIndex, endIndex, pageId);
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();