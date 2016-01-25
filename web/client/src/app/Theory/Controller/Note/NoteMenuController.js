/**
 * Menu controller for Notes
 * @constructor
 */
var NoteMenuController = function NoteMenuControllerConstructor(NoteResource) {
    this.notes = NoteResource.query().then(function (result) {
        this.notes = result;
        if (!this.current) {
            this.current = result[0];
        }
    }.bind(this));
};

// Set up dependency injection
NoteMenuController.$inject = [ 'NoteResource' ];

/**
 * List of notes
 * @type {Array}
 */
NoteMenuController.prototype.notes = [];

/**
 * Current note
 * @type {Object}
 */
NoteMenuController.prototype.current = null;

NoteMenuController.prototype.previous = function previous() {
    var pos = this.notes.indexOf(this.current);
    if (-1 !== pos && this.notes[pos - 1]) {
        this.current = this.notes[pos - 1];
    }
};

NoteMenuController.prototype.next = function next() {
    var pos = this.notes.indexOf(this.current);
    if (-1 !== pos && this.notes[pos + 1]) {
        this.current = this.notes[pos + 1];
    }
};

// Register controller into angular
angular
    .module('Theory')
    .controller('NoteMenuController', NoteMenuController);
