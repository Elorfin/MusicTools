/**
 * SongBook routes
 */
angular
    .module('SongBook')
    .config([
        'apiResourceRouteProvider',
        function SongBookRoutes(apiResourceRouteProvider) {
            apiResourceRouteProvider.register('SongBook', 'Song', 'songs');
        }
    ]);