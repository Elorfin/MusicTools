/**
 * Base API Resource
 * Manages API server data
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var ApiResource = function ApiResource($http, $q, ApiService) {
    // Store services
    this.services['$http'] = $http;
    this.services['$q']    = $q;
    this.services['api']   = ApiService;

    // Validate required properties
    if (null === this.type) {
        console.error('An ApiResource must have a property `type`.');
    }

    if (null === this.path) {
        console.error('An ApiResource must have a property `path`.');
    }
};

// Set up dependency injection
ApiResource.$inject = [ '$http', '$q', 'ApiService' ];

/**
 * List of dependencies
 * @type {Object}
 */
ApiResource.prototype.services = {};

/**
 * Type of the Resource
 * @type {string}
 */
ApiResource.prototype.type = null;

/**
 * Path of the API resource
 * @type {string}
 */
ApiResource.prototype.path = null;

/**
 * List existing resources filtered by `queryParams`
 *
 * @param   {Object}  [queryParams] - The parameters used to filter the list of elements
 * @returns {Array}                 - The list of available resources
 */
ApiResource.prototype.query = function queryResources(queryParams) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(queryParams));

    // Call API
    this.services.$http(request).then(
        // Success callback
        function onServerSuccess(response) {
            // Set default data if empty
            var data = response.data.data ? response.data.data : [];

            deferred.resolve(data);
        },

        // Error callback
        function onServerError(response) {
            deferred.reject(response);
        }
    );

    return deferred.promise;
};

/**
 * Find an existing entity
 *
 * @param   {Object} params - The identifier of the resource to search
 * @returns {Object}        - The resource found
 */
ApiResource.prototype.get = function getResource(params) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(params));

    // Call API
    this.services.$http(request).then(
        // Success callback
        function onServerSuccess(response) {
            // Set default data if empty
            var data = response.data.data ? response.data.data : {};

            deferred.resolve(data);
        },

        // Error callback
        function onServerError(response) {
            deferred.reject(response);
        }
    );

    return deferred.promise;
};

/**
 * Create a new resource
 *
 * @param {Object} resource - The resource to create
 */
ApiResource.prototype.new = function newResource(resource) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(resource), 'POST', resource);

    // Call API
    this.services.$http(request)

        // API results
        .then(
            // Success callback
            function onServerSuccess(response) {
                deferred.resolve(response.data);
            },

            // Error callback
            function onServerError(response) {
                deferred.reject(response);
            }
        );

    return deferred.promise;
};

/**
 * Update an existing resource
 *
 * @param {Object} resource - The resource to update
 */
ApiResource.prototype.update = function updateResource(resource) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(resource), 'PUT', resource);

    // Call API
    this.services.$http(request)

        // API results
        .then(
            // Success callback
            function onServerSuccess(response) {
                deferred.resolve(response.data);
            },

            // Error callback
            function onServerError(response) {
                deferred.reject(response);
            }
        );

    return deferred.promise;
};

/**
 * Remove a resource
 *
 * @param {Object} resource - The resource to remove
 */
ApiResource.prototype.remove = function removeResource(resource) {

};

/**
 * Apply a callback to all resources
 *
 * @param {Function} callback - The callback to apply
 */
ApiResource.prototype.apply = function apply(callback) {
    if (typeof callback === 'function') {
        for (var i = 0; i < this.elements.length; i++) {
            callback(this.elements[i]);
        }
    }
};

/**
 * Build API path of the resource
 *
 * @returns {string}
 */
ApiResource.prototype.getFullPath = function buildPath(params) {
    var fullPath = this.services.api.getServer() + this.path;

    // Extracts params from path (delimited by {})
    var matches = this.path.match(/{([^}]+)}/gi);
    if (matches) {
        // Replace params with resource values
        for (var i = 0; i < matches.length; i++) {
            var resourceProperty = matches[i].replace('{', '').replace('}', '');
            var resourceValue = '';
            if (params && params.hasOwnProperty(resourceProperty)) {
                resourceValue = params[resourceProperty];
            }

            fullPath = fullPath.replace(matches[i], resourceValue);
        }
    }

    // Clean slashes
    while (fullPath.substr(-1) === '/') {
        fullPath = fullPath.substr(0, fullPath.length - 1);
    }

    return fullPath;
};

/**
 * Set elements
 *
 * @param {Array} elements
 */
ApiResource.prototype.setElements = function setElements(elements) {
    this.elements = elements;
};

/**
 * Count elements
 *
 * @returns {Number} - The number of resources in the list
 */
ApiResource.prototype.count = function countResources() {
    return this.elements.length;
};

/**
 * Get request
 *
 * @param   {String} url      - The URL to call
 * @param   {String} [method] - The HTTP method to use to call the server API
 * @param   {Object} [data]   - The data to send to the API server
 *
 * @returns {Object}          - The Request
 */
ApiResource.prototype.getRequest = function createRequest(url, method, data) {
    var request = {};

    request.url     = url;

    // Set default method to GET
    request.method  = method ? method : 'GET';

    // Add data if needed
    request.data    = data ? { data: data } : null;

    // Enable GET requests caching
    request.cache   = true;

    // Force the Request Content-Type to be compliant with the json api specification
    request.headers = {
        'Accept'       : 'application/vnd.api+json',
        'Content-Type' : 'application/vnd.api+json'
    };

    return request;
};

// Register service into Angular JS
angular
    .module('Utilities')
    .service('ApiResource', ApiResource);
