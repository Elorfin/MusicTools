var InstrumentTypeResource = function InstrumentTypeResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentTypeResource.prototype = Object.create(ApiResource.prototype);
InstrumentTypeResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentTypeResource.prototype.type = 'instrument_type';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentTypeResource.prototype.path = '/instrument_types/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentTypeResource', InstrumentTypeResource);
