/**
 * Note Name filter
 * @constructor
 */
var NoteNameFilter = function NoteNameFilter(NoteResource) {
    return function getName(note) {
        var name = null;
        if (note) {
            if (NoteResource.displayFlat) {
                // Display flat name
                name = note.attributes.flat_name;
            } else {
                // Display sharp name
                name = note.attributes.sharp_name;
            }
        }

        return name;
    };
};

// Set up dependency injection
NoteNameFilter.$inject = [ 'NoteResource' ];

// Register filter into Angular JS
angular
    .module('Theory')
    .filter('note_name', NoteNameFilter);