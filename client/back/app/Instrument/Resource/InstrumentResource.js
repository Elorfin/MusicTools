/**
 * Instrument Resource
 * @constructor
 */
var InstrumentResource = function InstrumentResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentResource.prototype = Object.create(ApiResource.prototype);

// Set up dependency injection
InstrumentResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentResource.prototype.type = 'instruments';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentResource.prototype.path = '/instruments/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentResource', InstrumentResource);
