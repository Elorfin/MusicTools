/**
 * Alert Service
 * @constructor
 */
var AlertService = function AlertService($timeout) {
    this.$timeout = $timeout;
};

// Set up dependency injection
AlertService.$inject = [ '$timeout' ];

AlertService.prototype.ERROR_TYPE   = 'danger';
AlertService.prototype.SUCCESS_TYPE = 'sucess';
AlertService.prototype.WARNING_TYPE = 'warning';
AlertService.prototype.INFO_TYPE    = 'info';

/**
 * List of all current active alerts
 * @param alert
 */
AlertService.prototype.alerts = [];

/**
 * Display duration for the alert which are configured to be auto-hidden
 * @type {number}
 */
AlertService.prototype.displayDuration = 5000;

/**
 * Get active alerts
 * @returns {Array}
 */
AlertService.prototype.getAlerts = function getAlerts() {
    return this.alerts;
};

/**
 * Shortcut to add a SUCCESS message
 * @param {Object}  message
 * @param {Object}  [action]
 * @param {boolean} [autoHide]
 */
AlertService.prototype.addSuccess = function addSuccess(message, action, autoHide) {
    this.addAlert(this.SUCCESS_TYPE, message, action, autoHide);
};

/**
 * Shortcut to add an ERROR message
 * @param {Object}  message
 * @param {Object}  [action]
 * @param {boolean} [autoHide]
 */
AlertService.prototype.addError = function addError(message, action, autoHide) {
    this.addAlert(this.ERROR_TYPE, message, action, autoHide);
};

/**
 * Shortcut to add a Warning message
 * @param {Object}  message
 * @param {Object}  [action]
 * @param {boolean} [autoHide]
 */
AlertService.prototype.addWarning = function addWarning(message, action, autoHide) {
    this.addAlert(this.WARNING_TYPE, message, action, autoHide);
};

/**
 * Shortcut to add an INFO message
 * @param {Object}  message
 * @param {Object}  [action]
 * @param {boolean} [autoHide]
 */
AlertService.prototype.addInfo = function addInfo(message, action, autoHide) {
    this.addAlert(this.INFO_TYPE, message, action, autoHide);
};

/**
 * Add an alert in the alerts stack
 * @param {string}  type - success, error, warning, info
 * @param {Object}  message
 * @param {Object}  [action]
 * @param {boolean} [autoHide]
 */
AlertService.prototype.addAlert = function addAlert(type, message, action, autoHide) {
    var alert = angular.merge({ type: type, action: action ? action : null }, message);

    // Configure auto hide if needed
    if (autoHide) {
        alert.timeout = this.$timeout(function () {
            this.removeAlert(alert);
        }.bind(this), this.displayDuration);
    }

    // Add to the stack
    this.alerts.push(alert);
};

/**
 * Remove an alert from the alerts stack
 * @param {Object}  alert
 * @param {boolean} [clearTimeout]
 */
AlertService.prototype.removeAlert = function removeAlert(alert, clearTimeout) {
    var pos = this.alerts.indexOf(alert);
    if (-1 !== pos) {
        var alertObj = this.alerts.splice(pos, 1);

        // Clear timeout if needed
        if (alertObj.timeout && clearTimeout) {
            this.$timeout.cancel(alertObj.timeout);
        }
    }
};

// Register service into Angular JS
angular
    .module('Alert')
    .service('AlertService', AlertService);