/**
 * Sidebar of the application
 */
var LayoutSidebarDirective = function LayoutSidebarDirectiveConstructor($location, $partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Layout', 'Sidebar/sidebar.html', true),
        replace: true,
        scope: {},
        link: function sidebarDirectiveLink(scope, element, attrs) {
            scope.currentPath = $location.path(); // Get current path

            // Watch for path changes
            scope.$on('$locationChangeSuccess', function () {
                scope.currentPath = $location.path();
            });
        }
    };
};

// Set up dependency injection
LayoutSidebarDirective.$inject = [ '$location', '$partial' ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutSidebar', LayoutSidebarDirective);