/**
 * List controller for Notes
 * @constructor
 */
var NoteListController = function NoteListControllerConstructor($uibModal, entities) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

// Set up dependency injection
NoteListController.$inject = ['$uibModal', 'entities'];

/**
 * List of entities
 * @type {Array}
 */
NoteListController.prototype.entities = [];

// Register controller into angular
angular
    .module('Theory')
    .controller('NoteListController', NoteListController);
