var app = angular.module("WebAppMaker", ["ngRoute"]);

app.controller("loginController", loginController);

function loginController($scope) {
    $scope.uid = 1;
    $scope.wid = 2;
    $scope.pid = 3;
    //alert("Hello")
}