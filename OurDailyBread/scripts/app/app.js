var module = angular.module("odb", ["ngRoute"]);

module.config(["$routeProvider",
    function ($routeProvider) {
        var baseViewUrl = "scripts/app/views";

        $routeProvider.when("/today", {
            controller: "TodayController",
            templateUrl: viewUrl("today")
        });

        $routeProvider.otherwise("/today");

        function viewUrl(viewName) {
            return "scripts/app/views/" + viewName + ".html";
        };
    }
]);

