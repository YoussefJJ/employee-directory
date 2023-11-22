angular.module("app.homepage")
.controller("HomepageController", ["$scope", "loginService", function($scope, loginService) {
    if (!loginService.isLoggedIn()) {
        $scope.$emit("app.loginRedirect");
    }

    $scope.logout = function() {
        $scope.$emit("app.logout");
    }
}])