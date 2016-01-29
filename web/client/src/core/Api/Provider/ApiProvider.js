var ApiProvider = function ApiProvider() {
    this.$get = function () {
        var provider = this;

        return {
            /**
             * Allow access to the API configuration at runtime
             */
            config: {
                protocol : provider.protocol,
                host     : provider.host,
                port     : provider.port,
                basePath : provider.basePath,
                fullPath : provider.fullPath
            },

            /**
             * Get API url for the path
             * @param {String} path
             */
            getUrl: function getUrl(path) {
                provider.getUrl(path);
            }
        };
    };
};

// Set up dependency injection
ApiProvider.$inject = [];

/**
 * Protocol used to call the API
 * @var {String}
 */
ApiProvider.prototype.protocol = 'http:';

/**
 * Hostname of the API
 * @var {String}
 */
ApiProvider.prototype.host     = 'localhost';

/**
 * Port number
 * @var {Number}
 */
ApiProvider.prototype.port     = 80;

/**
 * Base path from the API server root
 * @var {String}
 */
ApiProvider.prototype.basePath = null;

/**
 * Full path to the API server (generated on provider configuration)
 * @type {String}
 */
ApiProvider.prototype.fullPath = null;

/**
 * Configure API
 * @param {Object} configuration
 */
ApiProvider.prototype.configure = function configure(configuration) {
    if (configuration.protocol) {
        // Override default protocol
        this.protocol = configuration.protocol.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    if (configuration.host) {
        // Override default host
        this.host = configuration.host.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    if (configuration.port) {
        // Override default port
        this.port = configuration.port;
    }

    if (configuration.basePath) {
        // Override default base path
        this.basePath = configuration.basePath.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    // Generate full server path
    this.generateFullPath();
};

/**
 * Generate full path to the API server
 */
ApiProvider.prototype.generateFullPath = function () {
    var fullPath = '';
    if (this.protocol) {
        fullPath += this.protocol;
    }

    fullPath += '//';

    if (this.host) {
        fullPath += this.host;
    } else {
        console.error('$apiProvider : API host can not be empty.')
    }

    if (this.port) {
        fullPath += ':' + this.port;
    }

    if (this.basePath) {
        fullPath += '/' + this.basePath;
    }

    fullPath += '/';

    // Store generated path
    this.fullPath = fullPath;
};

/**
 * Get API url for the path
 * @param {String} path
 */
ApiProvider.prototype.getUrl = function getUrl(path) {
    if (!this.fullPath) {
        // API not configured
        console.error('$apiProvider : You must configure the provider before calling `getUrl`.');
    }

    return this.fullPath + path;
};

// Register provider into Angular JS
angular
    .module('Api')
    .provider('$api', ApiProvider);