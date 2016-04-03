/**
 * Confirm Modal controller
 * @constructor
 */
var ConfirmModalController = function ConfirmModalController($uibModalInstance) {
    this.instance = $uibModalInstance;
};

// Set up dependency injection
ConfirmModalController.$inject = [ '$uibModalInstance' ];

// Register controller into Angular JS
angular
    .module('Confirm')
    .controller('ConfirmModalController', ConfirmModalController);
