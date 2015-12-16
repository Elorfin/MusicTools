/**
 * Base Show Controller
 * @constructor
 */
var BaseShowController = function BaseShowControllerContructor(entity) {
    this.entity = entity;
};

// Set up dependency injection
BaseShowController.$inject = [ 'entity' ];

/**
 * Current displayed entity
 * @type {Object}
 */
BaseShowController.prototype.entity = null;

// Register controller into angular
angular
    .module('Layout')
    .controller('BaseShowController', BaseShowController);
