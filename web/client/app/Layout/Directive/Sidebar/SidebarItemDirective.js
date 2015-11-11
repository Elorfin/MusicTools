/**
 * Represents a link in the sidebar
 */
angular
    .module('Layout')
    .directive('layoutSidebarItem', [
        '$route',
        function LayoutSidebarItemDirective($route) {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Sidebar/sidebar-item.html',
                replace: true,
                scope: {
                    icon  : '@',
                    label : '@',
                    url   : '@'
                },
                link: function (scope, element, attrs) {
                    scope.current = false;
                    if ($route.current && $route.current.regexp) {
                        scope.current = $route.current.regexp.test(scope.url);
                    }
                }
            };
        }
    ]);