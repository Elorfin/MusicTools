/**
 * List controller for Degrees
 * @constructor
 */
var DegreeListController = function DegreeListController($uibModal, resources) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.resources = resources;
};

// Set up dependency injection
DegreeListController.$inject = ['$uibModal', 'resources'];

/**
 * List of entities
 * @type {Array}
 */
DegreeListController.prototype.resources = [];

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('DegreeListController', DegreeListController);
