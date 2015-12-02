/**
 * Show controller for Instruments
 * @constructor
 */
var InstrumentShowController = function InstrumentShowControllerConstructor(entity) {
    this.entity = entity;
};

// Set up dependency injection
InstrumentShowController.$inject = [ 'entity' ];

/**
 * Current displayed entity
 * @type {Object}
 */
InstrumentShowController.prototype.entity = null;

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentShowController', InstrumentShowController);
