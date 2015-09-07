(function () {
    'use strict';

    angular
        .module('Note')
        .factory('NoteService', [
            '$http',
            '$q',
            function ($http, $q){
                /**
                 * Note Service
                 * @constructor
                 */
                var NoteService = function () {

                };

                NoteService.prototype = {
                    displayFlat: false,

                    /**
                     * Current selected guitar
                     * @var {Array} notes
                     */
                    notes: [],

                    /**
                     * Current selected guitar
                     * @var {Object} current
                     */
                    current: null,

                    /**
                     * Get the current selected Note
                     * @returns {Object}
                     */
                    getCurrent: function getCurrent() {
                        return this.current;
                    },

                    /**
                     * Set the current selected Note
                     * @param {Object} note
                     */
                    setCurrent: function setCurrent(note) {
                        this.current = note;
                    },

                    setDisplayFlat: function setDisplayFlat() {

                    },

                    /**
                     * List all Notes
                     * @returns {Object}
                     */
                    all: function all() {
                        if (0 !== this.notes.length) {
                            // Return local list of Notes
                            return this.notes
                        } else {
                            // Load Notes from AJAX
                            return this.find();
                        }
                    },

                    find: function find() {
                        var deferred = $q.defer();

                        $http
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
                    },

                    get: function get(value) {
                        return this.notes.find(function findByValue(element) {
                            return value == element.value;
                        });
                    },

                    addSemitone: function addSemitone(reference, semitones) {
                        var newValue = (reference.value + semitones) % 12;

                        return this.get(newValue);
                    },

                    apply: function apply(callback) {
                        if (typeof callback === 'function') {
                            for (var i = 0; i < this.notes.length; i++) {
                                callback(this.notes[i]);
                            }
                        }
                    }
                };

                return new NoteService();
            }
        ]);
})();