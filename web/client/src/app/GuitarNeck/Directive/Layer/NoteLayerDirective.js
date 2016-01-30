angular
    .module('GuitarNeck')
    .directive('noteLayer', [
        '$window',
        '$client',
        function NoteLayerDirective($window, $client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('Layer/NoteLayer.html', 'app/GuitarNeck'),
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
