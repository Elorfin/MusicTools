/**
 * User menu
 */
angular
    .module('User')
    .directive('userMenu', [
        '$client',
        function ($client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('menu.html', 'app/User'),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);