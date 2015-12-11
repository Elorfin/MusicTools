var InstrumentResource = function InstrumentResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentResource.prototype = Object.create(ApiResource.prototype);
InstrumentResource.$inject = ApiResource.$inject;

/**
 * Name of the Resource (used as translation key)
 * @type {string}
 */
InstrumentResource.prototype.name = 'instrument';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentResource.prototype.path = '/instruments/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentResource', InstrumentResource);
