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
            strings: '='
        }
    };
};

// Set up dependency injection
TuningWidgetDirective.$inject = [ '$client' ];

// Inject directive into Angular JS
angular
    .module('Tuning')
    .directive('tuningWidget', TuningWidgetDirective);