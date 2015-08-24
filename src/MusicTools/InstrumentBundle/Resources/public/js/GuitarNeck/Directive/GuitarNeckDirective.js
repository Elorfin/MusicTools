(function () {
    'use strict';

    angular.module('GuitarNeck')
        .directive('fretsOverlay', [
            function () {
                return {
                    restrict: 'E',
                    template: assetDirectory + '/musictoolsinstrument/partials/guitar-neck-widget.html',
                    replace: true,
                    scope: {
                        guitar: '?='
                    },
                    bindToController: true,
                    controller: 'GuitarNeckController',
                    controllerAs: 'guitarNeck',
                    link: function (scope, element, attrs) {

                    }
                };
            }
        ]);
})();