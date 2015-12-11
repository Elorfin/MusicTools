var SongResource = function SongResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
SongResource.prototype = Object.create(ApiResource.prototype);
SongResource.$inject = ApiResource.$inject;

/**
 * Name of the Resource (used as translation key)
 * @type {string}
 */
SongResource.prototype.name = 'song';

/**
 * Path of the API resource
 * @type {string}
 */
SongResource.prototype.path = '/songs/{id}';

// Register service into Angular JS
angular
    .module('SongBook')
    .service('SongResource', SongResource);
