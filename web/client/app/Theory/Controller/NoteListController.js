/**
 * List controller for Notes
 * @constructor
 */
var NoteListController = function NoteListControllerConstructor($uibModal, entities) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.entities = entities;
};

/**
 * List of entities
 * @type {Array}
 */
NoteListController.prototype.entities = [];

NoteListController.prototype.removeSong = function removeSong(song) {
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
    .controller('NoteListController', [ '$uibModal', 'entities', NoteListController ]);
