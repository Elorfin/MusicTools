/**
 * Represents the title of a Page
 */
angular
    .module('Layout')
    .directive('layoutPageTitle', [
        '$partial',
        function LayoutPageTitleDirective($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Page/title.html', 'Layout', true),
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