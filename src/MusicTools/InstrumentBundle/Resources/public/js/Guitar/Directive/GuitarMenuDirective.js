(function () {
    'use strict';

    angular.module('Guitar')
        .directive('guitarMenu', [
            function () {
                return {
                    restrict: 'E',
                    templateUrl: assetDirectory + '/musictoolsinstrument/js/Guitar/Partial/guitar-menu.html',
                    replace: true,
                    scope: {

                    },
                    /*bindToController: true,
                    controller: 'GuitarNeckController',
                    controllerAs: 'guitarNeck',*/
                    link: function (scope, element, attrs) {

                    }
                };
            }
        ]);
})();