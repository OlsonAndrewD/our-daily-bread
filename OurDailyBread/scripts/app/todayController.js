angular.module("odb").controller("TodayController", [
    "$scope", "$http",
    function ($scope, $http) {
        var apiKey = "dcf32e6c4f77d824036c627c94090613";
        var queryParams = "key=" + apiKey + "&v=2";
        var audioRootUrl, videoRootUrl;

        $scope.scriptureReference = "Psalm 90";
        $scope.contentType = "audio";

        $http.get("http://dbt.io/audio/location?" + queryParams).
            success(function (data) {
                var locationInfo = data[0];
                audioRootUrl = locationInfo.protocol + "://" + locationInfo.server + locationInfo.root_path + "/";
                updateAudioSource();
            });

        $http.get("http://dbt.io/text/verse?" + queryParams + "&dam_id=ENGESVO2ET&book_id=Ps&chapter_id=90").
            success(function (data) {
                angular.forEach(data, function (verse) { verse.verse_id = Number(verse.verse_id); });
                $scope.textVerses = data;
            });

        $http.get("http://dbt.io/video/videolocation?" + queryParams).
            success(function (data) {
                var locationInfo = data[0];
                videoRootUrl = locationInfo.protocol + "://" + locationInfo.server + locationInfo.root_path + "/";
                updateVideoSource();
            });

        function updateAudioSource() {
            $http.get("http://dbt.io/audio/path?" + queryParams + "&dam_id=ENGESVO2DA&book_id=Ps&chapter_id=90").
                success(function (data) {
                    $scope.audioSourceUrl = audioRootUrl + data[0].path;
                });
        };

        function updateVideoSource() {
            $http.get("http://dbt.io/video/videopath?" + queryParams + "&dam_id=ASESLVO2DV&book_id=Gen&chapter_id=1&encoding=mp4").
                success(function (data) {
                    $scope.videoSourceUrl = videoRootUrl + data[0].path;
                });
        };
    }
]);