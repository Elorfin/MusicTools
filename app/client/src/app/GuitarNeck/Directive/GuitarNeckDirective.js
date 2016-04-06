angular
    .module('GuitarNeck')
    .directive('guitarNeckWidget', [
        '$client',
        function ($client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('GuitarNeck.html', 'app/GuitarNeck'),
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
