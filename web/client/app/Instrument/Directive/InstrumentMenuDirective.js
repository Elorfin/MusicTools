/**
 * Instrument menu
 * Used to select the current instrument, and if relevant the tuning (e.g. for Guitar or Bass)
 */
var InstrumentMenuDirective = function InstrumentMenuDirectiveConstructor() {
    return {
        restrict: 'E',
        templateUrl: '../app/Instrument/Partial/menu.html',
        replace: true
    };
};

// Register directive into AngularJS
angular
    .module('Instrument')
    .directive('instrumentMenu', InstrumentMenuDirective);