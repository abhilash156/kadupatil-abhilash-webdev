(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, UserService) {
        var model = this;
        model.login = login;

        function init() {

        }

        init();

        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user === null) {
                model.errorMessage = "Invalid Username or Password";
            } else {
                $location.url("user/" + user._id);
            }
        }
    }
})();