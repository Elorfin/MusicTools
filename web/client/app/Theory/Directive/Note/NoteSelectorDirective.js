/**
 * Note selector directive
 * @param   {NoteResource} NoteResource
 * @returns {Object}
 * @constructor
 */
var NoteSelectorDirective = function NoteSelectorDirective(NoteResource) {
    return {
        restrict: 'E',
        templateUrl: '../app/Theory/Partial/Note/selector.html',
        replace: true,
        scope: {

        },
        controller: function NoteSelectorController() {},
        controllerAs: 'noteSelectorCtrl',
        bindToController: true,
        link: function (scope, element, attrs) {
            scope.notes = NoteResource.query();
        }
    };
};

// Set up dependency injection
NoteSelectorDirective.$inject = ['NoteResource'];

// Register directive into angular
angular
    .module('Theory')
    .directive('noteSelector', NoteSelectorDirective);