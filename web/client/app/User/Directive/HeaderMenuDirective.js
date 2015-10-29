/**
 * User menu
 */
angular
    .module('User')
    .directive('userHeaderMenu', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/User/Partial/header-menu.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);