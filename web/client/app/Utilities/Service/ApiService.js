/**
 * API Service
 * @returns {ApiService}
 * @constructor
 */
var ApiService = function ApiServiceConstructor() {

};

/**
 * Server base path
 * @type {String}
 */
ApiService.prototype.server = '/MusicTools/web/app_dev.php';

/**
 * Get server
 * @returns {String}
 */
ApiService.prototype.getServer = function getServer() {
    return this.server;
};

// Inject Service into AngularJS
angular
    .module('Utilities')
    .service('ApiService', [ ApiService ]);