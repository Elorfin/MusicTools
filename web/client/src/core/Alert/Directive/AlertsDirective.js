/**
 * Alerts Directive
 * Renders user messages
 */
angular
    .module('Alert')
    .directive('alerts', [
        '$partial',
        function AlertsDirective($partial) {
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
        }
    ]);