/**
 * Game Resource
 * @constructor
 */
var GameResource = function GameResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
GameResource.prototype = Object.create(ApiResource.prototype);
GameResource.prototype.constructor = GameResource;

// Set up dependency injection
GameResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
GameResource.prototype.type = 'game';

/**
 * Path of the API resource
 * @type {string}
 */
GameResource.prototype.path = '/games/{id}';

// Register service into Angular JS
angular
    .module('Game')
    .service('GameResource', GameResource);
