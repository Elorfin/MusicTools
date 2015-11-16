/**
 * List controller for Songs
 * @constructor
 */
var SongListController = function SongListControllerConstructor(entities) {
    this.entities = entities;
};

/**
 * List of entities
 * @type {Array}
 */
SongListController.prototype.entities = [];

/**
 * Default field to sort by
 * @type {string}
 */
SongListController.prototype.sortBy = 'title';

/**
 * Reverse direction of the sort
 * @type {boolean}
 */
SongListController.prototype.sortReverse = false;

/**
 * Usable fields for sort
 * @type {Object}
 */
SongListController.prototype.sortFields = {
    title :  'string',
    artist:  'string',
    rating:  'number',
    mastery: 'number'
};

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongListController', [ 'entities', SongListController ]);
