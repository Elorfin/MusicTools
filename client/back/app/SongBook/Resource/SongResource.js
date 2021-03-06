/**
 * Song Resource
 * @constructor
 */
var SongResource = function SongResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
SongResource.prototype = Object.create(ApiResource.prototype);
SongResource.prototype.constructor = SongResource;

// Set up dependency injection
SongResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
SongResource.prototype.type = 'songs';

/**
 * Path of the API resource
 * @type {string}
 */
SongResource.prototype.path = '/songs/{id}';

// Register service into Angular JS
angular
    .module('SongBook')
    .service('SongResource', SongResource);
