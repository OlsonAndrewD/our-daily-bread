angular.module("odb").controller("ChangeScriptureController", [
    "$scope", "$http", "$q", "$modalInstance", "apiQueryParams", "selection",
    function ($scope, $http, $q, $modalInstance, apiQueryParams, selection) {
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
            var selectedBook, i;

            $scope.books = otBooks.concat(ntBooks).
                map(function (book) {
                    book.book_order = Number(book.book_order);
                    book.chapters = book.chapters.split(",").map(function(x) { return Number(x); });
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

            for (i = 0; i < $scope.books.length; i++) {
                if ($scope.books[i].book_id === selection.book.book_id) {
                    selectedBook = $scope.books[i];
                    break;
                }
            }
            $scope.selection = {
                book: selectedBook,
                chapter: selection.chapter
            };
        });

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