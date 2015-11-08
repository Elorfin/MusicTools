/**
 * List controller for Songs
 * @constructor
 */
var SongListController = function SongListControllerConstructor(entities) {
    this.entities = entities;
};

SongListController.prototype.entities = [];

SongListController.prototype.sortBy = 'title';

SongListController.prototype.sortReverse = false;

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongListController', [ 'entities', SongListController ]);
