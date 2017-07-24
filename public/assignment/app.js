var app = angular.module("WebAppMaker", ["ngRoute"]);

app.controller("loginController", loginController);
app.controller("profileController", profileController);

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

function loginController($scope, $location) {
    $scope.login = function (user) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === user.username && _user.password === user.password)
                $location.url("user/" + _user._id)
        }
        $scope.errorMessage = "Invalid Username or Password"
    }
}

function profileController($scope, $routeParams) {
    var userId = $routeParams["uid"];
    for (var u in users) {
        if (users[u]._id === userId) {
            $scope.user = users[u];
        }
    }
}