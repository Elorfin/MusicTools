/**
 * Asset Path filter
 */
angular
    .module('Utilities')
    .filter('asset_path', [
        'ApiService',
        function (ApiService) {
            return function (path) {
                return ApiService.getAssetPath() + path;
            };
        }
    ]);