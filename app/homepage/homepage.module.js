angular.module("app.homepage", ["app.login", "ui.router", "app.directory"])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "home.directory",
        url: "/directory",
        component: "directory"
    })
    .state({
        name: "home.demo",
        url: "/demo",
        templateUrl: "homepage/work_in_progress.html"
    })
    .state({
        name: "home.jobs",
        url: "/jobs",
        templateUrl: "homepage/work_in_progress.html"
    })
    .state({
        name: "home.statistics",
        url: "/statistics",
        templateUrl: "homepage/work_in_progress.html"
    })

    $urlRouterProvider.otherwise("/directory");
})