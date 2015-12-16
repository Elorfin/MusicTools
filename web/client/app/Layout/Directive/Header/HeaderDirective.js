/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('uiHeader', [
        function HeaderDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Header/navbar.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);