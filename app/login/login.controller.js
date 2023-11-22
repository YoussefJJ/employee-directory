var loginMod = angular.module("app.login");

loginMod.controller("LoginController", ["$scope", "loginService", function($scope, loginService) {
    
    if (loginService.isLoggedIn()) {
        loginService.redirectToHome()
    }
    
    $scope.error = null;

    $scope.credentials = {
        username: "",
        password: "",
        rememberMe: false
    }

    $scope.submit = function() {
        loginService.login($scope.credentials).then((response) => {
            console.log("Success")
            $scope.$emit("app.loggedIn", response.user)
        }).catch((error) => {
            $scope.error = error
            $scope.$apply()
        })
    }
}])