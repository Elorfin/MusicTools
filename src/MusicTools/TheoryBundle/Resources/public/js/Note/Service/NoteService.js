(function () {
    'use strict';

    /**
     * Note Service
     * @constructor
     */
    var NoteService = function NoteService($http, $q) {
        this.services['$http'] = $http;
        this.services['$q']    = $q;
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
     * @param {Object} note
     */
    NoteService.prototype.setCurrent = function setCurrent(note) {
        this.current = note;
    };

    NoteService.prototype.setDisplayFlat = function setDisplayFlat() {

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

    NoteService.prototype.find = function find() {
        var deferred = this.services.$q.defer();

        this.services.$http
            .get(Routing.generate('theory_note', { _format: 'json' }), {})

            .success(function (response) {
                this.notes = response;

                this.apply(function (note) {
                    if (this.displayFlat) {

                    }
                }.bind(this));

                deferred.resolve(response);
            }.bind(this))
            .error(function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    };

    NoteService.prototype.get = function get(value) {
        return this.notes.find(function findByValue(element) {
            return value == element.value;
        });
    };

    NoteService.prototype.addSemitone = function addSemitone(reference, semitones) {
        var newValue = (reference.value + semitones) % 12;

        return this.get(newValue);
    };

    NoteService.prototype.apply = function apply(callback) {
        if (typeof callback === 'function') {
            for (var i = 0; i < this.notes.length; i++) {
                callback(this.notes[i]);
            }
        }
    };

    // Inject Service into AngularJS
    angular.module('Note').service('NoteService', [ '$http', '$q', NoteService ]);
})();