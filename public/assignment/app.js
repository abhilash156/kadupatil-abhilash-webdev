var app = angular.module("WebAppMaker", ["ngRoute"]);

app.controller("loginController", loginController);

function loginController($scope) {
    $scope.uid = 5;
    //alert("Hello")
}