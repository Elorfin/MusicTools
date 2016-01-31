/**
 * List controller for Intervals
 * @constructor
 */
var IntervalListController = function IntervalListController($uibModal, resources) {
    this.services = {};
    this.services['$uibModal'] = $uibModal;

    this.resources = resources;
};

// Set up dependency injection
IntervalListController.$inject = ['$uibModal', 'resources'];

/**
 * List of entities
 * @type {Array}
 */
IntervalListController.prototype.resources = [];

/**
 * Interval loaded in the player
 * @type {object}
 */
IntervalListController.prototype.selected = null;

IntervalListController.prototype.selectInterval = function selectInterval(interval) {
    if (this.selected !== interval) {
        // Select interval
        this.selected = interval;
    } else {
        // Unselect interval
        this.selected = null;
    }
};

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('IntervalListController', IntervalListController);
