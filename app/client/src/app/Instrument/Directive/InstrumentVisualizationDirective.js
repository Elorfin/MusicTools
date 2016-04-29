/**
 *
 * @returns {Object}
 * @constructor
 */
var InstrumentVisualizationDirective = function InstrumentVisualizationDirective($client) {
    return {
        restrict: 'E',
        template:'<div data-ng-include="templateUrl"></div>',
        replace: true,
        scope: {
            type: '=',
            specification: '='
        },
        /*controller: 'GuitarNeckController',
        controllerAs: 'visualizationCtrl',
        bindToController: true*/
        controller: function ($scope, $element, $attrs, $transclude) {
            return $controller($scope.templateUrl, locals);
        },
        link: function (scope, element, attrs) {
            scope.templateUrl = scope.type ?
                $client.getPartial('Visualization/' + scope.type + '.html', 'app/Instrument') : null;
        }
    }
};

// Set up dependency injection
InstrumentVisualizationDirective.$inject = [ '$client' ];

// Register directive into AngularJS
angular
    .module('Instrument')
    .directive('instrumentVisualization', InstrumentVisualizationDirective);
