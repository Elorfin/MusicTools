/**
 * Note menu directive
 * @param   {NoteResource} NoteResource
 * @returns {Object}
 * @constructor
 */
var NoteMenuDirective = function NoteMenuDirectiveConstructor($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Note/menu.html', 'Theory'),
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
NoteMenuDirective.$inject = [ '$partial' ];

// Register directive into Angular JS
angular
    .module('Theory')
    .directive('noteMenu', NoteMenuDirective);