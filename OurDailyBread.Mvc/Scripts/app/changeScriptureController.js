angular.module("odb").controller("ChangeScriptureController", [
    "$scope", "$http", "$q", "$modalInstance", "apiQueryParams",
    function ($scope, $http, $q, $modalInstance, apiQueryParams) {
        var otBooks, ntBooks;

        var getOTBooks = $http.get("http://dbt.io/library/book?" + apiQueryParams + "&dam_id=ENGESVO2ET&v=2").
            success(function (data) {
                otBooks = data;
            });

        var getNTBooks = $http.get("http://dbt.io/library/book?" + apiQueryParams + "&dam_id=ENGESVN2ET&v=2").
            success(function (data) {
                ntBooks = data;
            });

        $q.all([getOTBooks, getNTBooks]).then(function () {
            $scope.books = otBooks.concat(ntBooks).
                map(function (book) {
                    book.book_order = Number(book.book_order);
                    book.chapters = book.chapters.split(",");
                    return book;
                }).
                sort(function (book1, book2) {
                    if (book1.book_order < book2.book_order) {
                        return -1;
                    }
                    if (book1.book_order > book2.book_order) {
                        return 1;
                    }
                    return 0;
                });
        });

        $scope.selection = {};

        //$scope.$watch("selectedBookId", function (id) {
        //    if (id !== null && id !== undefined) {
        //        for (var i = 0; i < $scope.books.length; i++) {
        //            if ($scope.books[i].book_id === id) {
        //                $scope.selectedBook = $scope.books[i];
        //                break;
        //            }
        //        }
        //    }
        //    else {
        //        $scope.selectedBook = null;
        //    }
        //});

        $scope.ok = function () {
            ($scope.selection && $scope.selection.book && $scope.selection.chapter) ?
                $modalInstance.close($scope.selection) :
                $modalInstance.dismiss();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }
]);