/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('uiHeaderButtons', [
        function HeaderButtonsDirective() {
            return {
                restrict: 'E',
                template: '<nav class="ui-header-buttons navbar navbar-default"><ul class=" nav navbar-nav" data-ng-transclude=""></ul></nav>',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);