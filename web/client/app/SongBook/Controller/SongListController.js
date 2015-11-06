/**
 * List controller for Songs
 * @constructor
 */
var SongListController = function SongListControllerConstructor(entities) {
    console.log(entities.length);

    this.entities = entities;
};

SongFormController.prototype.entities = [];

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongListController', [ 'entities', SongListController ]);
