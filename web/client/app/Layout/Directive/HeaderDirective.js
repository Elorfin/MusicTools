/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('layoutHeader', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/header.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);