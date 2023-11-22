'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'app.login',
  'app.homepage',
  'ui.router',
]).
config(['$locationProvider', '$urlRouterProvider', '$stateProvider', function($locationProvider, $urlRouterProvider,$stateProvider) {
  $locationProvider.hashPrefix('!');

  $stateProvider.state({
    name: "home",
    url: "/home",
    templateUrl: "layout/homepage.html",
    controller: "HomepageController",
    controllerAs: "home",
    redirectTo: "home.directory"
  })

  $stateProvider.state({
    name: "login",
    url: "/login",
    templateUrl: "login/login.html",
    controller: "LoginController"
  })

  $urlRouterProvider.otherwise("/home")

}]);
