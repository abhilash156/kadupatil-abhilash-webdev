(function () {
    angular.module('WebAppMaker')
        .directive('hello', helloTag)
        .directive('deltaDraggable', deltaDraggable);


    function helloTag() {
        return {
            template: 'Hello World!'
        }
    }

    function deltaDraggable($http) {
        function linkFunction(scope, element) {
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
                    $http.put("/api/page/" + 333 + "/widget?initial=" + startIndex + "&final=" + endIndex);
                }
            });
        }

        return {
            link: linkFunction
        }
    }
})();