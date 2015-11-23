/**
 * Theory Module
 */
angular
    .module('Theory', [])
    .config([
        '$translateProvider',
        function($translateProvider) {
            // Inject translations
            for (var lang in theoryTranslations) {
                if (theoryTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, theoryTranslations[lang]);
                }
            }
        }
    ]);