/**
 * Base API Resource
 * Manages API server data
 *
 * @param {Object}       $http
 * @param {Object}       $cacheFactory
 * @param {Object}       $q
 * @param {Object}       $api
 * @param {AlertService} AlertService
 * @constructor
 */
var ApiResource = function ApiResource($http, $cacheFactory, $q, $api, AlertService) {
    // Store services
    this.services['$http']         = $http;
    this.services['$cacheFactory'] = $cacheFactory;
    this.services['$q']            = $q;
    this.services['$api']          = $api;
    this.services['AlertService']  = AlertService;

    // Validate required properties
    if (null === this.type) {
        console.error('An ApiResource must have a property `type`.');
    }

    if (null === this.path) {
        console.error('An ApiResource must have a property `path`.');
    }
};

// Set up dependency injection
ApiResource.$inject = [ '$http', '$cacheFactory', '$q', '$api', 'AlertService' ];

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
 * If TRUE, the http cache will be emptied and the next query resent
 * @type {boolean}
 */
ApiResource.prototype.forceReload = false;

/**
 * Initialize an empty Resource Object
 * @returns {Object}
 */
ApiResource.prototype.init = function init() {
    return {
        id            : null,
        type          : this.type,
        attributes    : {},
        relationships : {}
    };
};

/**
 *
 * @param   {object} resource
 * @param   {string} relationshipName
 * @returns {boolean}
 */
ApiResource.prototype.hasRelationship = function hasRelationship(resource, relationshipName) {
    if (resource.relationships && resource.relationships[relationshipName] && null !== resource.relationships[relationshipName] && 0 !== resource.relationships[relationshipName].length) {
        return true;
    }

    return false;
};

/**
 *
 * @param   {object} resource
 * @param   {string} relationshipName
 * @returns {Object|null}
 */
ApiResource.prototype.getRelationship = function getRelationship(resource, relationshipName) {
    var relationship = null;
    if (this.hasRelationship(resource, relationshipName)) {
        relationship = resource.relationships[relationshipName].data;
    }

    return relationship;
};

ApiResource.prototype.addRelationship = function addRelationship(resource, relationshipName, relationshipData) {
    if (!resource.relationships) {
        resource.relationships = {};
    }

    resource.relationships[relationshipName] = {
        data: relationshipData
    };
};

ApiResource.prototype.removeRelationship = function removeRelationship(resource, relationshipName, relationshipData) {
    if (resource.relationships && resource.relationships[relationshipName] && resource.relationships[relationshipName].data) {
        if (resource.relationships[relationshipName].data instanceof Array) {
            // Collection of resource objects
        } else {
            // Single resource object

        }
    }

    resource.relationships[relationshipName] = {
        data: relationshipData
    };
};

/**
 * List existing resources filtered by `queryParams`
 *
 * @param   {Object}  [queryParams] - The parameters used to filter the list of elements
 * @returns {promise}               - The list of available resources
 */
ApiResource.prototype.query = function queryResources(queryParams) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    var fullPath = this.getFullPath(queryParams);

    // Build request
    var request = this.getRequest(fullPath);

    if (this.forceReload) {
        var $httpDefaultCache = this.services.$cacheFactory.get('$http');
        $httpDefaultCache.remove(fullPath);
    }

    // Call API
    this.services.$http(request).then(
        // Success callback
        function onServerSuccess(response) {
            // Set default data if empty
            var data = response.data.data ? response.data.data : [];

            this.forceReload = false;

            deferred.resolve(data);
        }.bind(this),

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
    this.services.$http(request)
        .then(
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
                // Invalid cache
                this.forceReload = true;

                // Update Resource data with server response
                angular.copy(response.data.data, resource);

                // Display message to User
                this.services['AlertService'].addAlert('success', 'Entity created', true);

                // Resolve promise
                deferred.resolve(response.data);
            }.bind(this),

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
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(resource), 'DELETE', resource);

    // Call API
    this.services.$http(request)

        // API results
        .then(
            // Success callback
            function onServerSuccess(response) {
                this.forceReload = true;

                deferred.resolve(response);
            }.bind(this),

            // Error callback
            function onServerError(response) {
                deferred.reject(response);
            }
        );

    return deferred.promise;
};

/**
 * Build API path of the resource
 *
 * @returns {string}
 */
ApiResource.prototype.getFullPath = function buildPath(params) {
    var fullPath = this.services.$api.getUrl(this.path);

    // Extracts params from path (delimited by {})
    var matches = this.path.match(/{([^}]+)}/gi);
    if (matches) {
        // Replace params with resource values
        for (var i = 0; i < matches.length; i++) {
            var resourceProperty = matches[i].replace('{', '').replace('}', '');
            var resourceValue = '';
            if (params && params.hasOwnProperty(resourceProperty) && null != params[resourceProperty]) {
                resourceValue = params[resourceProperty];
            }

            // Inject value into the path
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
    .module('Api')
    .service('ApiResource', ApiResource);
