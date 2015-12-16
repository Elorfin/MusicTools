/**
 * Form controller for Songs
 * @constructor
 */
var SongFormController = function SongFormControllerConstructor(data, SongResource, Upload) {
    FormController.apply(this, arguments);

    this.upload = Upload;
};

// Extends FormController
SongFormController.prototype             = Object.create(FormController.prototype);
SongFormController.prototype.constructor = SongFormController;

// Set up dependency injection
SongFormController.$inject = [ 'data', 'SongResource', 'Upload' ];

SongFormController.prototype.selectCover = function (file) {
    // Convert file to Base 64
    this.upload.base64DataUrl(file).then(function(url){
        this.data.cover.file = url;
    }.bind(this));
};

// Register controller into Angular JS
angular
    .module('SongBook')
    .controller('SongFormController', SongFormController);
