(function () {
    'use strict';

    angular
        .module('GuitarNeck', [])
        .directive('guitarNeckWidget', [
            function () {
                // Displayed strings
                var strings = [
                    { value: 7 },
                    { value: 2 },
                    { value: 10 },
                    { value: 5 },
                    { value: 0 },
                    { value: 7 }
                ];

                return {
                    restrict: 'E',
                    templateUrl: assetDirectory + '/musictoolsinstrument/partials/guitar-neck-widget.html',
                    replace: true,
                    scope: {

                    },
                    link: function (scope, element, attrs) {
                        // Get canvas
                        var canvas = element.find('canvas').get(0);

                        if (angular.isDefined(canvas) && angular.isDefined(canvas)) {
                            // Initialize a new Guitar Neck
                            var neck = new GuitarNeck(canvas, element.width(), strings);

                            // Render the guitar neck
                            neck.render();
                        }
                    }
                };
            }
        ]);

    var GuitarNeck = function GuitarNeckConstructor(canvas, width, strings) {
        this.canvas  = canvas;
        this.context = canvas.getContext('2d');
        this.strings = strings;

        // Set width of the guitar neck
        this.width = width;

        this.notes = new Notes();
    };

    GuitarNeck.prototype = {
        /**
         * Object constructor
         */
        constructor: GuitarNeck,

        /**
         * HTML Canvas
         */
        canvas: null,

        /**
         * Canvas context to draw on
         */
        context: null,

        notes: null,

        /**
         * Width of the guitar neck
         */
        width: 1000,

        /**
         * Height of the guitar neck
         */
        height: {
            /**
             * Definitions of height values for the Strings part of the canvas
             */
            strings: {
                container: 280,
                offset   : 20,
                interval :  null // Must be calculated from the count of strings
            },
            /**
             * Definitions of height values for the References (dots and frets number) part of the canvas
             */
            references: {
                container: 20
            },
            calculate: function calculateHeight() {
                return this.strings.container + this.references.container;
            }
        },

        /**
         * List of Guitar strings
         * MUST be ordered from the lowest to the sharpest
         */
        strings: {},

        /**
         * Interval of frets to display
         */
        frets: {
            offset: 60,
            start: 0,
            end: 24,
            showNumber: true,
            highlightReferences: true,
            interval: null
        },

        renderOptions: {
            // Colors
            defaultColor      : '#161616',
            defaultFill       : '#777777',
            stringColor       : '#AAAAAA',
            fretColor         : '#303030',
            fretHighlightColor: '#444444',

            // Sizes
            dotSize : 10,
            noteSize: 30,
            fretNumberSize: 25,

            notes: {
                size        : 30,
                defaultColor: '#161616',
                defaultFill : '#AAAAAA',

                /**
                 * @var {['both', 'sharp', 'flat']} namingRule
                 */
                namingRule: 'sharp',

                /**
                 * Which format for display altered notes ?
                 */
                alteration: {
                    display: true,
                    size: 25
                }
            }
        },

        /**
         * Draw the full Guitar Neck
         */
        render: function () {
            if (null !== this.context) {
                // Canvas context has been defined => we can start drawing

                // Set the width of the canvas
                this.canvas.width = this.width;

                // Calculate string interval
                var stringsHeight = this.height.strings.container - this.height.strings.offset * 2;
                if (this.frets.showNumber) {
                    // We display the fret numbers, so move down the strings
                    stringsHeight -= this.renderOptions.fretNumberSize;
                }

                this.height.strings.interval = stringsHeight / (this.strings.length - 1);

                // Calculate fret interval
                this.frets.interval = (this.width - this.frets.offset - 20) / (this.frets.end - this.frets.start);

                this.drawFrets();

                this.drawStrings();

                this.drawNotes();
            }
        },

        /**
         * Draw frets of the Guitar
         */
        drawFrets: function () {
            var fretPosition = this.frets.offset;
            for (var j = this.frets.start; j <= this.frets.end; j++ ) {
                var highlight = false;
                if ( 0 !== j && (j % 12) == 0 ) {
                    this.drawFretReference(fretPosition - (this.frets.interval / 2), true);
                    highlight = true;
                } else {
                    var caseNumber = j % 12;
                    if ( 13 !== j && caseNumber < 10 && (caseNumber % 2) != 0 ) {
                        this.drawFretReference(fretPosition - (this.frets.interval / 2), false);
                        highlight = true;
                    }
                }

                this.drawFret(fretPosition, j, highlight);

                // Set position of the next fret
                fretPosition += this.frets.interval;
            }
        },

        drawFret: function (x, number, highlight) {
            this.context.beginPath();

            var lineWidth = 3;
            if (this.frets.highlightReferences) {
                if (0 == number) {
                    lineWidth = 9;
                } else if (highlight) {
                    lineWidth = 5;
                }
            }

            var fretColor = this.renderOptions.fretColor;
            if (this.frets.highlightReferences && highlight) {
                fretColor = this.renderOptions.fretHighlightColor;
            }

            // Fix x position for better rendering
            if ( 0 === (x / 0.5) % 2 ) { // Check if the current position finish by 0.5 (number of 0.5 MUST be odd for a good rendering )
                x += 0.5;
            }

            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.height.strings.container);

            this.context.lineWidth = lineWidth;
            this.context.strokeStyle = fretColor;

            this.context.closePath();
            this.context.stroke();

            if (this.frets.showNumber) {
                var y = 0;

                // Number background
                this.context.beginPath();
                this.context.fillStyle = fretColor;
                this.context.rect(x - (this.renderOptions.fretNumberSize / 2), y, this.renderOptions.fretNumberSize, this.renderOptions.fretNumberSize);
                this.context.closePath();
                this.context.fill();

                // Number text
                this.context.beginPath();
                this.context.font        = 'bold 11pt Calibri';
                this.context.fillStyle   = this.renderOptions.defaultColor;
                this.context.textAlign   = 'center';
                this.context.shadowColor = 'transparent';
                this.context.closePath();
                this.context.fillText(number, x, y+17);
            }
        },

        drawFretReference: function (x, double) {
            var w = this.renderOptions.dotSize;

            this.context.beginPath();
            this.context.fillStyle = this.renderOptions.defaultFill;

            var y = this.height.strings.container + w;

            if (double) {
                // Draw two dots
                this.context.arc(x + w, y, w/2, 0, 2 * Math.PI, false);
                this.context.arc(x - w, y, w/2, 0, 2 * Math.PI, false);
            } else {
                // Draw one dot
                this.context.arc(x, y, w/2, 0, 2 * Math.PI, false);
            }

            this.context.closePath();
            this.context.fill();
        },

        /**
         * Draw strings of the Guitar
         */
        drawStrings: function () {
            for (var i = this.strings.length - 1; i >= 0; i--) {
                this.drawString(i, this.strings[i].value);
            }
        },

        /**
         * Draw a string on the canvas
         */
        drawString: function (stringNumber, stringValue) {
            var note = this.notes.get(stringValue);

            // Calculate position of the string
            var stringPosition = this.getStringPosition(stringNumber);

            // Calculate width of the string
            var stringWidth = ( (stringNumber + 1) * 0.5) + 0.5;

            // Draw the string
            this.context.beginPath();

            this.context.moveTo(0, stringPosition);
            this.context.lineTo(this.width, stringPosition);

            this.context.lineWidth   = stringWidth;
            this.context.strokeStyle = this.renderOptions.stringColor;

            this.context.shadowColor = '#000';
            this.context.shadowBlur = 4;
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;

            this.context.closePath();
            this.context.stroke();

            // Draw the name of the string
            this.drawNote((this.renderOptions.notes.size + 2) / 2 , stringPosition, note, this.renderOptions.notes.size, this.renderOptions.notes.defaultColor, this.renderOptions.notes.defaultFill, '#dddddd');
        },

        getStringPosition: function (stringNumber) {
            // Calculate position of the string
            var stringPosition = this.height.strings.interval * stringNumber + 0.5 + this.height.strings.offset;
            if (this.frets.showNumber) {
                // We display the fret numbers, so move down the strings
                stringPosition += this.renderOptions.fretNumberSize;
            }

            return stringPosition;
        },

        /**
         * Draw notes on the Guitar
         * @param {Array} [displayNotes]
         */
        drawNotes: function () {
            // Draw notes string by string
            for (var i = this.strings.length - 1; i >= 0; i--) {
                var stringPosition = this.getStringPosition(i);

                // Retrieve the note of the current string
                var note = this.notes.get(this.strings[i].value);

                // Draw note for each fret
                var start = this.frets.start;
                if (this.frets.start == 0) {
                    start += 1;
                }

                for (var j = start; j <= this.frets.end; j++ ) {
                    var nextNote = this.notes.addSemitone(note, j);

                    if (!nextNote.altered || this.renderOptions.notes.alteration.display) {
                        var fretPosition = this.frets.interval * j + this.frets.offset;
                        this.drawNote(fretPosition - (this.frets.interval / 2), stringPosition, nextNote);
                    }
                }
            }
        },

        /**
         * Draw a note on the canvas
         * @param x
         * @param y
         * @param note
         * @param [size]
         * @param [color]
         * @param [fill]
         * @param [border]
         */
        drawNote: function (x, y, note, size, color, fill, border) {
            var noteSize  = size  || (note.altered ? this.renderOptions.notes.alteration.size : this.renderOptions.notes.size );
            var noteFill  = fill  || note.render.fill;
            var noteColor = color || note.render.color;

            var noteName = null;
            switch (this.renderOptions.notes.namingRule) {
                case 'both':
                    noteName = note.name.flat != note.name.sharp ? note.name.sharp + ' / ' + note.name.flat : note.name.flat;
                    break;
                case 'flat':
                    noteName = note.name.flat;
                    break;
                case 'sharp':
                    noteName = note.name.sharp;
                    break;
            }

            // Note background
            this.context.beginPath();
            this.context.fillStyle = noteFill;

            this.context.shadowColor = '#000';
            this.context.shadowBlur = 4;
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
            this.context.arc(x, y, noteSize / 2, 0, 2 * Math.PI, false);
            this.context.closePath();
            this.context.fill();

            if (border) {
                this.context.lineWidth   = 1;
                this.context.strokeStyle = border;
                this.context.shadowColor = 'transparent';

                this.context.stroke();
            }

            // Note text
            this.context.beginPath();
            this.context.font        = 'bold 12pt Calibri';
            this.context.fillStyle   = noteColor;
            this.context.textAlign   = 'center';
            this.context.shadowColor = 'transparent';
            this.context.closePath();
            this.context.fillText(noteName, x, y+5);
        }
    };

    var Notes = function NotesConstructor() {

    };

    Notes.prototype = {
        /**
         * Object constructor
         */
        constructor: Notes,

        notes: [
            {
                name  : { sharp: 'A', flat: 'A' },
                value : 0,
                render: { color: '#ffffff', fill: '#8f0000' }
            },
            {
                name   : { sharp: 'A♯', flat: 'B♭' },
                value  : 1,
                render : { color: '#ffffff', fill: '#a23e97' },
                altered: true
            },
            { name: { sharp: 'B', flat: 'B' },    value: 2,  render: { color: '#ffffff', fill: '#6a489d' } },
            { name: { sharp: 'C', flat: 'C' },    value: 3,  render: { color: '#ffffff', fill: '#006cb7' } },
            { name: { sharp: 'C♯', flat: 'D♭' }, value: 4,  render: { color: '#ffffff', fill: '#008e83' }, altered: true },
            { name: { sharp: 'D', flat: 'D' },    value: 5,  render: { color: '#ffffff', fill: '#00854a' } },
            { name: { sharp: 'D♯', flat: 'E♭' }, value: 6,  render: { color: '#ffffff', fill: '#7fb439' }, altered: true },
            { name: { sharp: 'E', flat: 'E' },    value: 7,  render: { color: '#ffffff', fill: '#fdb813' } },
            { name: { sharp: 'F', flat: 'F' },    value: 8,  render: { color: '#ffffff', fill: '#584742' } },
            { name: { sharp: 'F♯', flat: 'G♭' }, value: 9, render: { color: '#ffffff', fill: '#c15e20' }, altered: true },
            { name: { sharp: 'G', flat: 'G' },    value: 10, render: { color: '#ffffff', fill: '#f58220' } },
            { name: { sharp: 'G♯', flat: 'A♭' }, value: 11, render: { color: '#ffffff', fill: '#f04e46' }, altered: true }
        ],

        get: function (value) {
            return this.notes.find(function findByName(element) {
                return value == element.value;
            });
        },

        addSemitone: function (reference, semitones) {
            var newValue = (reference.value + semitones) % 12;

            return this.get(newValue);
        }
    };
})();