/**
 * Tuning module
 */
angular
    .module('Tuning', [])
    .config([
        '$translateProvider',
        function configureTuning($translateProvider) {
            // Inject translations
            for (var lang in tuningTranslations) {
                if (tuningTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, tuningTranslations[lang]);
                }
            }
        }
    ]);