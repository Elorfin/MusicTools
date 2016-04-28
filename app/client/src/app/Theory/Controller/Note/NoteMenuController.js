/**
 * Menu controller for Notes
 * @param {NoteResource} NoteResource
 * @constructor
 */
var NoteMenuController = function NoteMenuController(NoteResource) {
    this.noteResource = NoteResource;
    this.notes = this.noteResource.query().then(function (result) {
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
    this.current = this.noteResource.previous(this.notes, this.current);
};

NoteMenuController.prototype.next = function next() {
    this.current = this.noteResource.next(this.notes, this.current);
};

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('NoteMenuController', NoteMenuController);
