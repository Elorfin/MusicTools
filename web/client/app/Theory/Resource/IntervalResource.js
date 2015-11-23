var IntervalResource = function IntervalResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
IntervalResource.prototype = Object.create(ApiResource.prototype);
IntervalResource.$inject = ApiResource.$inject;

/**
 * Name of the Resource (used as translation key)
 * @type {string}
 */
IntervalResource.prototype.name = 'interval';

/**
 * Path of the API resource
 * @type {string}
 */
IntervalResource.prototype.path = '/intervals';

/**
 * List existing resources filtered by `queryParams`
 * @param   {Object}  [queryParams] - The parameters used to filter the list of elements
 * @param   {boolean} [refresh]     - If true, a new request will be sent to the server to grab the list even if it's already loaded
 * @returns {Array}                 - The list of available resources
 */
IntervalResource.prototype.query = function query(queryParams, refresh) {
    var elements = ApiResource.prototype.query.apply(this, arguments);
    if (!elements instanceof Array) {
        elements.then(function elementsLoaded(result) {
            return result;
        }.bind(this));
    }

    return elements;
};

// Register service into Angular JS
angular
    .module('Utilities')
    .service('IntervalResource', IntervalResource);
