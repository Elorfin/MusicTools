/**
 * Workspace Application routes
 * Defines all routes for the Application
 */
angular
    .module('MusicTools')
    .config([
        '$routeProvider',
        function MusicToolsConfig($routeProvider) {
            $routeProvider
                // Page not found
                .when('/page_not_found', {
                    templateUrl:  '../app/Layout/Partial/Error/page_not_found.html'
                })

                // Default Server 5xx errors
                .when('/error_server', {
                    templateUrl:  '../app/Layout/Partial/Error/server.html'
                })

                // Redirect to Page not found
                .otherwise({
                    redirectTo: '/page_not_found'
                })
        }
    ]);