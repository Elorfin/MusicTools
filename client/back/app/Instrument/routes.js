/**
 * Instrument routes
 */
angular
    .module('Instrument')
    .config([
        'apiResourceRouteProvider',
        function InstrumentRoutes(apiResourceRouteProvider) {
            apiResourceRouteProvider.register('Instrument', 'Instrument', 'instruments', true, {
                // Add the list of InstrumentType to the NEW routes resolvers
                show: {
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