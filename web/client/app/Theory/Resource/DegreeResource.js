/**
 * Resource : Degree
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var DegreeResource = function DegreeResourceConstructor($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
DegreeResource.prototype = Object.create(ApiResource.prototype);
DegreeResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
DegreeResource.prototype.type = 'degree';

/**
 * Path of the API resource
 * @type {string}
 */
DegreeResource.prototype.path = '/degrees/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('DegreeResource', DegreeResource);
