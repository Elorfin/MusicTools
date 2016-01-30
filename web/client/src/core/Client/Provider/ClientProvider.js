/**
 * Client Provider
 * @constructor
 */
var ClientProvider = function ClientProvider() {
    this.$get = function () {
        var provider = this;

        return {
            /**
             * Allow access to the Client configuration at runtime
             */
            config: {
                basePath   : provider.basePath,
                srcDir     : provider.srcDir,
                assetDir   : provider.assetDir,
                partialDir : provider.partialDir
            },

            /**
             * Get Asset URL
             * @param {String} path
             */
            getAsset: function getAsset(path) {
                return provider.getAsset(path);
            },

            /**
             * Get Partial path
             * @param {String} path
             */
            getPartial: function getPartial(path, module) {
                return provider.getPartial(path, module);
            }
        };
    };
};

// Set up dependency injection
ClientProvider.$inject = [];

/**
 * Client sources base path
 * @type {string}
 */
ClientProvider.prototype.basePath   = null;

/**
 * Directory of the client sources
 * @type {string}
 */
ClientProvider.prototype.srcDir     = 'src';

/**
 * Assets directory
 * @type {string}
 */
ClientProvider.prototype.assetDir   = 'public';

/**
 * Partials directory
 * @type {string}
 */
ClientProvider.prototype.partialDir = 'Partial';

/**
 * Configure provider
 * @param {Object} configuration
 */
ClientProvider.prototype.configure = function configure(configuration) {
    if (configuration.basePath) {
        // Override default base path
        this.basePath = configuration.basePath.replace(/\/+$/, ""); // Trim last slashes
    }

    if (configuration.srcDir) {
        // Override default asset directory
        this.srcDir = configuration.srcDir.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    if (configuration.assetDir) {
        // Override default asset directory
        this.assetDir = configuration.assetDir.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    if (configuration.partialDir) {
        // Override default partial directory
        this.partialDir = configuration.partialDir.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }
};

/**
 * Get Asset path
 * @param {String} path
 */
ClientProvider.prototype.getAsset = function getAsset(path) {
    return this.basePath + '/' + this.assetDir + '/' + path.replace(/^\/+|\/+$/g, '');
};

/**
 * Get Partial path
 * @param {String} path
 * @param {String} module
 */
ClientProvider.prototype.getPartial = function getPartial(path, module) {
    return this.basePath + '/' + this.srcDir + '/' + module + '/' + this.partialDir + '/' + path.replace(/^\/+|\/+$/g, '');
};

// Register provider into Angular JS
angular
    .module('Client')
    .provider('$client', ClientProvider);