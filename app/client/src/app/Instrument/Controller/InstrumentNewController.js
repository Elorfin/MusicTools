/**
 * New controller for Instruments
 * @param {Array} instrumentTypes
 * @param {Array} instruments
 * @constructor
 */
var InstrumentNewController = function InstrumentNewController(instrumentTypes, instruments) {
    this.instrumentTypes = instrumentTypes;
    this.instruments     = instruments;
};

// Set up dependency injection
InstrumentNewController.$inject = [ 'instrumentTypes', 'instruments' ];

/**
 * List of available types
 * @type {Array}
 */
InstrumentNewController.prototype.instrumentTypes = [];

/**
 * Generic instruments to use as template
 * @type {Array}
 */
InstrumentNewController.prototype.instruments = [];

/**
 * Selected type
 * @type {Object}
 */
InstrumentNewController.prototype.selectedType = null;

/**
 * Selected instrument
 * @type {Object}
 */
InstrumentNewController.prototype.selectedInstrument = null;

/**
 * Select an InstrumentType
 * @param {Object} type
 */
InstrumentNewController.prototype.selectType = function selectType(type) {
    this.selectedType = type;
};

// Register controller into Angular JS
angular
    .module('Instrument')
    .controller('InstrumentNewController', InstrumentNewController);
