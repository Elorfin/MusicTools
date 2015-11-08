/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('layoutPageButtons', [
        function LayoutPageButtonsDirective() {
            return {
                restrict: 'E',
                template: '<nav class="page-buttons navbar navbar-default"><ul class=" nav navbar-nav" data-ng-transclude=""></ul></nav>',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);