/**
 * Represents the title of a Page
 */
angular
    .module('Layout')
    .directive('layoutPageTitle', [
        function LayoutPageTitleDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Page/title.html',
                replace: true,
                transclude: true,
                scope: {
                    /**
                     * If true, the title is hidden with the `sr-only` class
                     */
                    hideTitle: '@'
                }
            };
        }
    ]);