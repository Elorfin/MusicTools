/**
 * User routes
 */
angular.module('User').config([
    '$routeProvider',
    function UserRoutes($routeProvider) {
        // Users list
        $routeProvider
            .when('/users', {
                templateUrl:  '../app/User/Partial/list.html',
                controller:   'ListViewController',
                controllerAs: 'listViewCtrl'
            });

        // Current User profile
        $routeProvider
            .when('/profile', {
                templateUrl:  '../app/User/Partial/profile.html',
                controller:   'ProfileController',
                controllerAs: 'profileCtrl'
            });

        // Current User settings
        $routeProvider
            .when('/profile/settings', {
                templateUrl:  '../app/User/Partial/settings.html',
                controller:   'SettingsController',
                controllerAs: 'settingsCtrl'
            });
    }
]);