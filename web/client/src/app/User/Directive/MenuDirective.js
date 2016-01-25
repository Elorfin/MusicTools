/**
 * User menu
 */
angular
    .module('User')
    .directive('userMenu', [
        '$partial',
        function ($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('menu.html', 'User'),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);