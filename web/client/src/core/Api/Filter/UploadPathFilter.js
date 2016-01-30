/**
 * Upload Path filter
 */
var UploadPathFilter = function UploadPathFilter($api) {
    return function upload_path(path) {
        return $api.getUpload(path);
    };
};

// Set up dependency injection
UploadPathFilter.$inject = [ '$api' ];

// Register filter into Angular JS
angular
    .module('Api')
    .filter('upload_path', UploadPathFilter);
