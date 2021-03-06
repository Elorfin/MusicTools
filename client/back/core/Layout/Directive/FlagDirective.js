/**
 * Widget to display a flag field
 * @constructor
 */
var FlagDirective = function FlagDirective($client) {
    return {
        restrict: 'E',
        template: '<button type="button" role="button" class="flag flag-{{ flagCtrl.type }}" data-ng-transclude="" data-ng-click="flagCtrl.toggle()" data-ng-class="{ on: flagCtrl.value }"></button>',
        replace: true,
        transclude: true,
        scope: {
            /**
             * Flag value
             */
            value: '=',
            type: '@?'
        },
        controllerAs: 'flagCtrl',
        bindToController: true,
        controller: function LayoutListFormatterController () {
            this.value = false;

            this.type = 'default';

            /**
             * Switch display format of the list
             * @param format
             */
            this.toggle = function toggle() {
                this.value = !this.value;
            };
        }
    };
};

// Set up dependency injection
FlagDirective.$inject = [  ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('uiFlag', FlagDirective);
