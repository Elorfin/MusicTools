/**
 * List controller for Instruments
 * @constructor
 */
var InstrumentListController = function InstrumentListController($uibModal, resources) {
    ListController.apply(this, arguments);
};

// Extends ListController
InstrumentListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
InstrumentListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
InstrumentListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
InstrumentListController.prototype.sortFields = {
    name :  'string'
};

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentListController', InstrumentListController);
