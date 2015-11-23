/**
 * SongBook Module
 */
angular
    .module('SongBook', [
        'ngFileUpload',
        'Utilities'
    ])
    .config([
        '$translateProvider',
        function($translateProvider) {
            // Inject translations
            for (var lang in songBookTranslations) {
                if (songBookTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, songBookTranslations[lang]);
                }
            }
        }
    ]);