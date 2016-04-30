/**
 * String Layer
 * @constructor
 */
var StringLayer = function StringLayer() {
    // Call parent constructor
    AbstractLayer.apply(this, arguments);
};

// Extends the base controller
StringLayer.prototype = Object.create(AbstractLayer.prototype);
StringLayer.prototype.constructor = StringLayer;

/**
 * Redraw strings
 * @param   {HTMLCanvasElement} canvas Context to draw on
 * @param   {Number}            width  Width of the Layer
 * @param   {Number}            height Height of the Layer
 * @returns {StringLayer}
 */
StringLayer.prototype.redraw = function redraw(canvas, width, height) {
    console.log('String Layer is redrawn.');

    // Call parent controller
    AbstractLayerController.prototype.redraw.apply(this, arguments);

    // Get 2D context of the canvas
    var context = canvas.getContext('2d');
    if (null !== context) {
        // Start drawing
        this.drawStrings(context);
    }

    return this;
};

StringLayer.prototype.drawStrings = function drawStrings(context) {
    /*for (var i = this.strings.length - 1; i >= 0; i--) {
        this.drawString(i, this.strings[i].value);
    }*/

    return this;
};

/**
 * Draw a string
 */
StringLayer.prototype.drawString = function drawString(stringNumber, stringValue) {
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
};

StringLayer.prototype.getStringPosition = function getStringPosition(stringNumber) {
    // Calculate position of the string
    var stringPosition = this.height.strings.interval * stringNumber + 0.5 + this.height.strings.offset;
    if (this.frets.showNumber) {
        // We display the fret numbers, so move down the strings
        stringPosition += this.renderOptions.fretNumberSize;
    }

    return stringPosition;
};
