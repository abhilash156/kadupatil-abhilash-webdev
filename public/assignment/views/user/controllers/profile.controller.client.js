(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var model = this;

        var userId = $routeParams["uid"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.user = UserService.findUserById(userId)
        }

        init();

        function updateUser(user) {
            var _user = UserService.updateUser(user);
            $location.url("user/" + _user._id);
        }

        function deleteUser(userId) {
            UserService.deleteUser(userId);
            $location.url("login/");
        }
    }
})();