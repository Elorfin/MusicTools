/**
 * Game routes
 */
angular.module('Game').config([
    '$routeProvider',
    function GameRoutes($routeProvider) {
        $routeProvider
            // List
            .when('/games', {
                templateUrl:  '../app/Game/Partial/index.html',
                controller:   'GameListController',
                controllerAs: 'gameListCtrl',
                resolve: {
                    resources: [
                        '$route',
                        'GameResource',
                        function resourcesResolver($route, GameResource) {
                            return GameResource.query();
                        }
                    ]
                }
            })
    }
]);