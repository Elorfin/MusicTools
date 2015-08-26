(function () {
    'use strict';

    angular.module('GuitarNeck')
        .directive('fretsLayer', [
            function () {
                return {
                    restrict: 'E',
                    template: '<canvas class="frets-layer"></canvas>',
                    replace: true,
                    scope: {
                        fretFirst: '=',
                        fretLast : '='
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