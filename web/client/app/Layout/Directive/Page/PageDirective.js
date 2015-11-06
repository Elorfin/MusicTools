/**
 * Represents a page of the application
 */
angular
    .module('Layout')
    .directive('layoutPage', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Page/page.html',
                replace: true,
                transclude: true
            };
        }
    ]);