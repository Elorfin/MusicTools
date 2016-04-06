/**
 * Game routes
 */
angular
    .module('Game')
    .config([
        'apiResourceRouteProvider',
        function GameRoutes(apiResourceRouteProvider) {
            apiResourceRouteProvider.register('Game', 'Game', 'games', true);
        }
    ]);