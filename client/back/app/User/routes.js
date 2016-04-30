/**
 * User routes
 */
angular.module('User').config([
    '$routeProvider',
    '$clientProvider',
    function UserRoutes($routeProvider, $clientProvider) {
        // Users list
        $routeProvider
            .when('/users', {
                templateUrl:  $clientProvider.getPartial('list.html', 'app/User'),
                controller:   'ListViewController',
                controllerAs: 'listViewCtrl'
            });

        // Current User profile
        $routeProvider
            .when('/profile', {
                templateUrl:  $clientProvider.getPartial('profile.html', 'app/User'),
                controller:   'ProfileController',
                controllerAs: 'profileCtrl'
            });

        // Current User settings
        $routeProvider
            .when('/profile/settings', {
                templateUrl:  $clientProvider.getPartial('settings.html', 'app/User'),
                controller:   'SettingsController',
                controllerAs: 'settingsCtrl'
            });
    }
]);