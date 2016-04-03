/**
 * Confirm Service
 * @constructor
 */
var ConfirmService = function ConfirmService($uibModal, $client) {
    this.services = {};
    this.services['$uibModal'] = $uibModal;
    this.services['$client']   = $client;
};

// Set up dependency injection
ConfirmService.$inject = [];

ConfirmService.prototype.confirm = function confirm() {
    var modalInstance = this.services.$uibModal.open({
        templateUrl : this.services.$client.getPartial('confirm.html', 'core/Confirm'),
        controller  : 'ConfirmModalController',
        windowClass : 'modal-danger'
    });
};

// Register service into Angular JS
angular
    .module('Confirm')
    .service('ConfirmService', ConfirmService);