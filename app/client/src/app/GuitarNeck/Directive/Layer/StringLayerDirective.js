angular
    .module('GuitarNeck')
    .directive('stringLayer', [
        '$window',
        '$client',
        function StringLayerDirective($window, $client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('Layer/StringLayer.html', 'app/GuitarNeck'),
                replace: true,
                scope: {
                    strings: '=?'
                },
                controller: 'StringLayerController',
                controllerAs: 'stringLayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs, stringLayerCtrl) {
                    // Get canvas
                    var canvas = element.get(0);

                    // Draw strings on load
                    stringLayerCtrl.redraw(canvas, element.width(), element.height());

                    // Redraw layer on window resize
                    $($window).on('resize', function onWindowResize(event) {
                        stringLayerCtrl.redraw(canvas, element.width(), element.height());
                    });
                }
            };
        }
    ]);