/**
 * Resource : Interval
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var IntervalResource = function IntervalResource($http, $q, $api) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
IntervalResource.prototype = Object.create(ApiResource.prototype);
IntervalResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
IntervalResource.prototype.type = 'intervals';

/**
 * Path of the API resource
 * @type {string}
 */
IntervalResource.prototype.path = '/intervals/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('IntervalResource', IntervalResource);
