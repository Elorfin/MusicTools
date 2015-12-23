/**
 * SongBook routes
 */
angular.module('SongBook').config([
    '$routeProvider',
    function SongBookRoutes($routeProvider) {
        $routeProvider
            // List
            .when('/songs', {
                templateUrl:  '../app/SongBook/Partial/index.html',
                controller:   'SongListController',
                controllerAs: 'songListCtrl',
                resolve: {
                    resources: [
                        '$route',
                        'SongResource',
                        function resourcesResolver($route, SongResource) {
                            return SongResource.query();
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
                    resource: [
                        function resourceResolver() {
                            return {};
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
                    resource: [
                        '$route',
                        'SongResource',
                        function resourceResolver($route, SongResource) {
                            return SongResource.get({ id: $route.current.params.id });
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
                    resource: [
                        '$route',
                        'SongResource',
                        function resourceResolver($route, SongResource) {
                            return SongResource.get({ id: $route.current.params.id });
                        }
                    ]
                }
            });
    }
]);