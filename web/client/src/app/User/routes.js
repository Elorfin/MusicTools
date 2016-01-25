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
                templateUrl:  $partialProvider.getPath('list.html', 'User'),
                controller:   'ListViewController',
                controllerAs: 'listViewCtrl'
            });

        // Current User profile
        $routeProvider
            .when('/profile', {
                templateUrl:  $partialProvider.getPath('profile.html', 'User'),
                controller:   'ProfileController',
                controllerAs: 'profileCtrl'
            });

        // Current User settings
        $routeProvider
            .when('/profile/settings', {
                templateUrl:  $partialProvider.getPath('settings.html', 'User'),
                controller:   'SettingsController',
                controllerAs: 'settingsCtrl'
            });
    }
]);