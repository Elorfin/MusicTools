/**
 * List controller for Songs
 * @constructor
 */
var SongListController = function SongListControllerConstructor($uibModal, resources) {
    ListController.apply(this, arguments);
};

// Extends ListController
SongListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
SongListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
SongListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
SongListController.prototype.sortFields = {
    name    : 'string',
    artist  : 'string',
    rating  : 'number',
    mastery : 'number'
};

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongListController', SongListController);
