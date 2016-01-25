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
                templateUrl: $partial.getPath('User', 'menu.html'),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);