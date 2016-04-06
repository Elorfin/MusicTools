/**
 * Instrument Specification Resource
 * @constructor
 */
var InstrumentSpecificationResource = function InstrumentSpecificationResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentSpecificationResource.prototype = Object.create(ApiResource.prototype);
InstrumentSpecificationResource.prototype.constructor = InstrumentSpecificationResource;

// Set up dependency injection
InstrumentSpecificationResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentSpecificationResource.prototype.type = 'instrument_specifications';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentSpecificationResource.prototype.path = '/instrument/{instrument}/specification/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentSpecificationResource', InstrumentSpecificationResource);
