/**
 * Base List controller
 * @constructor
 */
var ListController = function ListController($uibModal, $client, resources) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;
    this.services['$client']   = $client;

    this.resources = resources;
};

// Set up dependency injection
ListController.$inject = [ '$uibModal', '$client', 'resources' ];

/**
 * List of entities
 * @type {Array}
 */
ListController.prototype.resources = [];

/**
 * Format of the list
 */
ListController.prototype.format = 'detailed';

/**
 * Default field to sort by
 * @type {string}
 */
ListController.prototype.sortBy = null;

/**
 * Reverse direction of the sort
 * @type {boolean}
 */
ListController.prototype.sortReverse = false;

/**
 * Usable fields for sort
 * @type {Object}
 */
ListController.prototype.sortFields = {};

ListController.prototype.remove = function remove(entity) {
    // Display confirm callback
    var modalInstance = this.services.$uibModal.open({
        templateUrl : this.services.$client.getPartial('Modal/confirm.html', 'core/Layout'),
        controller  : 'ConfirmModalController',
        windowClass : 'modal-danger'
    });

    modalInstance.result.then(function (selectedItem) {
        /*$scope.selected = selectedItem;*/
    }, function () {
        /*$log.info('Modal dismissed at: ' + new Date());*/
    });
};

// Register controller into angular
angular
    .module('Api')
    .controller('ListController', ListController);
