/**
 * Resource : Tuning
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var TuningResource = function TuningResource($http, $q, $api) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
TuningResource.prototype = Object.create(ApiResource.prototype);
TuningResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
TuningResource.prototype.type = 'tuning';

/**
 * Path of the API resource
 * @type {string}
 */
TuningResource.prototype.path = '/tunings/{id}';

// Register service into Angular JS
angular
    .module('Tuning')
    .service('TuningResource', TuningResource);
