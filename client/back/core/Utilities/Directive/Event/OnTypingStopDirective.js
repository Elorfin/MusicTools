/**
 * On Typing Stop Directive
 * Executes a callback when the User stop typing
 * @returns {{restrict: string, link: link}}
 * @constructor
 */
var OnTypingStopDirective = function OnTypingStopDirective() {
    return {
        restrict: 'A',
        link: function link(scope, element, attr) {
            var typingTimer;
            var stopTypingInterval = 1000; // There is an average of 160ms split-time between key press when someone type

            element.on('keyup', function onKeyUp() {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(function () {
                    scope.$eval(attr.onTypingStop);
                }, stopTypingInterval);
            });

            element.on('keydown', function () {
                clearTimeout(typingTimer);
            });
        }
    };
};

// Set up dependency injection
OnTypingStopDirective.$inject = [];

// Register directive into AngularJS
angular
    .module('Utilities')
    .directive('onTypingStop', OnTypingStopDirective);