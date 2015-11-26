/**
 * List controller for Degrees
 * @constructor
 */
var DegreeListController = function DegreeListControllerConstructor($uibModal, entities) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

// Set up dependency injection
DegreeListController.$inject = ['$uibModal', 'entities'];

/**
 * List of entities
 * @type {Array}
 */
DegreeListController.prototype.entities = [];

// Register controller into angular
angular
    .module('Theory')
    .controller('DegreeListController', DegreeListController);
