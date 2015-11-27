/**
 * Show controller for Songs
 * @constructor
 */
var SongShowController = function SongShowControllerContructor(entity) {
    this.entity = entity;
};

// Set up dependency injection
SongShowController.$inject = [ 'entity' ];

/**
 * Current displayed entity
 * @type {Object}
 */
SongShowController.prototype.entity = null;

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongShowController', SongShowController);
