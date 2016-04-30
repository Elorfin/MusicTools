/**
 * Fret Layer
 * @constructor
 */
var FretLayer = function FretLayer() {
    // Call parent constructor
    AbstractLayerController.apply(this, arguments);
};

// Extends the base controller
FretLayer.prototype = Object.create(AbstractLayer.prototype);
FretLayer.prototype.constructor = FretLayer;

/**
 * Configuration for the rendering of reference Frets
 * @type {Object}
 */
FretLayer.prototype.renderOptions.references = {
    /**
     * Display dots for reference Frets
     * @type {boolean}
     */
    display   : true,

    /**
     * Highlight references (other color + thicker line)
     * @type {boolean}
     */
    highlight : true,

    /**
     * Size of the rendered dots
     * @type {Number}
     */
    dotSize   : 10
};

/**
 * Configuration for the rendering of Fret numbers
 * @type {Object}
 */
FretLayer.prototype.renderOptions.numbers = {
    /**
     * Is the number must be displayed ?
     * @type {boolean}
     */
    display : true,

    /**
     * Size of the numbers when displayed
     * @type {Number}
     */
    size    : 30,

    /**
     * Font properties
     * @type {Object}
     */
    font: {
        /**
         * Size of the Font (in pixels)
         * @type {Number}
         */
        size   : 12,

        /**
         * Weight of the Font (bold or normal)
         * @type {String}
         */
        weight : 'bold',

        /**
         * Font family
         * @type {String}
         */
        family : '"Helvetica Neue",Helvetica,Arial,sans-serif'
    }
};


/**
 * First displayed fret
 * @type {Number}
 */
FretLayer.prototype.fretFirst = 0;

/**
 * Last displayed fret
 * @type {Number}
 */
FretLayer.prototype.fretLast = 24;

/**
 * Total of frets that can be displayed
 * @type {Number}
 */
FretLayer.prototype.fretCount = 24;

/**
 * Redraw Layer
 * @param   {HTMLCanvasElement} canvas Canvas to draw on
 * @param   {Number}            width  Width of the Layer
 * @param   {Number}            height Height of the Layer
 * @returns {FretLayer}
 */
FretLayer.prototype.redraw = function redraw(canvas, width, height) {
    console.log('Fret Layer is redrawn.');

    // Call parent controller
    AbstractLayer.prototype.redraw.apply(this, arguments);

    // Get 2D context of the canvas
    var context = canvas.getContext('2d');
    if (null !== context) {
        // Start drawing
        this.drawFrets(context);
    }

    return this;
};

/**
 * Draw frets
 * @param   {Object} context Context to draw on
 * @returns {FretLayer}
 */
FretLayer.prototype.drawFrets = function drawFrets(context) {
    var fretPosition = 15;
    var fretInterval = (this.renderOptions.width - 30) / (this.fretLast - this.fretFirst);

    // Loop through all frets that need to be drawn
    for (var i = this.fretFirst; i <= this.fretLast; i++) {
        var highlight = this.fretIsHighlighted(i);

        // Draw the fret reference if needed
        if (highlight && this.renderOptions.references.display) {
            this.drawFretReference(context, fretPosition - (fretInterval / 2), i);
        }

        // Draw the Fret line
        this.drawFret(context, fretPosition, i, highlight);

        // Set position of the next fret
        fretPosition += fretInterval;
    }

    return this;
};

/**
 * Check if the current fret is a reference fret (e.g. 3, 5, 7)
 * @param   {Number} fretNumber Number of the Fret
 * @returns {boolean}
 */
FretLayer.prototype.fretIsHighlighted = function fretIsHighlighted(fretNumber) {
    var highlight = false;

    if (this.renderOptions.references.highlight) {
        if ( 0 !== fretNumber && (fretNumber % 12) == 0 ) {
            highlight = true;
        } else {
            var caseNumber = fretNumber % 12;
            if ( 13 !== fretNumber && caseNumber < 10 && (caseNumber % 2) != 0 ) {
                highlight = true;
            }
        }
    }

    return highlight;
};

/**
 * Draw a Fret
 * @param   {Object}  context   Context to draw on
 * @param   {Number}  x         Horizontal position of the Fret (in pixels)
 * @param   {Number}  number    Number of the Fret
 * @param   {boolean} highlight Is the current Fret a reference Fret ?
 * @returns {FretLayer}
 */
FretLayer.prototype.drawFret = function drawFret(context, x, number, highlight) {
    context.beginPath();

    var lineWidth = 3;
    if (this.renderOptions.references.highlight) {
        if (0 == number) {
            lineWidth = 9;
        } else if (highlight) {
            lineWidth = 5;
        }
    }

    var fretColor = this.renderOptions.color.default;
    if (highlight) {
        fretColor = this.renderOptions.color.highlight;
    }

    // Fix x position for better rendering
    if ( 0 === (x / 0.5) % 2 ) {
        // Check if the current position finishes by 0.5 (number of 0.5 MUST be odd for a good rendering )
        x += 0.5;
    }

    var y = this.renderOptions.height;
    if (this.renderOptions.references.display) {
        // We need to draw the dots for reference frets, so let some space for it
        y -= this.renderOptions.references.dotSize * 2;
    }

    context.moveTo(x, 0);
    context.lineTo(x, y);

    context.lineWidth   = lineWidth;
    context.strokeStyle = fretColor;

    context.closePath();
    context.stroke();

    // Draw fret numbers if needed
    if (this.renderOptions.numbers.display && this.fretFirst !== number && this.fretLast !== number) {
        this.drawFretNumber(context, x, number, highlight);
    }

    return this;
};

/**
 * Draw the number of the current Fret
 * @param   {Object}  context   Context to draw on
 * @param   {Number}  x         Horizontal position of the Fret (in pixels)
 * @param   {Number}  number    Number of the Fret
 * @param   {boolean} highlight Is the current Fret a reference Fret ?
 * @returns {FretLayer}
 */
FretLayer.prototype.drawFretNumber = function drawFretNumber(context, x, number, highlight) {
    var y = 0;

    var fretColor = this.renderOptions.color.default;
    if (highlight) {
        fretColor = this.renderOptions.color.highlight;
    }

    // Number background
    context.beginPath();
    context.fillStyle = fretColor;
    context.rect(x - (this.renderOptions.numbers.size / 2), y, this.renderOptions.numbers.size, this.renderOptions.numbers.size);
    context.closePath();
    context.fill();

    // Number text
    context.beginPath();

    context.font         = this.renderOptions.numbers.font.weight + ' ' + this.renderOptions.numbers.font.size + 'px ' + this.renderOptions.numbers.font.family;
    context.fillStyle    = this.renderOptions.color.font;
    context.textAlign    = 'center';
    context.shadowColor  = 'transparent';
    context.textBaseline = 'middle';

    context.closePath();

    context.fillText(number, x, y + (this.renderOptions.numbers.size / 2));

    return this;
};

/**
 * Draw the dots for reference Fret
 * @param   {Object} context Context to draw on
 * @param   {Number} x       Horizontal position of the Fret (in pixels)
 * @param   {Number} number  Number of the Fret
 * @returns {FretLayer}
 */
FretLayer.prototype.drawFretReference = function drawFretReference(context, x, number) {
    var double = false;
    if (0 === number % 12) {
        double = true;
    }

    context.beginPath();
    context.fillStyle = this.renderOptions.color.highlight;

    var y = this.renderOptions.height - this.renderOptions.references.dotSize;

    if (double) {
        // Draw two dots
        context.arc(x + this.renderOptions.references.dotSize, y, this.renderOptions.references.dotSize/2, 0, 2 * Math.PI, false);
        context.arc(x - this.renderOptions.references.dotSize, y, this.renderOptions.references.dotSize/2, 0, 2 * Math.PI, false);
    } else {
        // Draw one dot
        context.arc(x, y, this.renderOptions.references.dotSize/2, 0, 2 * Math.PI, false);
    }

    context.closePath();
    context.fill();

    return this;
};
