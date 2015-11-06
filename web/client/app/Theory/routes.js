/**
 * Theory routes
 */
angular.module('Theory').config([
    '$routeProvider',
    function TheoryRoutes($routeProvider) {
        $routeProvider
            .when('/theory', {
                templateUrl:  '../app/Theory/Partial/index.html'
            });
    }
]);