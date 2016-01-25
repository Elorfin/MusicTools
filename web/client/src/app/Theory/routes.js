/**
 * Theory routes
 */
angular
    .module('Theory')
    .config([
        '$routeProvider',
        '$partialProvider',
        'apiResourceRouteProvider',
        function TheoryRoutes($routeProvider, $partialProvider, apiResourceRouteProvider) {
            // Theory summary
            $routeProvider.when('/theory', {
                templateUrl: $partialProvider.getPath('Theory', 'summary.html')
            });

            apiResourceRouteProvider.register('Theory', 'Note',     'theory/notes',     true);
            apiResourceRouteProvider.register('Theory', 'Degree',   'theory/degrees',   true);
            apiResourceRouteProvider.register('Theory', 'Interval', 'theory/intervals', true);
            apiResourceRouteProvider.register('Theory', 'Chord',    'theory/chords',    true);
            apiResourceRouteProvider.register('Theory', 'Scale',    'theory/scales',    true);
        }
    ]);