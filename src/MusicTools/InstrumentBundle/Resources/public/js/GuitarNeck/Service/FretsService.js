(function () {
    'use strict';

    var FretsService = function () {

    };

    FretsService.prototype = {
        /**
         * First displayed fret
         * @var {Number} first
         */
        first: 0,

        /**
         * Last displayed fret
         * @var {Number} first
         */
        last: 24,

        /**
         * Configuration of the Frets
         */
        configuration: {
            /**
             * Display fret number
             * @var {Boolean} showNumber
             */
            showNumber          : true,

            /**
             * Highlight reference frets (if disabled, all the frets will be rendered in the same way)
             * @var {Boolean} highlightReferences
             */
            highlightReferences : true
        }
    };

    // Inject controller object into Angular
    angular
        .module('GuitarNeck')
        .controller('FretsService', FretsService);
})();