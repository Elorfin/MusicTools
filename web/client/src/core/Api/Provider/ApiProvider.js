var ApiProvider = function ApiProvider() {
    this.$get = function () {
        var provider = this;

        return {
            /**
             * Allow access to the API configuration at runtime
             */
            config: {
                serverName : provider.serverName,
                basePath   : provider.basePath,
                uploadPath : provider.uploadPath
            },

            /**
             * Get API url for the path
             * @param {String} path
             */
            getUrl: function getUrl(path) {
                return provider.getUrl(path);
            },

            /**
             * Get uploaded file
             * @param {String} path
             */
            getUpload: function getUpload(path) {
                return provider.getUpload(path);
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
ApiProvider.prototype.port       = 80;

/**
 * Full server name (generated on provider configuration)
 * @type {String}
 */
ApiProvider.prototype.serverName = null;

/**
 * Base path from the API server root
 * @var {String}
 */
ApiProvider.prototype.basePath   = null;

/**
 * Path to uploads
 * @type {String}
 */
ApiProvider.prototype.uploadPath = null;

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

    if (configuration.uploadPath) {
        // Override default upload path
        this.uploadPath = configuration.uploadPath.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    // Generate full server path
    this.generateServerName();
};

/**
 * Generate full path to the API server
 */
ApiProvider.prototype.generateServerName = function generateServerName() {
    var serverName = '';
    if (this.protocol) {
        serverName += this.protocol;
    }

    serverName += '//';

    if (this.host) {
        serverName += this.host;
    } else {
        console.error('$apiProvider : API host can not be empty.')
    }

    if (this.port) {
        serverName += ':' + this.port;
    }

    // Store generated name
    this.serverName = serverName;
};

/**
 * Get API url for the path
 * @param {String} path
 */
ApiProvider.prototype.getUrl = function getUrl(path) {
    if (!this.serverName) {
        // API not configured
        console.error('$apiProvider : You must configure the provider before calling `getUrl`.');
    }

    return (this.serverName + '/' + this.basePath + '/' + path.replace(/^\/+|\/+$/g, ''));
};

/**
 * Get uploaded file
 * @param {String} path
 */
ApiProvider.prototype.getUpload = function getUpload(path) {
    if (!this.serverName) {
        // API not configured
        console.error('$apiProvider : You must configure the provider before calling `getUpload`.');
    }

    return (this.serverName + '/' + this.uploadPath + '/' + path.replace(/^\/+|\/+$/g, ''));
};

// Register provider into Angular JS
angular
    .module('Api')
    .provider('$api', ApiProvider);