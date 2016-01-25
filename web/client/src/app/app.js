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
        'cfpLoadingBarProvider',
        function configure($httpProvider, $translateProvider, cfpLoadingBarProvider) {
            // Set up Http Error interceptor to catch server error response
            $httpProvider.interceptors.push('HttpErrorService');

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