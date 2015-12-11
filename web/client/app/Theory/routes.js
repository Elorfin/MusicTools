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
                            'IntervalResource',
                            function entitiesResolver(IntervalResource) {
                                return IntervalResource.query();
                            }
                        ]
                    }
                })

                // List of Notes
                .when('/theory/notes', {
                    templateUrl:  '../app/Theory/Partial/Note/index.html',
                    controller:   'NoteListController',
                    controllerAs: 'noteListCtrl',
                    resolve: {
                        entities: [
                            'NoteResource',
                            function entitiesResolver(NoteResource) {
                                return NoteResource.query();
                            }
                        ]
                    }
                })

                // List of Degrees
                .when('/theory/degrees', {
                    templateUrl:  '../app/Theory/Partial/Degree/index.html',
                    controller:   'DegreeListController',
                    controllerAs: 'degreeListCtrl',
                    resolve: {
                        entities: [
                            'DegreeResource',
                            function entitiesResolver(DegreeResource) {
                                return DegreeResource.query();
                            }
                        ]
                    }
                })

                // List of Chords
                .when('/theory/chords', {
                    templateUrl:  '../app/Theory/Partial/Chord/index.html',
                    controller:   'ChordListController',
                    controllerAs: 'chordListCtrl',
                    resolve: {
                        entities: [
                            'ChordResource',
                            function entitiesResolver(ChordResource) {
                                return ChordResource.query();
                            }
                        ]
                    }
                })

                // Show a chord
                .when('/theory/chords/:id', {
                    templateUrl:  '../app/Theory/Partial/Chord/show.html',
                    controller:   'ChordShowController',
                    controllerAs: 'chordShowCtrl',
                    resolve: {
                        entity: [
                            '$route',
                            'ChordResource',
                            function entityResolver($route, ChordResource) {
                                return ChordResource.get({ id: $route.current.params.id });
                            }
                        ],
                        notes: [
                            'NoteResource',
                            function notesResolver(NoteResource) {
                                return NoteResource.query();
                            }
                        ]
                    }
                })

                // List of Scales
                .when('/theory/scales', {
                    templateUrl:  '../app/Theory/Partial/Scale/index.html',
                    controller:   'ScaleListController',
                    controllerAs: 'scaleListCtrl',
                    resolve: {
                        entities: [
                            'ScaleResource',
                            function entitiesResolver(ScaleResource) {
                                return ScaleResource.query();
                            }
                        ]
                    }
                });
        }
    ]);