(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;
        model.login = login;

        function init() {

        }

        init();

        function login(user) {
            userService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    user = response.data;
                    if (user === null) {
                        model.errorMessage = "Invalid Username or Password";
                    } else {
                        $location.url("user/" + user._id);
                    }
                });
        }
    }
})();