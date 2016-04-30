/**
 * Abstract Visualization Controller
 * Base controller class for instrument visualization
 * @constructor
 */
var AbstractVisualizationController = function AbstractVisualizationController() {

};

// Set up dependency injection
AbstractVisualizationController.$inject = [];

// Register controller into AngularJS
angular
    .module('Instrument')
    .controller('AbstractVisualizationController', AbstractVisualizationController);