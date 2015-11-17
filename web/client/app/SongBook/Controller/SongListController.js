/**
 * List controller for Songs
 * @constructor
 */
var SongListController = function SongListControllerConstructor($uibModal, entities) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

/**
 * List of entities
 * @type {Array}
 */
SongListController.prototype.entities = [];

/**
 * Default field to sort by
 * @type {string}
 */
SongListController.prototype.sortBy = 'title';

/**
 * Reverse direction of the sort
 * @type {boolean}
 */
SongListController.prototype.sortReverse = false;

/**
 * Usable fields for sort
 * @type {Object}
 */
SongListController.prototype.sortFields = {
    title :  'string',
    artist:  'string',
    rating:  'number',
    mastery: 'number'
};

SongListController.prototype.removeSong = function removeSong(song) {
    // Display confirm callback
    var modalInstance = this.services.$uibModal.open({
        templateUrl : '../app/Layout/Partial/Modal/confirm.html',
        controller  : 'ConfirmModalController'
    });

    modalInstance.result.then(function (selectedItem) {
        /*$scope.selected = selectedItem;*/
    }, function () {
        /*$log.info('Modal dismissed at: ' + new Date());*/
    });
};

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongListController', [ '$uibModal', 'entities', SongListController ]);
