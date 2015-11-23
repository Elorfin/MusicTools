var ChordResource = function ChordResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
ChordResource.prototype = Object.create(ApiResource.prototype);
ChordResource.$inject = ApiResource.$inject;

/**
 * Name of the Resource (used as translation key)
 * @type {string}
 */
ChordResource.prototype.name = 'chord';

/**
 * Path of the API resource
 * @type {string}
 */
ChordResource.prototype.path = '/chords';

// Register service into Angular JS
angular
    .module('Theory')
    .service('ChordResource', ChordResource);
