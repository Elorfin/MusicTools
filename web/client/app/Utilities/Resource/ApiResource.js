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
 * Field to use as identifier for the API
 * @type {string}
 */
ApiResource.prototype.identifier = 'id';

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
 * List existing resources filtered by `queryParams`
 * @param   {Object}  [queryParams] - The parameters used to filter the list of elements
 * @param   {boolean} [refresh]     - If true, a new request will be sent to the server to grab the list even if it's already loaded
 * @returns {Array}                 - The list of available resources
 */
ApiResource.prototype.query = function queryResources(queryParams, refresh) {
    if (!this.elements || this.elements.length === 0 || this.refreshElements || this.refresh) {
        // Load data from server
        var deferred = this.services.$q.defer(); // Initialize promise
        this.elements = deferred.promise;

        // Call API
        this.services.$http
            .get(this.services.api.getServer() + this.path)

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
    }

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
 * @param   {number} identifier - The identifier of the resource to search
 * @returns {Object}            - The resource found
 */
ApiResource.prototype.get = function getResource(identifier) {
    // Load data from server
    var deferred = this.services.$q.defer(); // Initialize promise

    // Call API
    this.services.$http
        .get(this.services.api.getServer() + this.path + '/' + identifier)

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

};

/**
 * Get definition of the form for new Resource
 */
ApiResource.prototype.newForm = function newFormResource() {

};

/**
 * Update an existing resource
 * @param {Object} resource - The resource to update
 */
ApiResource.prototype.update = function updateResource(resource) {

};

/**
 * Get definition of the form for existing Resource
 * @param {Object} resource - The resource to edit
 */
ApiResource.prototype.editForm = function editFormResource(resource) {

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
