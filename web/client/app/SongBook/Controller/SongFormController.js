/**
 * Form controller for Songs
 * @constructor
 */
var SongFormController = function SongFormController(form, Upload, ApiService, $timeout) {
    BaseFormController.apply(this, arguments);

    this.uploadService = Upload;
    this.apiService    = ApiService;
};

// Extends BaseFormController
SongFormController.prototype             = Object.create(BaseFormController.prototype);
SongFormController.prototype.constructor = SongFormController;

SongFormController.prototype.validate = function () {
    var method = 'POST';
    var url    = this.apiService.getServer() + '/songs';
    if (!this.isNew()) {
        method = 'PUT';
        url   += '/' + this.entity.id;
    }

    // Build request
    var requestConfig = {
        url: url,
        method: method,
        data: {
            musictools_songbookbundle_song: this.entity
        }
    };

    // Call server
    this.uploadService.upload(requestConfig).then(
        // Success callback
        function (resp) {
            if (resp.data.form) {
                angular.merge(this.form, resp.data.form);
            }
        }.bind(this),
        // Error callback
        function (resp) {

        }
    );
};

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongFormController', [ 'form', 'Upload', 'ApiService', '$timeout', SongFormController ]);
