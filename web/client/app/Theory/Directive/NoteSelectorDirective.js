angular
    .module('Theory')
    .directive('noteSelector', [
        'NoteService',
        function NoteSelectorService(NoteService) {
            return {
                restrict: 'E',
                templateUrl: assetDirectory + '/musictoolstheory/js/Note/Partial/selector.html',
                replace: true,
                scope: {

                },
                controller: function NoteSelectorController() {},
                controllerAs: 'noteSelectorCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {
                    NoteService.all().then(function (data) {
                        scope.notes = data;
                    });

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