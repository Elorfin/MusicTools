var GameResource = function GameResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
GameResource.prototype = Object.create(ApiResource.prototype);
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
