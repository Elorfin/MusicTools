/**
 * SongBook routes
 */
angular.module('SongBook').config([
    '$routeProvider',
    function SongBookRoutes($routeProvider) {
        $routeProvider
            // List
            .when('/songs', {
                templateUrl:  '../app/SongBook/Partial/list.html',
                controller:   'SongListController',
                controllerAs: 'songListCtrl',
                resolve: {
                    entities: [
                        '$route',
                        'Song',
                        function entitiesResolver($route, Song) {
                            return Song.query();
                        }
                    ]
                }
            })

            // New form
            .when('/songs/new', {
                templateUrl:  '../app/SongBook/Partial/form.html',
                controller:   'SongFormController',
                controllerAs: 'songFormCtrl',
                resolve: {
                    entity: [
                        'Song',
                        function entityResolver(Song) {
                            return new Song();
                        }
                    ]
                }
            })

            // Show
            .when('/songs/:id', {
                templateUrl:  '../app/SongBook/Partial/show.html',
                controller:   'SongShowController',
                controllerAs: 'songShowCtrl',
                resolve: {
                    entity: [
                        '$route',
                        'Song',
                        function entityResolver($route, Song) {
                            return Song.get({ id: $route.current.params.id });
                        }
                    ]
                }
            })

            // Edit form
            .when('/songs/:id/edit', {
                templateUrl:  '../app/SongBook/Partial/form.html',
                controller:   'SongFormController',
                controllerAs: 'songFormCtrl',
                resolve: {
                    entity: [
                        '$route',
                        'Song',
                        function entityResolver($route, Song) {
                            return Song.get({ id: $route.current.params.id });
                        }
                    ]
                }
            });
    }
]);