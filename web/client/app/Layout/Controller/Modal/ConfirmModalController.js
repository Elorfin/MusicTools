/**
 * Confirm Modal controller
 * @constructor
 */
var ConfirmModalController = function ConfirmModalControllerConstructor($uibModalInstance) {
    this.instance = $uibModalInstance;
};


// Register controller into angular
angular
    .module('Layout')
    .controller('ConfirmModalController', [ '$uibModalInstance', ConfirmModalController ]);
