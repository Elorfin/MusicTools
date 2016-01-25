angular
    .module('GuitarNeck')
    .directive('fretLayer', [
        '$window',
        '$partial',
        function FretLayerDirective($window, $partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Layer/FretLayer.html', 'GuitarNeck'),
                replace: true,
                scope: {
                    /**
                     * First displayed fret
                     */
                    fretFirst: '@',

                    /**
                     * Last displayed fret
                     */
                    fretLast : '@',

                    /**
                     * Total of frets that can be displayed
                     */
                    fretCount: '@'
                },
                controller: 'FretLayerController',
                controllerAs: 'fretLayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs, fretLayerCtrl) {
                    // Get canvas
                    var canvas = element.find('canvas').get(0);

                    // Draw frets on load
                    fretLayerCtrl.redraw(canvas, element.width(), element.height());

                    // Watch properties
                    scope.$watch(function() { return fretLayerCtrl.fretFirst }, function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            // Redraw Layer
                            fretLayerCtrl.redraw(canvas, element.width(), element.height());
                        }
                    });

                    scope.$watch(function() { return fretLayerCtrl.fretLast }, function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            // Redraw Layer
                            fretLayerCtrl.redraw(canvas, element.width(), element.height());
                        }
                    });

                    scope.$watch(function() { return fretLayerCtrl.fretCount }, function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            // Redraw Layer
                            fretLayerCtrl.redraw(canvas, element.width(), element.height());
                        }
                    });

                    // Redraw layer on window resize
                    $($window).on('resize', function onWindowResize(event) {
                        fretLayerCtrl.redraw(canvas, element.width(), element.height());
                    });
                }
            };
        }
    ]);