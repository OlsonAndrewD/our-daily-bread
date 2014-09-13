angular.module("odb").controller("TodayController", [
    "$scope", "$http",
    function ($scope, $http) {
        var apiKey = "dcf32e6c4f77d824036c627c94090613";
        var queryParams = "key=" + apiKey + "&v=2";
        var audioRootUrl, videoRootUrl;

        $scope.scriptureReference = "Genesis 1";
        $scope.contentType = "audio";

        $http.get("http://dbt.io/audio/location?" + queryParams).
            success(function (data) {
                var locationInfo = data[0];
                audioRootUrl = locationInfo.protocol + "://" + locationInfo.server + locationInfo.root_path + "/";
                updateAudioSource();
            });

        function updateAudioSource() {
            $http.get("http://dbt.io/audio/path?" + queryParams + "&dam_id=ENGESVO2DA&book_id=Ps&chapter_id=90").
                success(function (data) {
                    $scope.audioSourceUrl = audioRootUrl + data[0].path;
                });
        };
    }
]);