/**
 * Scrollable Directive
 */
angular
    .module('Layout')
    .directive('layoutScrollable', [
        '$document',
        function ScrollableDirective ($document) {
            // Set some default options
            var options = {
                scrollInertia: 100,
                scrollButtons:{
                    enable: false
                },
                theme: 'dark-3',
                scrollAmount: 80,
                axis: 'y',
                contentTouchScroll: true,
                autoHideScrollbar: false
            };

            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                template: '<div class="scrollable" data-ng-transclude=""></div>',
                scope: {
                    options : '=options'
                },
                link: function (scope, element) {
                    if (scope.options) {
                        angular.extend(options, scope.options);
                    }

                    var $element = $(element);

                    initScrollbar();

                    function initScrollbar() {
                        // Create object
                        $element.ready(function () {
                            $element.mCustomScrollbar(options);
                        });

                        // Add events
                        $(window).on('resize', function () {
                            $element.mCustomScrollbar('update');
                        });

                        $document.on('hover', $element, function () {
                            $document.data({ "keyboard-input" : "enabled" });
                            $(this).addClass("keyboard-input");
                        });

                        $document.on('mouseout', $element, function () {
                            $document.data({ "keyboard-input" : "disabled" });
                            $(this).removeClass("keyboard-input");
                        });

                        $document.on('keydown', function () {
                            if ($(this).data("keyboard-input")==="enabled") {
                                var activeElem = $(".keyboard-input");

                                var top = parseFloat($(".keyboard-input .mCSB_container").position().top);
                                var activeElemPos = Math.abs(top);
                                var pixelsToScroll = 80;

                                if (e.which === 38) { //scroll up
                                    e.preventDefault();
                                    if (pixelsToScroll>activeElemPos) {
                                        activeElem.mCustomScrollbar("scrollTo","top");
                                    }
                                    else {
                                        activeElem.mCustomScrollbar("scrollTo",(activeElemPos-pixelsToScroll),{scrollInertia:400,scrollEasing:"easeOutCirc"});
                                    }
                                }
                                else if (e.which===40) { //scroll down
                                    e.preventDefault();
                                    activeElem.mCustomScrollbar("scrollTo",(activeElemPos+pixelsToScroll),{scrollInertia:400,scrollEasing:"easeOutCirc"});
                                }
                            }
                        });
                    }
                }
            };
        }
    ]);
