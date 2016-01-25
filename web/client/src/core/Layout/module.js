/**
 * Layout Module
 * Contains all the tools for building the Layout of the application (header, sidebar, etc.)
 */
angular
    .module('Layout', [
        'ui.bootstrap'
    ])
    .config([
        '$translateProvider',
        function($translateProvider) {
            // Inject translations
            for (var lang in layoutTranslations) {
                if (layoutTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, layoutTranslations[lang]);
                }
            }
        }
    ]);