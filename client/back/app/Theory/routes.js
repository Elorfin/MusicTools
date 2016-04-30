/**
 * Theory routes
 */
angular
    .module('Theory')
    .config([
        '$routeProvider',
        '$clientProvider',
        'apiResourceRouteProvider',
        function TheoryRoutes($routeProvider, $clientProvider, apiResourceRouteProvider) {
            // Theory summary
            $routeProvider.when('/theory', {
                templateUrl: $clientProvider.getPartial('summary.html', 'app/Theory')
            });

            apiResourceRouteProvider.register('Theory', 'Note',     'theory/notes',     true);
            apiResourceRouteProvider.register('Theory', 'Degree',   'theory/degrees',   true);
            apiResourceRouteProvider.register('Theory', 'Interval', 'theory/intervals', true);
            apiResourceRouteProvider.register('Theory', 'Chord',    'theory/chords',    true);
            apiResourceRouteProvider.register('Theory', 'Scale',    'theory/scales',    true);
        }
    ]);