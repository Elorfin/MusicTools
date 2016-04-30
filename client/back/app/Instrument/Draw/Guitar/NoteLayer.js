/**
 * Note Layer
 * @constructor
 */
var NoteLayer = function NoteLayer() {
    // Call parent constructor
    AbstractLayer.apply(this, arguments);
};

// Extends the base controller
NoteLayer.prototype = Object.create(AbstractLayer.prototype);
NoteLayer.prototype.constructor = NoteLayer;

/**
 * Redraw strings
 * @param   {HTMLCanvasElement} canvas Context to draw on
 * @param   {Number}            width  Width of the Layer
 * @param   {Number}            height Height of the Layer
 * @returns {NoteLayer}
 */
NoteLayer.prototype.redraw = function redraw(canvas, width, height) {
    console.log('Note Layer is redrawn.');

    return this;
};
