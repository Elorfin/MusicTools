/**
 * Alerts Directive
 * Renders user messages
 */
angular
    .module('Alert')
    .directive('alerts', [
        function AlertsDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Alert/Partial/alerts.html',
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