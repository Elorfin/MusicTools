/**
 * Resource : Chord
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var ChordResource = function ChordResource($http, $q, $api) {
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
ChordResource.prototype.type = 'chords';

/**
 * Path of the API resource
 * @type {string}
 */
ChordResource.prototype.path = '/chords/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('ChordResource', ChordResource);
