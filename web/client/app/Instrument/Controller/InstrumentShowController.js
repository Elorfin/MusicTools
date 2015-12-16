/**
 * Show controller for Instruments
 * @constructor
 */
var InstrumentShowController = function InstrumentShowControllerConstructor(data) {
    this.data = data;
};

// Set up dependency injection
InstrumentShowController.$inject = [ 'data' ];

/**
 * Current displayed data
 * @type {Object}
 */
InstrumentShowController.prototype.data = null;

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentShowController', InstrumentShowController);
