/**
 * Guitar Visualization Controller
 * @constructor
 */
var GuitarVisualizationController = function GuitarVisualizationController() {

};

// Set up dependency injection
GuitarVisualizationController.$inject = [];

GuitarVisualizationController.prototype.height = 300;

// Register controller into AngularJS
angular
    .module('Instrument')
    .controller('GuitarVisualizationController', GuitarVisualizationController);
