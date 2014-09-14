angular.module("odb").controller("RecentController", [
    "$scope", "people",
    function ($scope, people) {
        $scope.people = people;
    }
]);
