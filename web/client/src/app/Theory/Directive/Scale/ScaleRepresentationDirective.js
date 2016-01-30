angular
    .module('Theory')
    .directive('scaleRepresentation', [
        '$client',
        'NoteResource',
        function ScaleRepresentationDirective($client, NoteResource) {
            return {
                restrict: 'E',
                templateUrl: $client.getPath('Scale/representation.html', 'app/Theory'),
                replace: true,
                scope: {

                },
                controller: function NoteSelectorController() {},
                controllerAs: 'noteSelectorCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {
                    scope.notes = NoteResource.query();

                    var canvas = element.find('canvas').get(0);
                    var $canvas = $(canvas);

                    canvas.width  = $canvas.parent().width();
                    canvas.height = $canvas.parent().width();

                    var context = canvas.getContext('2d');
                    var centerX = canvas.width / 2;
                    var centerY = canvas.height / 2;
                    var radius = Math.round((canvas.width / 8) * 3);

                    context.beginPath();
                    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

                    context.lineWidth = 40;
                    context.strokeStyle = 'rgba(0, 0, 0, 0.25)';
                    context.stroke();

                    // Draw Notes
                    var angleStep = (360 / notes.length) * (2.0 * Math.PI) / 360.0;
                    var angle = - Math.PI / 2;
                    for (var i = 0; i < notes.length; i++) {
                        if (notes[i].accidental) {
                            drawAlteration(angle, notes[i]);
                        } else {
                            drawNote(angle, notes[i])
                        }

                        angle += angleStep;
                    }

                    function drawAlteration(angle, note)
                    {
                        var startX = centerX + (radius - 30) * Math.cos(angle);
                        var startY = centerY + (radius - 30) * Math.sin(angle);

                        var endX = centerX + (radius + 30) * Math.cos(angle);
                        var endY = centerY + (radius + 30) * Math.sin(angle);

                        context.beginPath();
                        context.moveTo(startX, startY);
                        context.lineTo(endX, endY);

                        context.lineWidth = 2;
                        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

                        context.stroke();

                        context.beginPath();
                        context.font="bold 12pt Calibri";
                        context.fillText(notes[i].info.name, endX,endY);
                    }

                    function drawNote(angle, note)
                    {
                        var startX = centerX + (radius - 30) * Math.cos(angle);
                        var startY = centerY + (radius - 30) * Math.sin(angle);

                        var endX = centerX + (radius + 30) * Math.cos(angle);
                        var endY = centerY + (radius + 30) * Math.sin(angle);

                        context.beginPath();
                        context.moveTo(startX, startY);
                        context.lineTo(endX, endY);

                        context.lineWidth = 5;
                        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

                        context.stroke();

                        context.beginPath();
                        context.font="bold 12pt Calibri";
                        context.fillText(notes[i].info.name, endX,endY);
                    }

                    function drawInterval()
                    {

                    }
                }
            };
        }
    ]);