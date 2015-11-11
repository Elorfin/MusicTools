/**
 * Song Resource
 * @constructor
 */
var SongResource = function SongResourceController(ApiService) {

};

/**
 * Unique identifier of the resource
 * @type {string}
 */
SongResource.prototype.identifier = 'id';

/**
 * Name of the Resource (used as translation key)
 * @type {string}
 */
SongResource.prototype.name = 'song';

/**
 * API path of the resource
 * @type {string}
 */
SongResource.prototype.path = 'songs';

/**
 * List of Resource elements
 * @type {Array}
 */
SongResource.prototype.elements = [];

/**
 * Get the list of elements
 * @param queryParams
 */
SongResource.prototype.query = function query(queryParams) {

};

/**
 * Count elements
 * @returns {Number}
 */
SongResource.prototype.count = function count() {
    return this.elements.length;
};

/**
 * Get an element using its identifier
 * @param identifierValue
 */
SongResource.prototype.get = function get(identifierValue) {

};

// Register service into Angular JS
angular
    .module('SongBook')
    .service('SongResource', [ 'ApiService', SongResource ]);