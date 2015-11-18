/**
 * List controller for Songs
 * @constructor
 */
var IntervalListController = function IntervalListControllerConstructor($uibModal, entities) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

/**
 * List of entities
 * @type {Array}
 */
IntervalListController.prototype.entities = [];

/**
 * Default field to sort by
 * @type {string}
 */
IntervalListController.prototype.sortBy = 'name';

/**
 * Reverse direction of the sort
 * @type {boolean}
 */
IntervalListController.prototype.sortReverse = false;

/**
 * Usable fields for sort
 * @type {Object}
 */
IntervalListController.prototype.sortFields = {
    title :  'string',
    artist:  'string',
    rating:  'number',
    mastery: 'number'
};

IntervalListController.prototype.removeSong = function removeSong(song) {
    // Display confirm callback
    var modalInstance = this.services.$uibModal.open({
        templateUrl : '../app/Layout/Partial/Modal/confirm.html',
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
    .module('Theory')
    .controller('IntervalListController', [ '$uibModal', 'entities', IntervalListController ]);
