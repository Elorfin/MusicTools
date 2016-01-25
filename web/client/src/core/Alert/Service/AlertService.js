/**
 * Alert Service
 * @constructor
 */
var AlertService = function AlertService($timeout) {
    this.$timeout = $timeout;
};

// Set up dependency injection
AlertService.$inject = [ '$timeout' ];

/**
 * List of all current active alerts
 * @param alert
 */
AlertService.prototype.alerts = [];

/**
 * Display duration for the alert which are configured to be auto-hidden
 * @type {number}
 */
AlertService.prototype.displayDuration = 1000;

/**
 * Get active alerts
 * @returns {Array}
 */
AlertService.prototype.getAlerts = function getAlerts() {
    return this.alerts;
};

/**
 * Add an alert in the alerts stack
 * @param {string}  type
 * @param {string}  message
 * @param {boolean} [autoHide]
 */
AlertService.prototype.addAlert = function addAlert(type, message, autoHide) {
    var newAlert = {
        type     : type,
        message  : message
    };

    // Configure auto hide if needed
    if (autoHide) {
        newAlert.timeout = this.$timeout(function () {
            this.removeAlert(newAlert);
        }.bind(this), this.displayDuration);
    }

    // Add to the stack
    this.alerts.push(newAlert);
};

/**
 * Remove an alert from the alerts stack
 * @param {Object}  alert
 * @param {boolean} [clearTimeout]
 */
AlertService.prototype.removeAlert = function removeAlert(alert, clearTimeout) {
    var pos = this.alerts.indexOf(alert);
    if (-1 !== pos) {
        var alert = this.alerts.splice(pos, 1);

        // Clear timeout if needed
        if (alert.timeout && clearTimeout) {
            this.$timeout.cancel(alert.timeout);
        }
    }
};

// Register service into AngularJS
angular
    .module('Alert')
    .service('AlertService', AlertService);