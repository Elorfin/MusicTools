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
            interval    : '='
        },
        bindToController: true,
        controllerAs: 'intervalPlayerCtrl',
        controller: [
            '$scope',
            'SoundService',
            'IntervalResource',
            'NoteResource',
            function IntervalPlayerController($scope, SoundService, IntervalResource, NoteResource) {
                this.notes     = NoteResource.query().then(function (result) {
                    this.notes = result;
                    this.referenceNote = result[57];

                    return result;
                }.bind(this));

                this.intervals = IntervalResource.query();

                /**
                 * Tempo
                 * @type {number}
                 */
                this.tempo = 70;

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

                /**
                 * Set direction of the Interval
                 * @param {String} direction
                 */
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

                /**
                 * Set current interval
                 * @param {Object} interval
                 */
                this.setInterval = function setInterval(interval) {
                    this.interval = interval;
                };

                this.calculateNote = function calculateNote() {
                    if (this.interval && this.direction && this.referenceNote) {

                        if ('ascending' === this.direction) {
                            var newNoteValue = this.referenceNote.value + this.interval.value;
                        } else {
                            var newNoteValue = this.referenceNote.value - this.interval.value;
                        }

                        this.calculatedNote = this.notes[newNoteValue];
                    }
                };

                this.incrementReference = function incrementReference() {
                    var newNoteValue = this.referenceNote.value + 1;

                    this.referenceNote = this.notes[newNoteValue];
                };

                this.decrementReference = function incrementReference() {
                    var newNoteValue = this.referenceNote.value - 1;

                    this.referenceNote = this.notes[newNoteValue];
                };

                /**
                 * Play interval
                 */
                this.playInterval = function playInterval() {
                    SoundService.playFrequency(this.referenceNote.frequency,  0, 1);
                    SoundService.playFrequency(this.calculatedNote.frequency, 1, 1);
                };

                // Watch changes of the interval
                $scope.$watch(
                    function intervalWatch() {
                        return this.interval;
                    }.bind(this), this.calculateNote.bind(this)
                );

                // Watch changes of the direction
                $scope.$watch(
                    function directionWatch() {
                        return this.direction;
                    }.bind(this), this.calculateNote.bind(this)
                );

                // Watch changes of the reference note
                $scope.$watch(
                    function referenceWatch() {
                        return this.referenceNote;
                    }.bind(this), this.calculateNote.bind(this)
                );
            }
        ],
        compile: function compile() {
            return {
                pre: function preLink(scope, element, attrs, intervalPlayerCtrl) {
                    intervalPlayerCtrl.dropdownOptions = {
                        setHeight: (element.height() - 70) + 'px'
                    };
                }
            }
        }
    };
};

// Set up dependency injection
IntervalPlayerDirective.$inject = [];

// Register directive into angular
angular
    .module('Theory')
    .directive('intervalPlayer', IntervalPlayerDirective);