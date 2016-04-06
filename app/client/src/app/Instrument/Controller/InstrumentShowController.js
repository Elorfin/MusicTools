/**
 * Show controller for Instruments
 * @constructor
 */
var InstrumentShowController = function InstrumentShowController(resource) {
    ShowController.apply(this, arguments);
};

// Extends ShowController
InstrumentShowController.prototype = Object.create(ShowController.prototype);
InstrumentShowController.$inject = ShowController.$inject;

/**
 * Current displayed Resource
 * @type {Object}
 */
InstrumentShowController.prototype.resource = null;

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentShowController', InstrumentShowController);
