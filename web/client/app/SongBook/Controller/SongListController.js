/**
 * List controller for Songs
 * @constructor
 */
var SongListController = function SongListControllerConstructor(entities) {
    this.entities = entities;
};

SongFormController.prototype.entities = [];

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongListController', [ 'entities', SongListController ]);
