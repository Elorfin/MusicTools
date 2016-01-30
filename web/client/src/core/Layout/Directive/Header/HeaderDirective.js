/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('uiHeader', [
        '$client',
        function HeaderDirective($client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('Header/navbar.html', 'core/Layout'),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);