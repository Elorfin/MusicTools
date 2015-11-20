/**
 * List controller for Scales
 * @constructor
 */
var ScaleListController = function ScaleListControllerConstructor($uibModal, entities) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

// Set up dependency injection
ScaleListController.$inject = ['$uibModal', 'entities'];

/**
 * List of entities
 * @type {Array}
 */
ScaleListController.prototype.entities = [];

// Register controller into angular
angular
    .module('Theory')
    .controller('ScaleListController', ScaleListController);
