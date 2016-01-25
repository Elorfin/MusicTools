/**
 * Resource : Note
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var NoteResource = function NoteResourceConstructor($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
NoteResource.prototype = Object.create(ApiResource.prototype);
NoteResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
NoteResource.prototype.type = 'note';

/**
 * Path of the API resource
 * @type {string}
 */
NoteResource.prototype.path = '/notes/{id}';

/**
 * Display alteration with flat instead of sharp
 * @type {boolean}
 */
NoteResource.prototype.displayFlat = false;

/**
 * Is the displayed name of the Note is flat (true) or sharp (false)
 * @returns {boolean}
 */
NoteResource.prototype.isDisplayFlat = function isDisplayFlat() {
    return this.displayFlat;
};

/**
 * Change the way the Note names are displayed
 * @param   {boolean} newValue
 */
NoteResource.prototype.setDisplayFlat = function setDisplayFlat(newValue) {
    if (newValue !== this.displayFlat) {
        this.displayFlat = newValue;
    }
};

// Register service into Angular JS
angular
    .module('Theory')
    .service('NoteResource', NoteResource);
