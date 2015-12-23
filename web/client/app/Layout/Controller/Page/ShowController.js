/**
 * Base Show Controller
 * @constructor
 */
var ShowController = function ShowControllerConstructor(resource) {
    this.resource = resource;
};

// Set up dependency injection
ShowController.$inject = [ 'resource' ];

/**
 * Current displayed entity
 * @type {Object}
 */
ShowController.prototype.resource = null;

// Register controller into angular
angular
    .module('Layout')
    .controller('ShowController', ShowController);
