angular.module("odb").controller("SetupController", [
    "$scope", "settings",
    function ($scope, settings) {
        settings.sendReminders = true;
        settings.reminderTime = new Date("9/14/2014 7:00 AM");

        $scope.settings = settings;
    }
]);
