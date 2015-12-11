/**
 * Form controller for Songs
 * @constructor
 */
var SongFormController = function SongFormControllerConstructor(data, SongResource) {
    BaseFormController.apply(this, arguments);
};

// Extends BaseFormController
SongFormController.prototype             = Object.create(BaseFormController.prototype);
SongFormController.prototype.constructor = SongFormController;

// Set up dependency injection
SongFormController.$inject = [ 'data', 'SongResource' ];

// Register controller into Angular JS
angular
    .module('SongBook')
    .controller('SongFormController', SongFormController);
