/**
 * Menu controller for Notes
 * @constructor
 */
var NoteMenuController = function NoteMenuControllerConstructor(NoteResource) {
    this.services = {};
    this.services['NoteResource'] = NoteResource;

    this.entities = NoteResource.query().then(function (result) {
        this.entities = result;
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
NoteMenuController.prototype.entities = [];

/**
 * Current note
 * @type {Object}
 */
NoteMenuController.prototype.current = null;

NoteMenuController.prototype.previous = function previous() {
    var pos = this.entities.indexOf(this.current);
    if (-1 !== pos && this.entities[pos - 1]) {
        this.current = this.entities[pos - 1];
    }
};

NoteMenuController.prototype.next = function next() {
    var pos = this.entities.indexOf(this.current);
    if (-1 !== pos && this.entities[pos + 1]) {
        this.current = this.entities[pos + 1];
    }
};

// Register controller into angular
angular
    .module('Theory')
    .controller('NoteMenuController', NoteMenuController);
