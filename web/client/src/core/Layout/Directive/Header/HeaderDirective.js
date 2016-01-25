/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('uiHeader', [
        '$partial',
        function HeaderDirective($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Header/navbar.html', 'Layout', true),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);