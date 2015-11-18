angular
    .module('GuitarNeck')
    .directive('noteLayer', [
        '$window',
        function NoteLayerDirective($window) {
            return {
                restrict: 'E',
                templateUrl: '../app/GuitarNeck/Partial/Layer/NoteLayer.html',
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
