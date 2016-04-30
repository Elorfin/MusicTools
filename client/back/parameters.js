/**
 * Defines parameters of the Application
 */
angular
    .module('AppConfiguration', [])

    // Configure API access
    .constant('apiConfiguration', {
        basePath   : 'MusicTools/api/web/api_dev.php',
        uploadPath : 'MusicTools/api/web'
    })

    // Configure Client
    .constant('clientConfiguration', {
        basePath: '/MusicTools/client/public/dist'
    });