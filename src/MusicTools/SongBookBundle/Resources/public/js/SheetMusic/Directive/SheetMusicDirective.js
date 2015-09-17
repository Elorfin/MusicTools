(function () {
    'use strict';

    angular.module('SheetMusic')
        .directive('sheetMusic', [
            '$timeout',
            function ($timeout) {
                return {
                    restrict: 'E',
                    templateUrl: assetDirectory + '/musictoolssongbook/js/SheetMusic/Partial/sheet-music.html',
                    replace: true,
                    scope: {
                        file: '@'
                    },
                    bindToController: true,
                    controller:   'SheetMusicController',
                    controllerAs: 'sheetMusicCtrl',
                    link: function (scope, element, attrs, sheetMusicCtrl) {
                        // Store alphaTab object into the Controller
                        sheetMusicCtrl.component = $('.alphaTab');

                        var $element = $(element);

                        // Set size of the player navbar
                        var sheetPosition = $element.offset();
                        var sheetWidth = $element.width();
                        var navbar = $element.find('.sheet-music-controls');

                        // Set navbar position and size
                        navbar.offset({ left: sheetPosition.left });
                        navbar.width(sheetWidth);

                        // Initialize alphaTab
                        $timeout(function () {
                            //
                            // 1. Load alphaTab
                            sheetMusicCtrl.component.alphaTab();

                            //
                            // 2. Initialize Player and Setup Player UI
                            sheetMusicCtrl.player.component = sheetMusicCtrl.component.alphaTab('playerInit', {
                                asRoot        : assetDirectory + '/musictoolssongbook/libraries/alphaTab/Samples/JavaScript/lib/alphaSynth/',
                                swfObjectRoot : assetDirectory + '/musictoolssongbook/libraries/alphaTab/Samples/JavaScript/lib/alphaSynth/'
                            }); // init alphaSynth

                            //
                            // 3. Bind events
                            sheetMusicCtrl.player.component.On('ready', function(r) {
                                // load default data
                                sheetMusicCtrl.player.component.LoadSoundFontUrl(assetDirectory + '/musictoolssongbook/libraries/alphaTab/Samples/JavaScript/lib/alphaSynth/default.sf2');
                            });

                            sheetMusicCtrl.player.component.On('soundFontLoad', function(loaded, full) {
                                var percentage = ((loaded / full) * 100)|0;
                                $('#sfInfo .progress').text('(' + percentage + '%)');
                            });

                            sheetMusicCtrl.player.component.On('soundFontLoaded', function() {
                                $('#sfInfo').hide();
                            });

                            sheetMusicCtrl.player.component.On('readyForPlay', function(r) {
                                /*sheetMusicCtrl.player.ready = r;*/
                                updateControls();

                                scope.$apply();
                            });

                            sheetMusicCtrl.player.component.On('playerStateChanged', function(s) {
                                sheetMusicCtrl.player.state = s;
                                updateControls();

                                scope.$apply();
                            });

                            //
                            // 3. Add cursors (optional)
                            sheetMusicCtrl.component.alphaTab('playerCursor');
                            // sheetMusicCtrl.component.alphaTab('drop'); // drag and drop
                        }, 300);

                        function updateControls() {
                            if(!sheetMusicCtrl.player.ready) {
                                $('#loadingInfo').show()
                                $('#controls button').attr('disabled', 'disabled');
                            }
                            else {
                                $('#loadingInfo').hide()
                                $('#playPause').removeAttr('disabled');
                                switch (sheetMusicCtrl.player.state) {
                                    case 0: // stopped
                                        $('#playPause').text('Play').removeClass('pause').addClass('play');
                                        $('#stop').attr('disabled', 'disabled');
                                        break;
                                    case 1: // playing
                                        $('#playPause').text('Pause').removeClass('play').addClass('pause');
                                        $('#stop').removeAttr('disabled');
                                        break;
                                    case 2: // paused
                                        $('#playPause').text('Play').removeClass('pause').addClass('play');
                                        $('#stop').removeAttr('disabled');
                                        break;
                                }
                            }
                        }
                    }
                };
            }
        ]);
})();