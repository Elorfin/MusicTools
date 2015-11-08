/**
 * Workspace Application Root
 * Initializes needed modules in the Angular application
 */
angular
    .module('MusicTools', [
        // Angular modules
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngResource',

        // Libraries modules
        'ngFileUpload',
        'ui.bootstrap',
        'pascalprecht.translate',
        'angular-loading-bar',

        // Core modules
        'Utilities',
        'Layout',
        'Form',
        'Alert',

        // App modules
        'Advertisement',
        'Badge',
        'Forum',
        'Game',
        'Instrument',
        'Lesson',
        'SongBook',
        'Theory',
        'Tuning',
        'User'

        /*'Note',
        'Guitar',
        'GuitarNeck',
        'SheetMusic'*/
    ])
    .config([
        '$translateProvider',
        'cfpLoadingBarProvider',
        function($translateProvider, cfpLoadingBarProvider) {
            // Inject translations
            for (var lang in appTranslations) {
                if (appTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, appTranslations[lang]);
                }
            }

            // Set the default lang
            $translateProvider.preferredLanguage('en');

            // Set sanitize strategy for translations
            $translateProvider.useSanitizeValueStrategy('sanitize');

            // Disable loading spinner
            cfpLoadingBarProvider.includeSpinner = false;
        }
    ]);