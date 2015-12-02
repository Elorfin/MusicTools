/**
 * Instrument routes
 */
angular
    .module('Instrument')
    .config([
        '$routeProvider',
        function InstrumentRoutes($routeProvider) {
            $routeProvider
                // List
                .when('/instruments', {
                    templateUrl:  '../app/Instrument/Partial/index.html',
                    controller:   'InstrumentListController',
                    controllerAs: 'instrumentListCtrl',
                    resolve: {
                        entities: [
                            '$route',
                            'InstrumentResource',
                            function entitiesResolver($route, InstrumentResource) {
                                return InstrumentResource.query();
                            }
                        ]
                    }
                })

                // New form
                .when('/instruments/new', {
                    templateUrl:  '../app/Instrument/Partial/CreateWizard/layout.html',
                    controller:   'InstrumentCreateController',
                    controllerAs: 'instrumentCreateCtrl',
                    resolve: {
                        form: [
                            function formResolver() {
                                return {};
                            }
                        ],
                        instrumentTypes: [
                            'InstrumentResource',
                            function formResolver(InstrumentResource) {
                                return InstrumentResource.query();
                            }
                        ]
                    }
                })

                // Show
                .when('/instruments/:id', {
                    templateUrl:  '../app/Instrument/Partial/show.html',
                    controller:   'InstrumentShowController',
                    controllerAs: 'instrumentShowCtrl',
                    resolve: {
                        entity: [
                            '$route',
                            'InstrumentResource',
                            function entityResolver($route, InstrumentResource) {
                                return InstrumentResource.get($route.current.params.id);
                            }
                        ]
                    }
                });
        }
    ]);