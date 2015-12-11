var ApiResource = function ApiResourceConstructor($http, $q, ApiService, AlertService) {
    // Initialize service container
    this.services = {};

    // Store services
    this.services['$http'] = $http;
    this.services['$q']    = $q;
    this.services['api']   = ApiService;
    this.services['alert'] = AlertService;

    // Validate required properties
    if (null === this.name) {
        console.error('An ApiResource must have a property `name`.');
    }

    if (null === this.path) {
        console.error('An ApiResource must have a property `path`.');
    }
};

// Set up dependency injection
ApiResource.$inject = ['$http', '$q', 'ApiService', 'AlertService'];

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
 * Force the refresh of the elements list
 * @type {boolean}
 */
ApiResource.prototype.refreshElements = false;

/**
 * Build API path of the resource
 * @returns {string}
 */
ApiResource.prototype.getFullPath = function buildPath(params) {
    var fullPath = this.services.api.getServer() + this.path;

    // Extracts params from path (delimited by {})
    var matches = this.path.match(/{([^}]+)}/gi);
    if (matches) {
        // Replace params vith resource values
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

    if (!this.elements || this.elements.length === 0 || this.refreshElements || this.refresh) {
        // Load data from server
        // Call API
        this.services.$http
            .get(this.getFullPath())

            // Success callback
            .success(function onServerSuccess(response) {
                this.refreshElements = false;

                this.setElements(response);

                deferred.resolve(response);
            }.bind(this))

            // Error callback
            .error(function onServerError(response) {
                deferred.reject(response);
            });
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

    // Call API
    this.services.$http
        .get(this.getFullPath(params))

        // Success callback
        .success(function onServerSuccess(response) {
            deferred.resolve(response);
        }.bind(this))

        // Error callback
        .error(function onServerError(response) {
            deferred.reject(response);
        });

    return deferred.promise;
};

/**
 * Save a resource
 * @param {object} resource - The resource to save
 */
ApiResource.prototype.save = function saveResource(resource) {
    if (resource[this.identifier]) {
        // Identifier field is NOT empty => so it's an existing resource
        this.update(resource);
    } else {
        // Identifier field is empty => so it's a new resource
        this.new(resource);
    }
};

/**
 * Create a new resource
 * @param {Object} resource - The resource to create
 */
ApiResource.prototype.new = function newResource(resource) {
    // Load data from server
    var deferred = this.services.$q.defer(); // Initialize promise

    // Call API
    this.services.$http
        .post(this.getFullPath(resource))

        // Success callback
        .success(function onServerSuccess(response) {
            deferred.resolve(response);
        }.bind(this))

        // Error callback
        .error(function onServerError(response) {
            deferred.reject(response);
        });

    return deferred.promise;
};

/**
 * Update an existing resource
 * @param {Object} resource - The resource to update
 */
ApiResource.prototype.update = function updateResource(resource) {
    var method = 'POST';
    var url    = this.apiService.getServer() + '/songs';
    if (!this.isNew()) {
        method = 'PUT';
        url   += '/' + this.entity.id;
    }

    // Build request
    var requestConfig = {
        url: url,
        method: method,
        data: {
            musictools_songbookbundle_song: this.entity
        }
    };

    // Call server
    this.uploadService.upload(requestConfig).then(
        // Success callback
        function onServerSuccess(resp) {
            if (resp.data.form) {
                angular.merge(this.form, resp.data.form);
            }
        }.bind(this),
        // Error callback
        function onServerError(resp) {

        }
    );
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
