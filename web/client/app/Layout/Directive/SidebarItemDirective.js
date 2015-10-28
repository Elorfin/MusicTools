/**
 * Sidebar of the application
 */
angular
    .module('Layout')
    .directive('layoutSidebarItem', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/sidebar-item.html',
                replace: true,
                scope: {
                    icon  : '@',
                    label : '@',
                    url   : '@'
                },
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);