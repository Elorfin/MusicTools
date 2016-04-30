/**
 * Application Core
 * Manages low level application components such as API, translations, etc.
 */
angular
    // Initialize Core
    .module('AppCore', [
        // Angular modules
        'ngRoute',
        'ngAnimate',
        'ngSanitize',

        // Libraries modules
        'ngFileUpload',
        'ui.bootstrap',
        'pascalprecht.translate',

        // Configuration of the Application
        'AppConfiguration',

        // Core modules
        'Utilities',
        'Confirm',
        'Api',
        'Client',
        'Layout',
        'Alert'
    ])

    // Configure Core
    .config([
        '$apiProvider',
        'apiConfiguration',
        '$clientProvider',
        'clientConfiguration',
        '$translateProvider',
        function configure($apiProvider, apiConfiguration, $clientProvider, clientConfiguration, $translateProvider) {
            // Configure API
            $apiProvider.configure(apiConfiguration);

            // Configure Client
            $clientProvider.configure(clientConfiguration);

            // Enable pluralization for translator
            $translateProvider.addInterpolation('$translateMessageFormatInterpolation');

            // Set the default lang
            $translateProvider.preferredLanguage('en');

            // Set sanitize strategy for translations
            $translateProvider.useSanitizeValueStrategy('sanitize');
        }
    ]);