/**
 * Instrument menu
 * Used to select the current instrument, and if relevant the tuning (e.g. for Guitar or Bass)
 */
angular
    .module('Instrument')
    .directive('instrumentHeaderMenu', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Instrument/Partial/header-menu.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);