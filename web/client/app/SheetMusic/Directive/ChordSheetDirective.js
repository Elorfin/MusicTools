/**
 * Display Chord score
 */
var ChordSheetDirective = function ChordSheetDirectiveConstructor($timeout) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="chordTab"></div>',
        scope: {
            /**
             * Root note of the Chord
             */
            root: '=',

            /**
             * Chord definition
             */
            chord: '='
        },
        link: function chordSheetLink(scope, element, attrs) {
            $timeout(function () {
                var dataTex = ':1 (3.4 3.5)';

                var $alphaTab = $(element);

                $alphaTab.alphaTab({
                    staves: [ {id: 'score', additionalSettings: {'bar-count': false } }, 'tab' ],
                    layout: {
                        mode: 'horizontal',
                        additionalSettings: {
                            /*autoSize: false*/
                            hideInfo: true,
                            hideBarCount: true
                        }
                    }
                });

                $alphaTab.alphaTab('tex', dataTex);

                console.log($alphaTab);
            }, 0);
        }
    };
};

// Set up dependency injection
ChordSheetDirective.$inject = [ '$timeout' ];

// Inject directive into AngularJS
angular
    .module('SheetMusic')
    .directive('chordSheet', ChordSheetDirective);