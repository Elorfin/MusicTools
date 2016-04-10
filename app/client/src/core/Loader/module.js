/**
 * Loader module
 * Manages visual loading progress when XHR
 */
angular
    .module('Loader', [
        'ngAnimate'
    ])
    .config([
        '$httpProvider',
        function configureLoader($httpProvider) {
            // Set up Http interceptor to catch XHR
            $httpProvider.interceptors.push('LoaderInterceptor');
        }
    ]);