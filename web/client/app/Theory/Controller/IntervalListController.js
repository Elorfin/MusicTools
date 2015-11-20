/**
 * List controller for Intervals
 * @constructor
 */
var IntervalListController = function IntervalListControllerConstructor($uibModal, entities) {
    this.services = {};
    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

// Set up dependency injection
IntervalListController.$inject = ['$uibModal', 'entities'];

/**
 * List of entities
 * @type {Array}
 */
IntervalListController.prototype.entities = [];

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

// Register controller into angular
angular
    .module('Theory')
    .controller('IntervalListController', IntervalListController);
