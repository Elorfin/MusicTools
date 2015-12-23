/**
 * Show controller for Songs
 * @constructor
 */
var SongShowController = function SongShowControllerConstructor(resource) {
    ShowController.apply(this, arguments);
};

// Extends ShowController
SongShowController.prototype = Object.create(ShowController.prototype);
SongShowController.$inject = ShowController.$inject;

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongShowController', SongShowController);
