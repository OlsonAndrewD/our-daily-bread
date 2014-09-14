var module = angular.module("odb", ["ngRoute", "ui.bootstrap"]);

module.config(["$routeProvider",
    function ($routeProvider) {
        var baseViewUrl = "scripts/app/views";

        $routeProvider.when("/today", {
            controller: "TodayController",
            templateUrl: viewUrl("today")
        });

        $routeProvider.when("/recent", {
            controller: "RecentController",
            templateUrl: viewUrl("recent")
        });

        $routeProvider.otherwise("/today");

        function viewUrl(viewName) {
            return "scripts/app/views/" + viewName + ".html";
        };
    }
]).run([
    "$rootScope", "$timeout",
    function ($rootScope, $timeout) {
        $rootScope.isNavCollapsed = true;
        $rootScope.$on("$routeChangeSuccess", function () {
            $timeout(function () { $rootScope.isNavCollapsed = true; });
        });
    }
]);

