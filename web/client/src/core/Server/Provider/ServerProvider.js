/**
 * Server Provider
 * @constructor
 */
var ServerProvider = function ServerProvider() {
    this.$get = function () {
        var provider = this;

        return {
            paths: {
                /**
                 * Access to the Data API
                 * @param relativePath
                 */
                getApi: function getApi(relativePath) {
                    provider.getApi(relativePath);
                },

                getResource: function getResource(relativePath) {
                    provider.getResource(relativePath);
                },

                /**
                 * Access to the client assets
                 * @param relativePath
                 */
                getAsset: function getAsset(relativePath) {
                    provider.getAsset(relativePath);
                },

                /**
                 * Access to the client partials
                 * @param relativePath
                 * @param module
                 * @param isCore
                 */
                getPartial: function (relativePath, module, isCore) {
                    provider.getPartial(relativePath, module, isCore);
                }
            }
        };
    };
};

// Set up dependency injection
ServerProvider.$inject = [];

/**
 * Server base path
 * @type {String}
 */
ServerProvider.prototype.api       = '/MusicTools/web/app_dev.php';

ServerProvider.prototype.resourcePath = '/MusicTools/web/';

ServerProvider.prototype.assetPath    = '/MusicTools/web/client/public/';

/**
 * Configure Server URLs
 * @param config
 */
ServerProvider.prototype.configure = function configure(config) {

};

ServerProvider.prototype.getApi = function getApi(relativePath) {

};

ServerProvider.prototype.getResource = function getResource(relativePath) {

};

ServerProvider.prototype.getAsset = function getAsset(relativePath) {

};

ServerProvider.prototype.getPartial = function getPartial(relativePath, module, isCore) {

};

// Register provider into Angular JS
angular
    .module('Server')
    .provider('$server', ServerProvider);