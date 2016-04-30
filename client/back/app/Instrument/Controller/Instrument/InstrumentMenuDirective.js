/**
 * Instrument Menu Controller
 * Manages the top menu for the Instruments of the current User
 *
 * @param {InstrumentResource} InstrumentResource
 * @constructor
 */
var InstrumentMenuController = function InstrumentMenuController(InstrumentResource) {
    this.instrumentResource = InstrumentResource;
    this.instruments = this.instrumentResource.query();
};

InstrumentMenuController.$inject = [ 'InstrumentResource' ];

/**
 * List of Instruments of the current User
 * @type {Array}
 */
InstrumentMenuController.prototype.instruments = [];

/**
 *
 */
InstrumentMenuController.prototype.new = function newResource() {

};

// Register controller into AngularJS
angular
    .module('Instrument')
    .controller('InstrumentMenuController', InstrumentMenuController);
