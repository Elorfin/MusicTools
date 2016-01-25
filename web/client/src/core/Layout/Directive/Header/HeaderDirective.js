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
                templateUrl: $partial.getPath('Layout', 'Header/navbar.html', true),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);