angular
    .module('GuitarNeck')
    .directive('guitarNeckWidget', [
        '$partial',
        function ($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('GuitarNeck.html', 'GuitarNeck'),
                replace: true,
                scope: {
                    guitar: '=?'
                },
                controller: 'GuitarNeckController',
                controllerAs: 'guitarNeckCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
