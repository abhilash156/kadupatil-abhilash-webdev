(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }

        init();

        function registerUser(user, password) {
            if(password === user.password) {
                var _user = userService.findUserByUsername(user.username);
                if (!_user) {
                    user = userService.createUser(user);
                    $location.url("/user/" + user._id);
                } else {
                    model.errorMessage = "User already exists";
                }
            } else {
                model.errorMessage = "Password don't match";
            }
        }
    }
})();