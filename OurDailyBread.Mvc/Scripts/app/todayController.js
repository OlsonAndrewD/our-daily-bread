angular.module("odb").controller("TodayController", [
    "$scope", "$http", "$modal", "apiQueryParams",
    function ($scope, $http, $modal, queryParams) {
        var audioRootUrl, videoRootUrl;

        $scope.$watch("scriptureReference", function () { refreshContent(); });

        $scope.scriptureReference = {
            book: { book_id: "Ps", book_name: "Psalms", dam_id: "ENGESVO2" },
            chapter: 90
        };
        $scope.contentType = "audio";
        $scope.responding = true;

        $scope.changeScripture = function () {
            $modal.open({
                templateUrl: "Scripts/app/views/change-scripture.html",
                controller: "ChangeScriptureController"
            }).
            result.then(function (selection) {
                if (selection) {
                    $scope.scriptureReference = selection;
                }
            });
        };

        function refreshContent() {
            if (!$scope.scriptureReference || !$scope.scriptureReference.book || !$scope.scriptureReference.chapter) {
                $scope.textVerses = null;
                $scope.audioSourceUrl = null;
                $scope.videoSourceUrl = null;
                return;
            }
            else {
                $scope.loadingText = $scope.loadingAudio = $scope.loadingVideo = true;
            }

            var textUrl = "http://dbt.io/text/verse?" + queryParams +
                "&dam_id=ENGESV" + $scope.scriptureReference.book.dam_id[6] + "2ET&book_id=" + $scope.scriptureReference.book.book_id +
                "&chapter_id=" + $scope.scriptureReference.chapter;

            $http.get(textUrl).
                success(function (data) {
                    angular.forEach(data, function (verse) { verse.verse_id = Number(verse.verse_id); });
                    $scope.textVerses = data;
                })["finally"](function () { $scope.loadingText = false; });

            $http.get("http://dbt.io/audio/location?" + queryParams).
                success(function (data) {
                    var locationInfo = data[0];
                    audioRootUrl = locationInfo.protocol + "://" + locationInfo.server + locationInfo.root_path + "/";
                    updateAudioSource();
                }).
                error(function () { $scope.loadingAudio = false; });

            $http.get("http://dbt.io/video/videolocation?" + queryParams).
                success(function (data) {
                    var locationInfo = data[0];
                    videoRootUrl = locationInfo.protocol + "://" + locationInfo.server + locationInfo.root_path + "/";
                    updateVideoSource();
                }).
                error(function () { $scope.loadingVideo = false; });
        };

        function updateAudioSource() {
            var url = "http://dbt.io/audio/path?" + queryParams +
                "&dam_id=ENGESV" + $scope.scriptureReference.book.dam_id[6] + "2DA&book_id=" + $scope.scriptureReference.book.book_id +
                "&chapter_id=" + $scope.scriptureReference.chapter;

            $http.get(url).
                success(function (data) {
                    if (data && data.length) {
                        $scope.audioSourceUrl = audioRootUrl + data[0].path;
                    }
                })["finally"](function () { $scope.loadingAudio = false; });
        };

        function updateVideoSource() {
            var url = "http://dbt.io/video/videopath?" + queryParams +
                "&dam_id=ASESLV" + $scope.scriptureReference.book.dam_id[6] + "2DV&encoding=mp4" +
                "&book_id=" + $scope.scriptureReference.book.book_id +
                "&chapter_id=" + $scope.scriptureReference.chapter;

            $http.get(url).success(function (data) {
                if (data && data.length) {
                    $scope.videoSourceUrl = videoRootUrl + data[0].path;
                    $scope.noVideo = false;
                }
                else {
                    $scope.noVideo = true;
                }
            })["finally"](function () { $scope.loadingVideo = false; });
        };
    }
]);