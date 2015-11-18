angular
    .module('GuitarNeck')
    .directive('guitarNeckWidget', [
        function () {

            return {
                restrict: 'E',
                templateUrl: '../app/GuitarNeck/Partial/GuitarNeck.html',
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
