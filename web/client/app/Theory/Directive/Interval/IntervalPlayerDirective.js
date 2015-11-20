/**
 * Interval player directive
 * @returns {Object}
 * @constructor
 */
var IntervalPlayerDirective = function IntervalPlayerDirective() {
    return {
        restrict: 'E',
        templateUrl: '../app/Theory/Partial/Interval/player.html',
        replace: true,
        scope: {
            interval : '=',
            intervals: '='
        },
        controller: [
            '$scope',
            function IntervalPlayerController($scope) {
                /**
                 * Reference note
                 * @type {Object}
                 */
                this.referenceNote = null;

                /**
                 * Reference Note + nb semitones of the current interval
                 * @type {Object}
                 */
                this.calculatedNote = null;

                /**
                 * Direction of the interval (ascending or descending)
                 * @type {string}
                 */
                this.direction = 'ascending';

                this.setDirection = function setDirection(direction) {
                    if (direction !== this.direction) {
                        if ('ascending' === direction || 'descending' === direction) {
                            this.direction = direction;
                        } else {
                            // Invalid direction
                            console.error('Invalid interval direction. It can only be "ascending" or "descending".');
                        }
                    }
                };

                this.calculateNote = function calculateNote() {

                };

                /**
                 * Play interval
                 */
                this.playInterval = function playInterval() {

                };

                // Watch changes of the selected interval
                $scope.$watch(
                    function propertyWatched() {
                        return this.interval;
                    }.bind(this),
                    function watchCallback(newValue) {

                    }
                );
            }
        ],
        controllerAs: 'intervalPlayerCtrl',
        bindToController: true,
        link: function IntervalPlayerLink(scope, element, attrs) {

        }
    };
};

// Set up dependency injection
IntervalPlayerDirective.$inject = [];

// Register directive into angular
angular
    .module('Theory')
    .directive('intervalPlayer', IntervalPlayerDirective);