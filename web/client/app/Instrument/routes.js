/**
 * Instrument routes
 */
angular.module('Instrument').config([
    '$routeProvider',
    function InstrumentRoutes($routeProvider) {
        // List route
        $routeProvider
            .when('/instruments', {
                templateUrl:  '../app/Instrument/Partial/list.html',
                controller:   'ListViewController',
                controllerAs: 'listViewCtrl'
            });
    }
]);