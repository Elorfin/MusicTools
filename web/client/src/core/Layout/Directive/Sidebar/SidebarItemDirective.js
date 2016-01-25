/**
 * Represents a link in the sidebar
 */
var LayoutSidebarItemDirective = function LayoutSidebarItemDirective($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Sidebar/sidebar-item.html', 'Layout', true),
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
LayoutSidebarItemDirective.$inject = [ '$partial' ];

// Register into AngularJS
angular
    .module('Layout')
    .directive('layoutSidebarItem', LayoutSidebarItemDirective);