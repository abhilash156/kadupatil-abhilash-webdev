(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location) {
        var model = this;

        var userId = $routeParams["uid"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        init();

        function updateUser(user) {
            var _user = userService.updateUser(user);
            $location.url("user/" + _user._id);
        }

        function deleteUser(userId) {
            userService.deleteUser(userId);
            $location.url("login/");
        }
    }
})();