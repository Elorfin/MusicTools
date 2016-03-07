var ConfirmDirective = function ConfirmDirective($uibModal, $client) {
    this.services = {};
    this.services['$uibModal'] = $uibModal;
    this.services['$client']   = $client;

    return {

    };
};

// Set up dependency injection
ConfirmDirective.$inject = [ '$uibModal', '$client' ];

// Register directive into Angular JS
angular
    .module('Confirm')
    .directive('confirm', ConfirmDirective);