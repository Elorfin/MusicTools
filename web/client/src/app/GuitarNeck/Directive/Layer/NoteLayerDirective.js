angular
    .module('GuitarNeck')
    .directive('noteLayer', [
        '$window',
        '$partial',
        function NoteLayerDirective($window, $partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Layer/NoteLayer.html', 'GuitarNeck'),
                replace: true,
                scope: {

                },
                controller: 'NoteLayerController',
                controllerAs: 'noteLayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs, noteLayerCtrl) {
                    // Draw notes on load
                    noteLayerCtrl.redraw();

                    // Redraw layer on window resize
                    $($window).on('resize', function onWindowResize(event) {
                        noteLayerCtrl.redraw();
                    });
                }
            };
        }
    ]);
