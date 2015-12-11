var InstrumentTemplateResource = function InstrumentTemplateResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentTemplateResource.prototype = Object.create(ApiResource.prototype);
InstrumentTemplateResource.$inject = ApiResource.$inject;

/**
 * Name of the Resource (used as translation key)
 * @type {string}
 */
InstrumentTemplateResource.prototype.name = 'instrument_template';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentTemplateResource.prototype.path = '/instrumenttypes/{type}/templates/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentTemplateResource', InstrumentTemplateResource);
