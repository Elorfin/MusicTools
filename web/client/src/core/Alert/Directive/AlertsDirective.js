/**
 * Alerts Directive
 * Renders user messages
 */
var AlertsDirective = function AlertsDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('alerts.html', 'core/Alert'),
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
AlertsDirective.$inject = [ '$client' ];

// Register directive into Angular JS
angular
    .module('Alert')
    .directive('alerts', AlertsDirective);