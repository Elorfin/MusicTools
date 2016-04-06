/**
 * Defines parameters of the Application
 */
angular
    .module('AppConfiguration', [])

    // Configure API access
    .constant('apiConfiguration', {
        basePath   : 'MusicTools/web/api_dev.php',
        uploadPath : 'MusicTools/web'
    })

    // Configure Client
    .constant('clientConfiguration', {
        basePath: '/MusicTools/web'
    });