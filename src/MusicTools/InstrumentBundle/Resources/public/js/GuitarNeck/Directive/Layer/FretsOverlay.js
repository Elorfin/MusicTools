(function () {
    'use strict';

    angular.module('GuitarNeck')
        .directive('fretsOverlay', [
            function () {
                return {
                    restrict: 'E',
                    template: '<canvas class="frets-overlay"></canvas>',
                    replace: true,
                    scope: {
                        start: '=',
                        end  : '='
                    },
                    /*controller: 'FretsOverlayController',
                    bindToController: true,*/
                    link: function (scope, element, attrs) {
                        // Get the canvas element and context
                    }
                };
            }
        ]);
})();