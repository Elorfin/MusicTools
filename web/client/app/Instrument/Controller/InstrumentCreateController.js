/**
 * Form controller for Instrument
 * @constructor
 */
var InstrumentCreateController = function InstrumentCreateControllerConstructor(form, Upload, ApiService, $timeout) {
    BaseFormController.apply(this, arguments);

    this.uploadService = Upload;
    this.apiService    = ApiService;
};

// Extends BaseFormController
InstrumentCreateController.prototype             = Object.create(BaseFormController.prototype);
InstrumentCreateController.prototype.constructor = SongFormController;

// Set up dependency injection
InstrumentCreateController.$inject = [ 'form', 'Upload', 'ApiService' ];

InstrumentCreateController.prototype.validate = function () {
    var method = 'POST';
    var url    = this.apiService.getServer() + '/instruments';
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

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentCreateController', InstrumentCreateController);
