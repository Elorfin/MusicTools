/**
 * Base Show Controller
 * @constructor
 */
var ShowController = function ShowController(resource, ApiResource) {
    this.resource    = resource;
    this.apiResource = ApiResource;
};

// Set up dependency injection
ShowController.$inject = [ 'resource', 'ApiResource' ];

/**
 * Current displayed entity
 * @type {Object}
 */
ShowController.prototype.resource = null;

/**
 * Save modifications of the Resource
 */
ShowController.prototype.save = function save() {
    this.apiResource.update(this.resource);
};

/**
 * Remove the Resource
 */
ShowController.prototype.remove = function remove() {

};

// Register controller into angular
angular
    .module('Api')
    .controller('ShowController', ShowController);
