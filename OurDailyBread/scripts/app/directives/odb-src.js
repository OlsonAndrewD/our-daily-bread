angular.module("odb").directive("odbSrc", [
    function () {
        return {
            scope: {
                url: "="
            },
            link: function (scope, elem) {
                scope.$watch("url", function (newUrl) {
                    elem.attr("src", newUrl);
                });
            }
        };
    }
]);