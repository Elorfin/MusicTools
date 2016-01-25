/**
 *
 */
angular
    .module('AppCore', [
        // Angular modules
        'ngRoute',
        'ngAnimate',
        'ngSanitize',

        // Libraries modules
        'ngFileUpload',
        'ui.bootstrap',
        'pascalprecht.translate',
        'angular-loading-bar',

        'Utilities',
        'ApiResource',
        'Layout',
        'Alert'
    ]);