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

/**
 * Add a new Instrument in the library
 */
InstrumentListController.prototype.new = function newResource() {
    // Display confirm callback
    var modalInstance = this.services.$uibModal.open({
        templateUrl  : this.services.$client.getPartial('Instrument/new.html', 'app/Instrument'),
        controller   : 'InstrumentNewController',
        controllerAs : 'instrumentNewCtrl',
        size: 'lg',
        resolve: {
            instrumentTypes: [
                'InstrumentTypeResource',
                function instrumentTypesResolve(InstrumentTypeResource) {
                    return InstrumentTypeResource.query();
                }
            ]
        }
    });

    modalInstance.result.then(function (selectedItem) {
        /*$scope.selected = selectedItem;*/
    }, function () {
        /*$log.info('Modal dismissed at: ' + new Date());*/
    });
};

// Register controller into Angular JS
angular
    .module('Instrument')
    .controller('InstrumentListController', InstrumentListController);
