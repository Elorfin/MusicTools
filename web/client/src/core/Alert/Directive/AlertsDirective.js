/**
 * Alerts Directive
 * Renders user messages
 */
var AlertsDirective = function AlertsDirective($client, $uibModal) {
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

                this.openDetail = function openDetail(alert) {
                    var modalInstance = $uibModal.open({
                        templateUrl : $client.getPartial('detail.html', 'core/Alert'),
                        controller  : [
                            'alert',
                            function DetailController(alert) {
                                this.alert = alert;
                            }
                        ],
                        controllerAs: 'detailCtrl',
                        windowClass : 'modal-' + alert.type,
                        resolve: {
                            alert: function () {
                                return alert;
                            }
                        }
                    });
                }
            }
        ]
    };
};

// Set up dependency injection
AlertsDirective.$inject = [ '$client', '$uibModal' ];

// Register directive into Angular JS
angular
    .module('Alert')
    .directive('alerts', AlertsDirective);