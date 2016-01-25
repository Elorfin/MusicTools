/**
 * User routes
 */
angular.module('User').config([
    '$routeProvider',
    '$partialProvider',
    function UserRoutes($routeProvider, $partialProvider) {
        // Users list
        $routeProvider
            .when('/users', {
                templateUrl:  $partialProvider.getPath('User', 'list.html'),
                controller:   'ListViewController',
                controllerAs: 'listViewCtrl'
            });

        // Current User profile
        $routeProvider
            .when('/profile', {
                templateUrl:  $partialProvider.getPath('User', 'profile.html'),
                controller:   'ProfileController',
                controllerAs: 'profileCtrl'
            });

        // Current User settings
        $routeProvider
            .when('/profile/settings', {
                templateUrl:  $partialProvider.getPath('User', 'settings.html'),
                controller:   'SettingsController',
                controllerAs: 'settingsCtrl'
            });
    }
]);