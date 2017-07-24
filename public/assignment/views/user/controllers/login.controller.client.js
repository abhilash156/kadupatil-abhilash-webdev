(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($scope, $location, UserService) {
        $scope.login = function (user) {
            var _user = UserService.findUserByCredentials(user.username, user.password);
            if (_user === null) {
                $scope.errorMessage = "Invalid Username or Password"
            } else {
                $location.url("user/" + _user._id)
            }
        }
    }
})();