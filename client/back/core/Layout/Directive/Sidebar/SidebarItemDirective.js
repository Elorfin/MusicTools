/**
 * Represents a link in the sidebar
 */
var LayoutSidebarItemDirective = function LayoutSidebarItemDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('Sidebar/sidebar-item.html', 'core/Layout'),
        replace: true,
        scope: {
            icon       : '@',
            label      : '@',
            url        : '@',
            currentPath: '='
        },
        link: function sidebarItemLink(scope, element, attrs) {
            // Watch current path changes
            scope.$watch('currentPath', function () {
                scope.current = (scope.currentPath && 0 === scope.currentPath.indexOf(scope.url));
            });
        }
    };
};

// Set up dependency injection
LayoutSidebarItemDirective.$inject = [ '$client' ];

// Register into AngularJS
angular
    .module('Layout')
    .directive('layoutSidebarItem', LayoutSidebarItemDirective);