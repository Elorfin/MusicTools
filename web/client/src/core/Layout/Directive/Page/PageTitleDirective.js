/**
 * Represents the title of a Page
 */
angular
    .module('Layout')
    .directive('layoutPageTitle', [
        '$client',
        function LayoutPageTitleDirective($client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('Page/title.html', 'core/Layout'),
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