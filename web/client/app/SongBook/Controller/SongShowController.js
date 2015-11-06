/**
 * Show controller for Songs
 * @constructor
 */
var SongShowController = function SongShowControllerContructor(entity) {
    this.entity = entity;
};

SongShowController.prototype.entity = null;

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongShowController', [ 'entity', SongShowController ]);
