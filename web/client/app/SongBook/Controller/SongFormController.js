/**
 * Form controller for Songs
 * @constructor
 */
var SongFormController = function SongFormControllerConstructor(form, Upload, ApiService) {
    BaseFormController.apply(this, arguments);

    this.uploadService = Upload;
    this.apiService    = ApiService;
};

// Extends BaseFormController
SongFormController.prototype             = Object.create(BaseFormController.prototype);
SongFormController.prototype.constructor = SongFormController;

// Set up dependency injection
SongFormController.$inject = [ 'form', 'Upload', 'ApiService' ];

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
        function onServerSuccess(resp) {
            if (resp.data.form) {
                angular.merge(this.form, resp.data.form);
            }
        }.bind(this),
        // Error callback
        function onServerError(resp) {

        }
    );
};

// Register controller into Angular JS
angular
    .module('SongBook')
    .controller('SongFormController', SongFormController);
