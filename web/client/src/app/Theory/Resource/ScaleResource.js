/**
 * Resource : Scale
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var ScaleResource = function ScaleResource($http, $q, $api) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
ScaleResource.prototype = Object.create(ApiResource.prototype);
ScaleResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
ScaleResource.prototype.type = 'scale';

/**
 * Path of the API resource
 * @type {string}
 */
ScaleResource.prototype.path = '/scales/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('ScaleResource', ScaleResource);
