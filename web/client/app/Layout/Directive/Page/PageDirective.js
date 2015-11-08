/**
 * Represents a page of the application
 */
angular
    .module('Layout')
    .directive('layoutPage', [
        function LayoutPageDirective() {
            return {
                restrict: 'E',
                template: '<div class="container-fluid" data-ng-transclude=""></div>',
                replace: true,
                transclude: true
            };
        }
    ]);