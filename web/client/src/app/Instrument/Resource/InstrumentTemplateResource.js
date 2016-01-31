/**
 * Instrument Template Resource
 * @constructor
 */
var InstrumentTemplateResource = function InstrumentTemplateResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentTemplateResource.prototype = Object.create(ApiResource.prototype);
InstrumentTemplateResource.prototype.constructor = InstrumentTemplateResource;

// Set up dependency injection
InstrumentTemplateResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentTemplateResource.prototype.type = 'instrument_template';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentTemplateResource.prototype.path = '/instrument_types/{type}/templates/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentTemplateResource', InstrumentTemplateResource);
