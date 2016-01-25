/**
 * Resource : Lesson
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var LessonResource = function LessonResource($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
LessonResource.prototype = Object.create(ApiResource.prototype);
LessonResource.prototype.constructor = LessonResource;

// Set up dependency injection
LessonResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
LessonResource.prototype.type = 'lesson';

/**
 * Path of the API resource
 * @type {string}
 */
LessonResource.prototype.path = '/lessons/{id}';

// Register service into Angular JS
angular
    .module('Lesson')
    .service('LessonResource', LessonResource);
