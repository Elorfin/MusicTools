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
                    entities: [
                        '$route',
                        'SongResource',
                        function entitiesResolver($route, SongResource) {
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
                    form: [
                        'ApiService',
                        '$http',
                        '$q',
                        function formResolver(ApiService, $http, $q) {
                            var deferred = $q.defer();

                            $http
                                .get(ApiService.getServer() + '/songs/new')
                                .success(function (response) {
                                    deferred.resolve(response);
                                })
                                .error(function (response) {
                                    deferred.reject(response);
                                });

                            return deferred.promise;
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
                        'SongResource',
                        function entityResolver($route, SongResource) {
                            return SongResource.get($route.current.params.id);
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
                    form: [
                        'ApiService',
                        '$route',
                        '$http',
                        '$q',
                        function formResolver(ApiService, $route, $http, $q) {
                            var deferred = $q.defer();

                            $http
                                .get(ApiService.getServer() + '/songs/' + $route.current.params.id + '/edit')
                                .success(function (response) {
                                    deferred.resolve(response);
                                })
                                .error(function (response) {
                                    deferred.reject(response);
                                });

                            return deferred.promise;
                        }
                    ]
                }
            });
    }
]);