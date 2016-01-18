/**
 * Theory routes
 */
angular
    .module('Theory')
    .config([
        '$routeProvider',
        'resourceRouteProvider',
        function TheoryRoutes($routeProvider, resourceRouteProvider) {
            // Theory summary
            $routeProvider.when('/theory', {
                templateUrl:  '../app/Theory/Partial/summary.html'
            });

            resourceRouteProvider.register('Theory', 'Note',     'theory/notes',     true);
            resourceRouteProvider.register('Theory', 'Degree',   'theory/degrees',   true);
            resourceRouteProvider.register('Theory', 'Interval', 'theory/intervals', true);
            resourceRouteProvider.register('Theory', 'Chord',    'theory/chords',    true);
            resourceRouteProvider.register('Theory', 'Scale',    'theory/scales',    true);
        }
    ]);