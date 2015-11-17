var SongResource = function SongResourceConstructor($http, $q, ApiService, AlertService) {
    // Initialize service container
    this.services = {};

    // Store services
    this.services['$http'] = $http;
    this.services['$q']    = $q;
    this.services['api']   = ApiService;
    this.services['alert'] = AlertService;
};

/**
 * Name of the Resource (used as translation key)
 * @type {string}
 */
SongResource.prototype.name = 'song';

/**
 * Path of the API resource
 * @type {string}
 */
SongResource.prototype.basePath = '/songs';

/**
 * Field to use as identifier for the API
 * @type {string}
 */
SongResource.prototype.identifier = 'id';

/**
 * List of elements
 * @type {Array}
 */
SongResource.prototype.elements = [];

/**
 * Force the refresh of the elements list
 * @type {boolean}
 */
SongResource.prototype.refreshElements = false;

/**
 * List existing resources filtered by `queryParams`
 * @param   {Object}  [queryParams] - The parameters used to filter the list of elements
 * @param   {boolean} [refresh]     - If true, a new request will be sent to the server to grab the list even if it's already loaded
 * @returns {Array}                 - The list of available resources
 */
SongResource.prototype.query = function queryResources(queryParams, refresh) {
    if (!this.elements || this.elements.length === 0 || this.refreshElements || this.refresh) {
        // Load data from server
        var deferred = this.services.$q.defer(); // Initialize promise
        this.elements = deferred.promise;

        // Call API
        this.services.$http
            .get(this.services.api.getServer() + this.basePath)

            // Success callback
            .success(function onServerSuccess(response) {
                this.refreshElements = false;

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
 * Count elements
 * @returns {Number} - The number of resources in the list
 */
SongResource.prototype.count = function countResources() {
    return this.elements.length;
};

/**
 * Find an existing entity
 * @param   {number} identifier - The identifier of the resource to search
 * @returns {Object}            - The resource found
 */
SongResource.prototype.get = function getResource(identifier) {
    return {};
};

/**
 * Save a resource
 * @param {object} resource - The resource to save
 */
SongResource.prototype.save = function saveResource(resource) {
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
SongResource.prototype.new = function newResource(resource) {

};

/**
 * Get definition of the form for new Resource
 */
SongResource.prototype.newForm = function newFormResource() {

};

/**
 * Update an existing resource
 * @param {Object} resource - The resource to update
 */
SongResource.prototype.update = function updateResource(resource) {

};

/**
 * Get definition of the form for existing Resource
 * @param {Object} resource - The resource to edit
 */
SongResource.prototype.editForm = function editFormResource(resource) {

};

/**
 * Remove a resource
 * @param {Object} resource - The resource to remove
 */
SongResource.prototype.remove = function removeResource(resource) {

};

// Register service into Angular JS
angular
    .module('SongBook')
    .service('SongResource', [ '$http', '$q', 'ApiService', 'AlertService', SongResource ]);
