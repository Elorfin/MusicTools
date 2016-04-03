/**
 * Api Module
 * Manages communication with a REST API server following the JSON API specification
 */
angular
    .module('Api', [
        'Client'
    ])
    .config([
        '$httpProvider',
        function configure($httpProvider) {
            // Register API Error interceptor
            // Set up Http Error interceptor to catch server error response
            $httpProvider.interceptors.push('ApiErrorInterceptor');
        }
    ]);