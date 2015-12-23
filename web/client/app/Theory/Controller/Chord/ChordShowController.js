/**
 * Show controller for Songs
 * @constructor
 */
var ChordShowController = function ChordShowControllerConstructor(resource, notes) {
    ShowController.apply(this, arguments);

    this.notes = notes;
};

// Extends ShowController
ChordShowController.prototype = Object.create(ShowController.prototype);

// Set up dependency injection
ChordShowController.$inject = ShowController.$inject;

// Register controller into angular
angular
    .module('Theory')
    .controller('ChordShowController', ChordShowController);
