/**
 * Resource : Note
 * @constructor
 */
var NoteResource = function NoteResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
NoteResource.prototype = Object.create(ApiResource.prototype);
// Get parent dependencies
NoteResource.$inject = ApiResource.$inject;

/**
 * Name of the Resource (used as translation key)
 * @type {string}
 */
NoteResource.prototype.name = 'note';

/**
 * Path of the API resource
 * @type {string}
 */
NoteResource.prototype.path = '/notes';

/**
 * Display alteration with flat instead of sharp
 * @type {boolean}
 */
NoteResource.prototype.displayFlat = false;

NoteResource.prototype.setElements = function setElements(elements) {
    this.elements = elements;

    // Rename notes using User configuration
    this.renameNotes();
};

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

        // Rename the notes
        this.renameNotes();
    }
};

/**
 * Change the displayed name of Notes
 */
NoteResource.prototype.renameNotes = function renameNotes() {
    this.apply(function rename(note) {
        // Get the display name based of the configuration
        if (this.displayFlat) {
            // Display flat name
            note.info.name = note.info.flat_name;
        } else {
            // Display sharp name
            note.info.name = note.info.sharp_name;
        }
    }.bind(this));
};

/**
 * Get a Note by its value
 * @param   {Number} value
 * @returns {Object}
 */
NoteResource.prototype.getByValue = function getByValue(value) {
    return this.elements.find(function findByValue(element) {
        return value == element.value;
    });
};

/**
 * Add semitones to the Note given and get the corresponding Note
 * @param   {Object} reference
 * @param   {Number} semitones
 * @returns {Object}
 */
NoteResource.prototype.addSemitone = function addSemitone(reference, semitones) {
    var newValue = (reference.value + semitones) % 12;

    return this.getByValue(newValue);
};

NoteResource.prototype.play = function play() {

};

// Register service into Angular JS
angular
    .module('Theory')
    .service('NoteResource', NoteResource);
