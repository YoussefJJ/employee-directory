(function () {
    'use strict';

    angular
        .module ('app.homepage')
        .component ('navbar', navbar());


    function navbar() {

        function navbarController($scope, $state, loginService){
            var ctrl = this;
            ctrl.links = [
                {text: "Demo's home", link: "demo"},
                {text: "People directory", link: "directory"},
                {text: "Jobs manager", link: "jobs"},
                {text: "Statistics", link: "statistics"},
            ]
            ctrl.selected = null;

            ctrl.highlight = function($event, item) {
                console.log($event, item)
            }

            ctrl.logout = function() {
                $scope.$emit("app.logout");
            }

            console.log($state.current)
            
            init();

            function init(){
                const user = loginService.getUser()
                console.log(user)
                if (user) {
                    ctrl.username = user.username
                }
            }
        }

        return {
            bindings: {},
            templateUrl: "homepage/navbar/navbar.html",
            controller: ["$scope", "$state", "loginService", navbarController],
            controllerAs: "ctrl"
        }
    }

} ());