/**
 * List controller for Chords
 * @constructor
 */
var ChordListController = function ChordListController($uibModal, entities) {
    ListController.apply(this, arguments);
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

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('ChordListController', ChordListController);
