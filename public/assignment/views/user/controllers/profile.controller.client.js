(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams, UserService) {
        var userId = $routeParams["uid"];
        $scope.user = UserService.findUserById(userId)
    }
})();