/**
 * Note menu directive
 * @param   {Object} $client
 * @returns {Object}
 * @constructor
 */
var NoteMenuDirective = function NoteMenuDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('Note/menu.html', 'app/Theory'),
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
NoteMenuDirective.$inject = [ '$client' ];

// Register directive into Angular JS
angular
    .module('Theory')
    .directive('noteMenu', NoteMenuDirective);