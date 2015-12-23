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
                        resources: [
                            'InstrumentResource',
                            function resourcesResolver(InstrumentResource) {
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
                        resource: [
                            function resourceResolver() {
                                return {};
                            }
                        ],
                        instrumentTypes: [
                            'InstrumentTypeResource',
                            function instrumentTypesResolver(InstrumentTypeResource) {
                                return InstrumentTypeResource.query();
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
                        resource: [
                            '$route',
                            'InstrumentResource',
                            function resourceResolver($route, InstrumentResource) {
                                return InstrumentResource.get({ id: $route.current.params.id });
                            }
                        ]
                    }
                });
        }
    ]);