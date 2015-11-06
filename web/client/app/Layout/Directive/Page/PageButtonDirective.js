/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('layoutPageButton', [
        function () {
            return {
                restrict: 'E',
                template: '<li role="presentation" data-ng-transclude=""></li>',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);