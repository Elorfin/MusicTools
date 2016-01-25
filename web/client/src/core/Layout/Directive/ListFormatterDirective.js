/**
 * Widget to change how lists are displayed
 */
var LayoutListFormatterDirective = function LayoutListFormatterDirectiveConstructor($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Layout', 'list-formatter.html', true),
        replace: true,
        scope: {
            /**
             * Current format of the list
             */
            format: '='
        },
        controllerAs: 'listFormatterCtrl',
        bindToController: true,
        controller: function LayoutListFormatterController () {
            /**
             * Switch display format of the list
             * @param format
             */
            this.switchFormat = function switchFormat(format) {
                this.format = format;
            };
        }
    };
};

// Set up dependency injection
LayoutListFormatterDirective.$inject = [ '$partial' ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutListFormatter', LayoutListFormatterDirective);
