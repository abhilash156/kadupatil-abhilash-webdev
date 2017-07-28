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
                .then(function (user) {
                    model.user = user;
                });
        }

        init();

        function updateUser(user) {
            userService.updateUser(userId, user)
                .then(function (_user) {
                    $location.url("user/" + _user._id);
                });
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (_user) {
                });
            $location.url("login/");
        }
    }
})();