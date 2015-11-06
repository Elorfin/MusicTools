/**
 * User menu
 */
angular
    .module('User')
    .directive('userMenu', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/User/Partial/menu.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);