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
        'Lesson',
        'SongBook',
        'Theory',
        'Tuning',
        'User'
    ])

    // Configure Application
    .config([
        '$translateProvider',
        function configure($translateProvider) {
            // Inject translations
            for (var lang in appTranslations) {
                if (appTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, appTranslations[lang]);
                }
            }
        }
    ]);