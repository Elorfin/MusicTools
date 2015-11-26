/**
 * List controller for Songs
 * @constructor
 */
var SongListController = function SongListControllerConstructor($uibModal, entities) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

// Extends ListController
SongListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
SongListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
SongListController.prototype.sortBy = 'title';

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
    .controller('SongListController', SongListController);
