/**
 * API Service
 * @returns {ApiService}
 * @constructor
 */
var ApiService = function ApiService() {

};

// Set up dependency injection
ApiService.$inject = [];

/**
 * Server base path
 * @type {String}
 */
ApiService.prototype.server       = '/MusicTools/web/app_dev.php';

ApiService.prototype.resourcePath = '/MusicTools/web/';

ApiService.prototype.assetPath    = '/MusicTools/web/client/public/';

/**
 * Get server
 * @returns {String}
 */
ApiService.prototype.getServer = function getServer() {
    return this.server;
};

ApiService.prototype.getResourcePath = function getResourcePath() {
    return this.resourcePath;
};

ApiService.prototype.getAssetPath = function getAssetPath() {
    return this.assetPath;
};

// Inject Service into AngularJS
angular
    .module('Api')
    .service('ApiService', ApiService);