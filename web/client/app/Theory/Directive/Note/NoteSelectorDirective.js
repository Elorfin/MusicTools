angular
    .module('Theory')
    .directive('noteSelector', [
        'NoteResource',
        function NoteSelectorDirective(NoteResource) {
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

                    /*$(document).keydown(function(e) {
                        switch(e.which) {
                            case 37: // left
                                break;

                            case 38: // up
                                break;

                            case 39: // right
                                break;

                            case 40: // down
                                break;

                            default: return; // exit this handler for other keys
                        }
                        e.preventDefault(); // prevent the default action (scroll / move caret)
                    });*/
                }
            };
        }
    ]);