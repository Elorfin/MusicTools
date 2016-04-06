/**
 * Instrument routes
 */
angular
    .module('Instrument')
    .config([
        'apiResourceRouteProvider',
        function InstrumentRoutes(apiResourceRouteProvider) {
            apiResourceRouteProvider.register('Instrument', 'Instrument', 'instruments', false, {
                // Add the list of InstrumentType to the NEW routes resolvers
                new: {
                    resolve: {
                        instrumentTypes: [
                            'InstrumentTypeResource',
                            function instrumentTypesResolver(InstrumentTypeResource) {
                                return InstrumentTypeResource.query();
                            }
                        ]
                    }
                },
                edit: {
                    resolve: {
                        instrumentTypes: [
                            'InstrumentTypeResource',
                            function instrumentTypesResolver(InstrumentTypeResource) {
                                return InstrumentTypeResource.query();
                            }
                        ]
                    }
                }
            });
        }
    ]);