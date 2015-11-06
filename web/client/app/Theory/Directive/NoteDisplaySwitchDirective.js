angular
    .module('Theory')
    .directive('noteDisplaySwitch', [
        function NoteDisplaySwitchDirective() {
            return {
                restrict: 'A',
                controller: [
                    'NoteService',
                    function NoteDisplaySwitchController(NoteService) {
                        this.displayFlat = NoteService.isDisplayFlat();

                        this.switchDisplay = function switchDisplay() {
                            this.displayFlat = !this.displayFlat;
                            NoteService.setDisplayFlat(this.displayFlat);
                        }
                    }
                ],
                controllerAs: 'noteDisplaySwitchCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);