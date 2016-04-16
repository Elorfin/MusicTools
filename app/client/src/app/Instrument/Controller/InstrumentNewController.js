/**
 * New controller for Instruments
 * @constructor
 */
var InstrumentNewController = function InstrumentNewController(instrumentTypes) {
    this.instrumentTypes = instrumentTypes;
};

// Set up dependency injection
InstrumentNewController.$inject = [ 'instrumentTypes' ];

/**
 * List of available types
 * @type {Array}
 */
InstrumentNewController.prototype.instrumentTypes = [];

/**
 * Selected type
 * @type {Object}
 */
InstrumentNewController.prototype.selectedType = null;

/**
 * Select an InstrumentType
 * @param {Object} type
 */
InstrumentNewController.prototype.selectType = function selectType(type) {
    console.log(type);
    this.selectedType = type;
};

// Register controller into Angular JS
angular
    .module('Instrument')
    .controller('InstrumentNewController', InstrumentNewController);
