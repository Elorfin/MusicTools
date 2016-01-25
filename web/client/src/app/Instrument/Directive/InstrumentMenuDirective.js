/**
 * Instrument menu
 * Used to select the current instrument, and if relevant the tuning (e.g. for Guitar or Bass)
 */
var InstrumentMenuDirective = function InstrumentMenuDirective($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Instrument/menu.html', 'Instrument'),
        replace: true
    };
};

// Set up dependency injection
InstrumentMenuDirective.$inject = [ '$partial' ];

// Register directive into AngularJS
angular
    .module('Instrument')
    .directive('instrumentMenu', InstrumentMenuDirective);