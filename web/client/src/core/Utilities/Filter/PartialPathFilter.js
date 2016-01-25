/**
 * Partial Path filter
 */
angular
    .module('Utilities')
    .filter('partial_path', [
        '$partial',
        function ($partial) {
            return function (path, module, isCore) {
                return $partial.getPath(path, module, isCore);
            };
        }
    ]);