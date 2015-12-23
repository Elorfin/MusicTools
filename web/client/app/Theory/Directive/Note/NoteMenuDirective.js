/**
 * Note menu directive
 * @param   {NoteResource} NoteResource
 * @returns {Object}
 * @constructor
 */
var NoteMenuDirective = function NoteMenuDirectiveConstructor(NoteResource) {
    return {
        restrict: 'E',
        templateUrl: '../app/Theory/Partial/Note/menu.html',
        replace: true,
        scope: {
            /**
             * Current selected note
             */
            current: '='
        },
        controller: 'NoteMenuController',
        controllerAs: 'noteMenuCtrl',
        bindToController: true
    };
};

// Set up dependency injection
NoteMenuDirective.$inject = ['NoteResource'];

// Register directive into angular
angular
    .module('Theory')
    .directive('noteMenu', NoteMenuDirective);