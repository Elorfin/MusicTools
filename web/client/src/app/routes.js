/**
 * Application routes
 * Defines all routes for the Application
 */
angular
    .module('App')
    .config([
        '$routeProvider',
        '$clientProvider',
        function AppConfig($routeProvider, $clientProvider) {
            $routeProvider
                // Page not found
                .when('/page_not_found', {
                    templateUrl: $clientProvider.getPartial('Error/page_not_found.html', 'core/Layout', true)
                })

                // Default Server 5xx errors
                .when('/error_server', {
                    templateUrl: $clientProvider.getPartial('Error/server.html', 'core/Layout', true)
                })

                // Redirect to Page not found
                .otherwise({
                    redirectTo: '/page_not_found'
                })
        }
    ]);