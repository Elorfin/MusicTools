/**
 * Note Service
 * @param $http
 * @param $q
 * @returns {NoteService}
 * @constructor
 */
var NoteService = function NoteService($http, $q) {
    this.services['$http'] = $http;
    this.services['$q']    = $q;

    return this;
};

NoteService.prototype.constructor = NoteService;

/**
 * List of dependencies of the Service
 * @type {Object}
 */
NoteService.prototype.services = {};

/**
 * Display alteration with flat instead of sharp
 * @type {boolean}
 */
NoteService.prototype.displayFlat = false;

/**
 * Current selected guitar
 * @var {Array} notes
 */
NoteService.prototype.notes = [];

/**
 * Current selected note
 * @var {Object} current
 */
NoteService.prototype.current = null;

/**
 * Get the current selected Note
 * @returns {Object}
 */
NoteService.prototype.getCurrent = function getCurrent() {
    return this.current;
};

/**
 * Set the current selected Note
 * @param   {Object} note
 * @returns {NoteService}
 */
NoteService.prototype.setCurrent = function setCurrent(note) {
    this.current = note;

    return this;
};

/**
 * Is the displayed name of the Note is flat (true) or sharp (false)
 * @returns {boolean}
 */
NoteService.prototype.isDisplayFlat = function isDisplayFlat() {
    return this.displayFlat;
};

/**
 * Change the way the Note names are displayed
 * @param   {boolean} newValue
 * @returns {NoteService}
 */
NoteService.prototype.setDisplayFlat = function setDisplayFlat(newValue) {
    if (newValue !== this.displayFlat) {
        this.displayFlat = newValue;

        // Rename the notes
        this.renameNotes();
    }

    return this;
};

/**
 * Change the displayed name of Notes
 * @returns {NoteService}
 */
NoteService.prototype.renameNotes = function renameNotes() {
    this.apply(function (note) {
        // Get the display name based of the configuration
        if (this.displayFlat) {
            // Display flat name
            note.name = note.flatName;
        } else {
            // Display sharp name
            note.name = note.sharpName;
        }
    }.bind(this));

    return this;
};

/**
 * List all Notes
 * @returns {Object}
 */
NoteService.prototype.all = function all() {
    if (0 !== this.notes.length) {
        // Return local list of Notes
        return this.notes
    } else {
        // Load Notes from AJAX
        return this.find();
    }
};

/**
 * Call server to get the list of Notes
 * @returns {promise}
 */
NoteService.prototype.find = function find() {
    var deferred = this.services.$q.defer();

    this.services.$http
        .get(Routing.generate('theory_note', { _format: 'json' }), {})

        .success(function (response) {
            this.notes = response;

            this.renameNotes();

            deferred.resolve(response);
        }.bind(this))
        .error(function (response) {
            deferred.reject(response);
        });

    return deferred.promise;
};

/**
 * Get a Note by its value
 * @param   {Number} value
 * @returns {Object}
 */
NoteService.prototype.get = function get(value) {
    return this.notes.find(function findByValue(element) {
        return value == element.value;
    });
};

/**
 * Add semitones to the Note given and get the corresponding Note
 * @param   {Object} reference
 * @param   {Number} semitones
 * @returns {Object}
 */
NoteService.prototype.addSemitone = function addSemitone(reference, semitones) {
    var newValue = (reference.value + semitones) % 12;

    return this.get(newValue);
};

/**
 * Apply a callback to all the Notes
 * @param   {Function} callback
 * @returns {NoteService}
 */
NoteService.prototype.apply = function apply(callback) {
    if (typeof callback === 'function') {
        for (var i = 0; i < this.notes.length; i++) {
            callback(this.notes[i]);
        }
    }

    return this;
};

// Inject Service into AngularJS
angular.module('Theory').service('NoteService', [ '$http', '$q', NoteService ]);