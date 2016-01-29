/**
 * Defines parameters of the Application
 */
angular
    .module('AppConfiguration', [])

    // Set default lang for Localization
    .constant('defaultLang', 'en')

    // Configure API access
    .constant('apiConfiguration', {
        basePath: 'MusicTools/web/app_dev.php'
    })

    // Configure Client
    .constant('clientConfiguration', {
        basePath: 'MusicTools/web'
    });