/**
 * Tuning Widget (Choose and Edit widgets)
 * @param   {Object} $client
 * @returns {Object}
 * @constructor
 */
var TuningWidgetDirective = function TuningWidgetDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('widget.html', 'app/Tuning'),
        replace: true,
        scope: {
            strings   : '=',
            headstock : '=',
            leftHanded: '=',
            tuning    : '=?'
        },
        bindToController: true,
        controllerAs: 'tuningWidgetCtrl',
        controller: 'TuningWidgetController',
        link: function link(scope, element, attrs, tuningWidgetCtrl) {
            var init = true;

            var canvas = element.find('canvas').get(0);

            tuningWidgetCtrl.draw(canvas);

            // Watch Headstock change
            scope.$watch(function () {
                return tuningWidgetCtrl.headstock;
            }, function (newValue, oldValue) {
                if (!init && newValue != oldValue) {
                    tuningWidgetCtrl.draw(canvas);
                }
            });

            // Watch Strings change
            scope.$watch(function () {
                return tuningWidgetCtrl.strings;
            }, function (newValue, oldValue) {
                if (!init && newValue != oldValue) {
                    tuningWidgetCtrl.draw(canvas);
                }
            });

            element.on('resize', function () {
                tuningWidgetCtrl.draw(canvas);
            });

            init = false;
        }/*,
        compile: function compile() {
            return {
                pre: function preLink(scope, element, attrs, tuningWidgetCtrl) {
                    tuningWidgetCtrl.dropdownOptions = {
                        setHeight: (element.height() - 70) + 'px'
                    };
                }
            }
        }*/
    };
};

// Set up dependency injection
TuningWidgetDirective.$inject = [ '$client' ];

// Inject directive into Angular JS
angular
    .module('Tuning')
    .directive('tuningWidget', TuningWidgetDirective);