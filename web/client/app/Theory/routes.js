/**
 * Theory routes
 */
angular
    .module('Theory')
    .config([
        '$routeProvider',
        function TheoryRoutes($routeProvider) {
            $routeProvider
                // Theory summary
                .when('/theory', {
                    templateUrl:  '../app/Theory/Partial/summary.html'
                })

                // List of Intervals
                .when('/theory/intervals', {
                    templateUrl:  '../app/Theory/Partial/Interval/index.html',
                    controller:   'IntervalListController',
                    controllerAs: 'intervalListCtrl',
                    resolve: {
                        entities: [
                            '$route',
                            'IntervalResource',
                            function entitiesResolver($route, IntervalResource) {
                                return IntervalResource.query();
                            }
                        ]
                    }
                })

                // List of notes
                .when('/theory/notes', {
                    templateUrl:  '../app/Theory/Partial/Note/index.html',
                    controller:   'NoteListController',
                    controllerAs: 'noteListCtrl',
                    resolve: {
                        entities: [
                            '$route',
                            'NoteResource',
                            function entitiesResolver($route, NoteResource) {
                                return NoteResource.query();
                            }
                        ]
                    }
                })
        }
    ]);