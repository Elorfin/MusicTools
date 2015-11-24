/**
 * Widget to change how lists are displayed
 */
var LayoutListFormatterDirective = function LayoutListFormatterDirectiveConstructor() {
    return {
        restrict: 'E',
        templateUrl: '../app/Layout/Partial/list-formatter.html',
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
             * Available formats
             * @type {Array}
             */
            this.availableFormats = [
                { name: 'tile',           icon: '' },
                { name: 'list-detailed',  icon: '' },
                { name: 'list-condensed', icon: '' }
            ];

            /**
             * Switch display format of the list
             * @param format
             */
            this.switchFormat = function switchFormat(format) {

            };
        }
    };
};

// Set up dependency injection
LayoutListFormatterDirective.$inject = [];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutListFormatter', LayoutListFormatterDirective);
