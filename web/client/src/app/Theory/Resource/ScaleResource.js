/**
 * Resource : Scale
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var ScaleResource = function ScaleResourceConstructor($http, $q, ApiService) {
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
