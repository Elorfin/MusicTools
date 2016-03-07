/**
 * Represents the title of a Page
 * @constructor
 */
var LayoutPageTitleDirective = function LayoutPageTitleDirective($client) {
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
};

// Set up dependency injection
LayoutPageTitleDirective.$inject = [ '$client' ];

// Register directive into ANgular JS
angular
    .module('Layout')
    .directive('layoutPageTitle', LayoutPageTitleDirective);