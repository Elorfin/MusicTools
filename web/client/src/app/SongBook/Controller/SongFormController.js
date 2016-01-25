/**
 * Form controller for Songs
 * @constructor
 */
var SongFormController = function SongFormController(resource, SongResource, Upload) {
    FormController.apply(this, arguments);

    this.upload = Upload;
};

// Extends FormController
SongFormController.prototype             = Object.create(FormController.prototype);
SongFormController.prototype.constructor = SongFormController;

// Set up dependency injection
SongFormController.$inject = [ 'resource', 'SongResource', 'Upload' ];

SongFormController.prototype.selectCover = function selectCover(file) {
    if (!this.resource.cover) {
        this.resource.cover = {};
    }

    // Convert file to Base 64
    this.upload.base64DataUrl(file).then(function (url) {
        this.resource.cover.file = url;
    }.bind(this));
};

SongFormController.prototype.removeCover = function removeCover() {
    this.resource.cover = null;
};

// Register controller into Angular JS
angular
    .module('SongBook')
    .controller('SongFormController', SongFormController);
