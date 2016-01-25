/**
 * Application routes
 * Defines all routes for the Application
 */
angular
    .module('App')
    .config([
        '$routeProvider',
        '$partialProvider',
        function AppConfig($routeProvider, $partialProvider) {
            $routeProvider
                // Page not found
                .when('/page_not_found', {
                    templateUrl: $partialProvider.getPath('Error/page_not_found.html', 'Layout', true)
                })

                // Default Server 5xx errors
                .when('/error_server', {
                    templateUrl: $partialProvider.getPath('Error/server.html', 'Layout', true)
                })

                // Redirect to Page not found
                .otherwise({
                    redirectTo: '/page_not_found'
                })
        }
    ]);