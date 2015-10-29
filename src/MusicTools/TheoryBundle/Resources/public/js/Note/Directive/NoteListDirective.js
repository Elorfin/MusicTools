(function () {
    'use strict';

    angular.module('Note')
        .directive('noteList', [
            'NoteService',
            function (NoteService) {
                return {
                    restrict: 'E',
                    templateUrl: assetDirectory + '/musictoolstheory/js/Note/Partial/list.html',
                    replace: true,
                    scope: {

                    },
                    /*controller: 'FretsOverlayController',
                     bindToController: true,*/
                    link: function (scope, element, attrs) {
                        NoteService.all().then(function (data) {
                            scope.notes = data;
                        });
                    }
                };
            }
        ]);
})();