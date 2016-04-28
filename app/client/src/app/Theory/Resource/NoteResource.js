/**
 * Resource : Note
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var NoteResource = function NoteResource($http, $q, $api) {
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
NoteResource.prototype.type = 'notes';

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
 * @param {boolean} newValue
 */
NoteResource.prototype.setDisplayFlat = function setDisplayFlat(newValue) {
    if (newValue !== this.displayFlat) {
        this.displayFlat = newValue;
    }
};

/**
 * Get the previous Note of current
 * @param   {Array}  notes
 * @param   {Object} current
 * @returns {Object|null}
 */
NoteResource.prototype.previous = function previous(notes, current) {
    var previous = null;

    var pos = notes.indexOf(this.current);
    if (-1 !== pos && notes[pos - 1]) {
        previous = notes[pos - 1];
    }

    return previous;
};

/**
 * Get the next Note of current
 * @param   {Array}  notes
 * @param   {Object} current
 * @returns {Object|null}
 */
NoteResource.prototype.next = function next(notes, current) {
    var next = null;

    var pos = notes.indexOf(current);
    if (-1 !== pos && notes[pos + 1]) {
        next = notes[pos + 1];
    }

    return next;
};

// Register service into Angular JS
angular
    .module('Theory')
    .service('NoteResource', NoteResource);
