/**
 * Specification Form
 */
var SpecificationFormDirective = function SpecificationFormDirective($client) {
    return {
        restrict: 'E',
        template: /*$client.getPartial('Instrument/menu.html', 'app/Instrument')*/ '<div></div>',
        replace: true,
        scope: {
            specification: '='
        },
        bindToController: true,
        controllerAs: 'specificationFormCtrl',
        controller: [
            function SpecificationFormController() {

            }
        ]
    };
};

// Set up dependency injection
SpecificationFormDirective.$inject = [ '$client' ];

// Register directive into AngularJS
angular
    .module('Instrument')
    .directive('instrumentSpecificationForm', SpecificationFormDirective);