/**
 * List controller for Scales
 * @constructor
 */
var ScaleListController = function ScaleListController($uibModal, resources) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.resources = resources;
};

// Set up dependency injection
ScaleListController.$inject = ['$uibModal', 'resources'];

/**
 * List of entities
 * @type {Array}
 */
ScaleListController.prototype.resources = [];

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('ScaleListController', ScaleListController);
