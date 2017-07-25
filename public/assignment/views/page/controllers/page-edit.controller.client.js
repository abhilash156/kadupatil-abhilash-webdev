(function () {
    angular
        .module("WebAppMaker")
        .controller("editPageController", editPageController);

    function editPageController($routeParams, pageService, $location) {
        var model = this;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }

        init();

        function updatePage(page) {
            pageService.updatePage(model.pageId, page);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }
})();
