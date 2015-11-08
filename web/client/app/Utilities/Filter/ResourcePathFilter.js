/**
 * Resource Path filter
 */
angular
    .module('Utilities')
    .filter('resource_path', [
        'ApiService',
        function (ApiService) {
            return function (path) {
                return ApiService.getResourcePath() + path;
            };
        }
    ]
);