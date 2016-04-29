/**
 * Instrument Module
 */
angular
    .module('Instrument', [
        'Utilities',
        'InstrumentVisualization',
        'Tuning'
    ])
    .config([
        '$translateProvider',
        function($translateProvider) {
            // Inject translations
            for (var lang in instrumentTranslations) {
                if (instrumentTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, instrumentTranslations[lang]);
                }
            }
        }
    ]);

