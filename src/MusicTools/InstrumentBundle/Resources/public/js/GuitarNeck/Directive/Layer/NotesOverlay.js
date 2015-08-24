(function () {
    'use strict';

    angular.module('GuitarNeck')
        .directive('notesOverlay', [
            function () {
                return {
                    restrict: 'E',
                    template: '<canvas class="notes-overlay"></canvas>',
                    replace: true,
                    scope: {
                    },
                    controller: 'NotesOverlayController',
                    bindToController: true,
                    link: function (scope, element, attrs) {

                    }
                };
            }
        ]);
})();