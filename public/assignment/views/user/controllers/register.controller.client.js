(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($scope, userService) {
        function registerUser(user) {
            var _user = userService.findUserByUsername(user.username);
            if(!_user) {
                user = userService.createUser(user);
                $location.url("/profile/"+user._id);
            } else {
                $scope.errorMessage = "User already exists";
            }
        }
    }
})();