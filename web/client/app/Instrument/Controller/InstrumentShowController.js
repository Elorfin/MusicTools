/**
 * Show controller for Instruments
 * @constructor
 */
var InstrumentShowController = function InstrumentShowControllerConstructor(resource) {
    ShowController.apply(this, arguments);
};

// Extends ShowController
InstrumentShowController.prototype = Object.create(ShowController.prototype);
InstrumentShowController.$inject = ShowController.$inject;

/**
 * Current displayed data
 * @type {Object}
 */
InstrumentShowController.prototype.data = null;

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentShowController', InstrumentShowController);
