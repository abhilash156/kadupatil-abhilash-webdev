(function () {
    angular
        .module("WebAppMaker")
        .controller("newWebsiteController", newWebsiteController);

    function newWebsiteController($routeParams, websiteService, $location) {
        var model = this;
        model.createWebsite = createWebsite;
        model.userId = $routeParams["uid"];

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }

        init();

        function createWebsite(website) {
            websiteService.createWebsite(model.userId, website);
            $location.url("user/" + model.userId + "/website");
        }
    }
})();
