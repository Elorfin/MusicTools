/**
 * SongBook routes
 */
angular
    .module('SongBook')
    .config([
        'resourceRouteProvider',
        function SongBookRoutes(resourceRouteProvider) {
            resourceRouteProvider.register('SongBook', 'Song', 'songs');
        }
    ]);