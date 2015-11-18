var NoteResource = function NoteResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
NoteResource.prototype = Object.create(ApiResource.prototype);
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

NoteResource.prototype.query = function query(queryParams, refresh) {
    var elements = ApiResource.prototype.query.apply(this, arguments);
    if (!elements instanceof Array) {
        elements.then(function elementsLoaded(result) {
            this.renameNotes();

            return result;
        }.bind(this));
    } else {
        this.renameNotes();
    }

    return elements;
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
            note.name = note.flat_name;
        } else {
            // Display sharp name
            note.name = note.sharp_name;
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
    .module('Utilities')
    .service('NoteResource', NoteResource);
