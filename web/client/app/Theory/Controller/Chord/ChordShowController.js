/**
 * Show controller for Songs
 * @constructor
 */
var ChordShowController = function ChordShowControllerContructor(entity, notes) {
    this.entity = entity;

    this.notes = notes;
};

// Set up dependency injection
ChordShowController.$inject = [ 'entity' ];

/**
 * Current displayed entity
 * @type {Object}
 */
ChordShowController.prototype.entity = null;

// Register controller into angular
angular
    .module('Theory')
    .controller('ChordShowController', ChordShowController);
