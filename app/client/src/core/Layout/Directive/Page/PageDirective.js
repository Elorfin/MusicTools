/**
 * Represents a page of the application
 * @constructor
 */
var LayoutPageDirective = function LayoutPageDirective() {
    return {
        restrict: 'E',
        template: '<div class="container-fluid" data-ng-transclude=""></div>',
        replace: true,
        transclude: true
    };
};

// Set up dependency injection
LayoutPageDirective.$inject = [];

// Register directive into Angular JS
angular
    .module('Layout')
    .directive('layoutPage', LayoutPageDirective);