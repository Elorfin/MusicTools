/**
 * List controller for Chords
 * @constructor
 */
var ChordListController = function ChordListControllerConstructor($uibModal, entities) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

// Extends ListController
ChordListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
ChordListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
ChordListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
ChordListController.prototype.sortFields = {
    name        : 'string',
    notes_count : 'string'
};

/**
 * Current root for Chord display
 * @type {Object}
 */
ChordListController.prototype.root = null;

// Register controller into angular
angular
    .module('Theory')
    .controller('ChordListController', ChordListController);
