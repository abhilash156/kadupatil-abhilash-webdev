(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }

        init();

        function registerUser(user) {
            var _user = UserService.findUserByUsername(user.username);
            if (!_user) {
                user = UserService.createUser(user);
                $location.url("/user/" + user._id);
            } else {
                model.errorMessage = "User already exists";
            }
        }
    }
})();