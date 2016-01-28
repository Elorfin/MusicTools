/**
 * Application Root
 * Initializes needed modules in the Angular application
 */
angular
    .module('App', [
        'AppCore',

        'Advertisement',
        'Badge',
        'Forum',
        'Game',
        'Instrument',
        'GuitarNeck',
        'Lesson',
        'SongBook',
        'Theory',
        'Tuning',
        'User'
        // 'Guitar',
        // 'SheetMusic'
    ])
    .config([
        '$httpProvider',
        '$translateProvider',
        '$serverProvider',
        'cfpLoadingBarProvider',
        function configure($httpProvider, $serverProvider, $translateProvider, cfpLoadingBarProvider) {
            // Set up Http Error interceptor to catch server error response
            $httpProvider.interceptors.push('HttpErrorService');

            // Configure server
            $serverProvider.configure({
                api       : 'http://localhost/MusicTools/web/app_dev.php',
                resources : '/MusicTools/web/',
                assets    : '/MusicTools/web/client/public/'
            });

            $serverProvider.setApi('http://localhost/MusicTools/web/app_dev.php');
            $serverProvider.setResource('http://localhost/MusicTools/web/app_dev.php');
            $serverProvider.setAsset('http://localhost/MusicTools/web/app_dev.php');
            $serverProvider.setPartial('');

            // Inject translations
            for (var lang in appTranslations) {
                if (appTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, appTranslations[lang]);
                }
            }

            // Enable pluralization for translator
            $translateProvider.addInterpolation('$translateMessageFormatInterpolation');

            // Set the default lang
            $translateProvider.preferredLanguage('en');

            // Set sanitize strategy for translations
            $translateProvider.useSanitizeValueStrategy('sanitize');

            // Disable loading spinner
            cfpLoadingBarProvider.includeSpinner = false;
        }
    ]);