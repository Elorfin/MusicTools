(function () {
    'use strict';

    /**
     * Guitar Service
     * @constructor
     */
    var GuitarService = function () {

    };

    GuitarService.prototype = {
        /**
         * Current selected guitar
         * @var {Object} current
         */
        current: null,

        /**
         * Get the current selected Guitar
         * @returns {Object}
         */
        getCurrent: function getCurrent() {
            return this.current;
        },

        /**
         * Set the current selected Guitar
         * @param {Object} guitar
         */
        setCurrent: function (guitar) {
            this.current = guitar;
        },

        /**
         * List all Guitars of the current User
         * @returns {Array}
         */
        list: function list() {
            return [];
        }
    };

    // Inject controller object into Angular
    angular
        .module('Instrument')
        .factory('GuitarService', GuitarService);
})();