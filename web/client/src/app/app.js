/**
 * Application Root
 * Initializes needed modules in the Angular application
 */
angular
    // Initialize Application
    .module('App', [
        // Load Configuration
        'AppConfiguration',

        // Load Core features
        'AppCore',

        // Load modules
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
    ])

    // Configure Application
    .config([
        '$httpProvider',
        '$translateProvider',
        function configure($httpProvider, $translateProvider) {
            // Set up Http Error interceptor to catch server error response
            $httpProvider.interceptors.push('HttpErrorService');

            // Inject translations
            for (var lang in appTranslations) {
                if (appTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, appTranslations[lang]);
                }
            }
        }
    ]);