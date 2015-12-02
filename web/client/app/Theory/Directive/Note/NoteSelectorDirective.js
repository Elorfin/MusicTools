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
            /**
             * Current selected note
             */
            current: '='
        },
        controller: function NoteSelectorController() {},
        controllerAs: 'noteSelectorCtrl',
        bindToController: true,
        link: function (scope, element, attrs) {
            scope.notes = NoteResource.query().then(function (result) {
                if (!scope.current) {
                    scope.current = result[0];
                }

                return result;
            });
        }
    };
};

// Set up dependency injection
NoteSelectorDirective.$inject = ['NoteResource'];

// Register directive into angular
angular
    .module('Theory')
    .directive('noteSelector', NoteSelectorDirective);