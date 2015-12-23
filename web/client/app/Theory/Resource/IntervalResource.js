/**
 * Resource : Interval
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var IntervalResource = function IntervalResourceConstructor($http, $q, ApiService) {
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
IntervalResource.prototype.type = 'interval';

/**
 * Path of the API resource
 * @type {string}
 */
IntervalResource.prototype.path = '/intervals/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('IntervalResource', IntervalResource);
