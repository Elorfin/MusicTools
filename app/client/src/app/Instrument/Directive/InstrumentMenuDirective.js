/**
 * Instrument menu
 * Used to select the current instrument, and if relevant the tuning (e.g. for Guitar or Bass)
 */
var InstrumentMenuDirective = function InstrumentMenuDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('Instrument/menu.html', 'app/Instrument'),
        replace: true
    };
};

// Set up dependency injection
InstrumentMenuDirective.$inject = [ '$client' ];

// Register directive into AngularJS
angular
    .module('Instrument')
    .directive('instrumentMenu', InstrumentMenuDirective);