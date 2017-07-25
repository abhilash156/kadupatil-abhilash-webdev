(function () {
    angular
        .module("WebAppMaker")
        .controller("newPageController", newPageController);

    function newPageController($routeParams, pageService, $location) {
        var model = this;
        model.createPage = createPage;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }

        init();

        function createPage(page) {
            pageService.createPage(model.websiteId, page);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();
