/**
 * Instrument Type Resource
 * @constructor
 */
var InstrumentTypeResource = function InstrumentTypeResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentTypeResource.prototype = Object.create(ApiResource.prototype);
InstrumentTypeResource.prototype.constructor = InstrumentTypeResource;

// Set up dependency injection
InstrumentTypeResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentTypeResource.prototype.type = 'instrument_types';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentTypeResource.prototype.path = '/instrument_types/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentTypeResource', InstrumentTypeResource);
