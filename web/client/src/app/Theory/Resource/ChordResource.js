/**
 * Resource : Chord
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var ChordResource = function ChordResourceConstructor($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
ChordResource.prototype = Object.create(ApiResource.prototype);
ChordResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
ChordResource.prototype.type = 'chord';

/**
 * Path of the API resource
 * @type {string}
 */
ChordResource.prototype.path = '/chords/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('ChordResource', ChordResource);
