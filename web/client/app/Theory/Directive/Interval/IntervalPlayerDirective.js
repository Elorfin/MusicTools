angular
    .module('Theory')
    .directive('intervalPlayer', [
        function IntervalPlayerDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Theory/Partial/Interval/player.html',
                replace: true,
                scope: {
                },
                controller: function IntervalPlayerController() {},
                controllerAs: 'intervalPlayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);