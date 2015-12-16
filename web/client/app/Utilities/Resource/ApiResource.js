var ApiResource = function ApiResourceConstructor($http, $q, Upload, ApiService) {
    // Initialize service container
    this.services = {};

    // Store services
    this.services['$http']  = $http;
    this.services['upload'] = Upload;
    this.services['$q']     = $q;
    this.services['api']    = ApiService;

    // Validate required properties
    if (null === this.name) {
        console.error('An ApiResource must have a property `name`.');
    }

    if (null === this.path) {
        console.error('An ApiResource must have a property `path`.');
    }
};

// Set up dependency injection
ApiResource.$inject = [ '$http', '$q', 'Upload', 'ApiService' ];

/**
 * Name of the Resource (used as translation key)
 * @type {string}
 */
ApiResource.prototype.name = null;

/**
 * Path of the API resource
 * @type {string}
 */
ApiResource.prototype.path = null;

/**
 * List of elements
 * @type {Array}
 */
ApiResource.prototype.elements = [];

/**
 * Build API path of the resource
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
 * List existing resources filtered by `queryParams`
 * @param   {Object}  [queryParams] - The parameters used to filter the list of elements
 * @param   {boolean} [refresh]     - If true, a new request will be sent to the server to grab the list even if it's already loaded
 * @returns {Array}                 - The list of available resources
 */
ApiResource.prototype.query = function queryResources(queryParams, refresh) {
    var deferred = this.services.$q.defer(); // Initialize promise

    if (!this.elements || this.elements.length === 0 || this.refresh) {
        // Load data from server
        this.services.$http
            // Call API
            .get(this.getFullPath())

            // API results
            .then(
                // Success callback
                function onServerSuccess(response) {
                    this.setElements(response.data);

                    deferred.resolve(response.data);
                }.bind(this),

                // Error callback
                function onServerError(response) {
                    deferred.reject(response);
                }
            );
    } else {
        // Load data from local
        var tempElements = this.elements;

        deferred.resolve(tempElements);
    }

    this.elements = deferred.promise;

    return this.elements;
};

/**
 * Set elements
 * @param {Array} elements
 */
ApiResource.prototype.setElements = function setElements(elements) {
    this.elements = elements;
};

/**
 * Count elements
 * @returns {Number} - The number of resources in the list
 */
ApiResource.prototype.count = function countResources() {
    return this.elements.length;
};

/**
 * Find an existing entity
 * @param   {Object} params - The identifier of the resource to search
 * @returns {Object}        - The resource found
 */
ApiResource.prototype.get = function getResource(params) {
    // Load data from server
    var deferred = this.services.$q.defer(); // Initialize promise

    this.services.$http
        // Call API
        .get(this.getFullPath(params))

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
 * Create a new resource
 * @param {Object} resource - The resource to create
 */
ApiResource.prototype.new = function newResource(resource) {
    var deferred = this.services.$q.defer(); // Initialize promise

    // Build request
    var request = {
        method : 'POST',
        url    : this.getFullPath(resource),
        data   : resource
    };

    this.services.upload
        // Call API
        .upload(request)

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
 * @param {Object} resource - The resource to update
 */
ApiResource.prototype.update = function updateResource(resource) {
    var deferred = this.services.$q.defer(); // Initialize promise

    // Build request
    var request = {
        method : 'PUT',
        url    : this.getFullPath(resource),
        data   : {
            data: resource
        }
    };

    this.services.upload
        // Call API
        .upload(request)

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
 * @param {Object} resource - The resource to remove
 */
ApiResource.prototype.remove = function removeResource(resource) {

};

/**
 * Apply a callback to all resources
 * @param   {Function} callback - The callback to apply
 */
ApiResource.prototype.apply = function apply(callback) {
    if (typeof callback === 'function') {
        for (var i = 0; i < this.elements.length; i++) {
            callback(this.elements[i]);
        }
    }
};

// Register service into Angular JS
angular
    .module('Utilities')
    .service('ApiResource', ApiResource);
