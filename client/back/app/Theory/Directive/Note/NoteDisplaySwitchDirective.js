/**
 * Note display switch directive
 * @returns {Object}
 * @constructor
 */
var NoteDisplaySwitchDirective = function NoteDisplaySwitchDirective() {
    return {
        restrict: 'A',
        controller: [
            'NoteResource',
            function NoteDisplaySwitchController(NoteResource) {
                this.displayFlat = NoteResource.isDisplayFlat();

                this.switchDisplay = function switchDisplay() {
                    this.displayFlat = !this.displayFlat;
                    NoteResource.setDisplayFlat(this.displayFlat);
                }
            }
        ],
        controllerAs: 'noteDisplaySwitchCtrl',
        bindToController: true,
        link: function (scope, element, attrs) {

        }
    };
};

// Set up dependency injection
NoteDisplaySwitchDirective.$inject = [];

// Register directive into angular
angular
    .module('Theory')
    .directive('noteDisplaySwitch', NoteDisplaySwitchDirective);