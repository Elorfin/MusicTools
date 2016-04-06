/**
 * List controller for Notes
 * @constructor
 */
var NoteListController = function NoteListController($uibModal, resources) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.resources = resources;
};

// Set up dependency injection
NoteListController.$inject = ['$uibModal', 'resources'];

/**
 * List of resources
 * @type {Array}
 */
NoteListController.prototype.resources = [];

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('NoteListController', NoteListController);
