/**
 * List controller for Chords
 * @constructor
 */
var ChordListController = function ChordListControllerConstructor($uibModal, entities) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

// Set up dependency injection
ChordListController.$inject = ['$uibModal', 'entities'];

/**
 * List of entities
 * @type {Array}
 */
ChordListController.prototype.entities = [];

// Register controller into angular
angular
    .module('Theory')
    .controller('ChordListController', ChordListController);
