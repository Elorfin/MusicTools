/**
 * Sidebar of the application
 */
angular
    .module('Layout')
    .directive('layoutSidebar', [
        function LayoutSidebarDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Sidebar/sidebar.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);