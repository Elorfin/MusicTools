/**
 * Alerts Directive
 * Renders user messages
 */
var AlertsDirective = function AlertsDirective($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('alerts.html', 'Alert', true),
        replace: true,
        controllerAs: 'alertsCtrl',
        controller: [
            'AlertService',
            function AlertsController(AlertService) {
                // Expose service to template
                this.alerts      = AlertService.getAlerts();
                this.removeAlert = function removeAlert(alert) {
                    AlertService.removeAlert(alert, true);
                };
            }
        ]
    };
};

// Set up dependency injection
AlertsDirective.$inject = [ '$partial' ];

// Register directive into Angular JS
angular
    .module('Alert')
    .directive('alerts', AlertsDirective);