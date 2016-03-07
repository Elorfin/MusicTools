/**
 * Tuning Widget Controller
 * @constructor
 */
var TuningWidgetController = function TuningWidgetController(NoteResource) {
    // WIP : set data (will be automatically set by directive)
    this.headstock = 'top-bottom';
    this.strings   = 6;

    // Load Notes
    this.notes = NoteResource.query().then(function onSuccess(result) {
        this.notes = result;

        return result;
    }.bind(this));
};

// Set up dependency injection
TuningWidgetController.$inject = [ 'NoteResource' ];

/**
 * Nb strings of the Instrument
 * @type {number}
 */
TuningWidgetController.prototype.strings = 6;

/**
 * Headstock format (top-bottom or in-line)
 * @type {string}
 */
TuningWidgetController.prototype.headstock = 'top-bottom';

/**
 * Is left handed ?
 * @type {boolean}
 */
TuningWidgetController.prototype.leftHanded = false;

/**
 * Current Tuning
 * @type {Object}
 */
TuningWidgetController.prototype.tuning = null;

/**
 * Position of the Tuning pegs regarding to the Headstock format
 * Array are ordered from the lowest string to the higher one
 * @type {Object}
 */
TuningWidgetController.prototype.tuningPegs = {
    'in-line': {

    },

    'top-bottom': [
        // Left
        { x: 85,  y: 580 },
        { x: 105, y: 400 },
        { x: 100, y: 220 },

        // Right
        { x: 295, y: 175 },
        { x: 290, y: 355 },
        { x: 315, y: 535 }
    ]
};

/**
 * Redraw widget
 * @param canvas
 */
TuningWidgetController.prototype.draw = function draw(canvas) {
    // Get 2D context of the canvas
    var context = canvas.getContext('2d');
    if (null !== context) {
        // Calculate Height of the Canvas from it's width (ratio=2.15)
        canvas.height = canvas.width * 2.15;

        // Reset translation
        context.translate(0,0);

        // Set scale (original drawing scale : w=400 / h=860)
        context.scale(canvas.width / 400, canvas.height /860);

        this.drawHeadstock(context);
        this.drawNut(context);
        this.drawStrings(context);
    }
};

/**
 * Draw : Headstock
 * @param context
 */
TuningWidgetController.prototype.drawHeadstock = function drawHeadstock(context) {
    // w=400 / h=860
    // ratio = 2.15
    // Start headstock
    context.beginPath();

    // Bottom line
    context.moveTo(100, 850);
    context.lineTo(300, 850);

    switch (this.headstock) {
        case 'top-bottom':
            context.bezierCurveTo(300, 850, 275, 745, 395, 590);
            context.bezierCurveTo(415, 500, 310, 440, 380, 5);
            context.bezierCurveTo(195, -30, 5,   125, 10,  150);
            context.bezierCurveTo(75,  270, 5,   625, 5,   625);
            context.bezierCurveTo(100, 730, 100, 850, 100, 850);

            break;

        case 'in-line':
            context.bezierCurveTo(300, 775, 385, 700, 385, 700);
            context.bezierCurveTo(315, 435, 355, 265, 365, 20);
            context.bezierCurveTo(365, 20,  355, -5,  340, 10);
            context.bezierCurveTo(275, 65,  275, 75,  205, 65);
            context.lineTo(15, 755);
            context.bezierCurveTo(100, 795, 100, 850, 100, 850);

            break;
    }

    // Finish headstock
    context.closePath();

    context.fillStyle = 'rgba(0, 0, 0, 0.25)';
    context.fill();
};

/**
 * Draw : Nut
 * @param context
 */
TuningWidgetController.prototype.drawNut = function drawNut(context) {
    // Set Nut color
    context.fillStyle = '#777';

    // Set shadow
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur    = 10;
    context.shadowColor   = "black";

    context.beginPath();

    // Draw Nut
    context.rect(98, 836, 200, 18);

    context.closePath();

    context.fillStyle = '#555';
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = '#666';
    context.stroke();
};

/**
 * Draw : Strings + Tuning pegs
 * @param context
 */
TuningWidgetController.prototype.drawStrings = function drawStrings(context) {
    var drawTuningPeg = function drawTuningPeg(context, tuningPegPosition) {
        // Set Tuning Pegs color
        context.fillStyle = 'rgba(255, 255, 255, 0.25)';

        // Set shadow
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur    = 10;
        context.shadowColor   = "black";

        // Draw first circle
        context.beginPath();
        context.arc(tuningPegPosition.x, tuningPegPosition.y, 38, 0, 2 * Math.PI, false);
        context.closePath();

        context.fillStyle = '#777';
        context.fill();

        // Draw hexagon
        context.beginPath();
        var radius = 30;
        var a = (Math.PI * 2) / 6;
        context.moveTo(radius + tuningPegPosition.x, tuningPegPosition.y);
        for (var i = 1; i < 6; i++) {
            context.lineTo((radius * Math.cos(a*i)) + tuningPegPosition.x, (radius * Math.sin(a*i)) + tuningPegPosition.y);
        }
        context.closePath();

        context.fillStyle = '#777';
        context.fill();

        context.lineWidth = 1;
        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        context.stroke();


    };

    var drawString = function drawString(context, startX, stringNum, stringWidth, tuningPegPosition) {
        // Set shadow
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur    = 5;
        context.shadowColor   = "black";

        context.beginPath();
        // Start from nut
        context.moveTo(startX, 860);

        // Go vertically to the top of the nut
        context.lineTo(startX, 860 - 24);

        // Draw a line from the top of the nut to the tuning peg
        var tuningPegX = (stringNum / 3 < 1) ? (tuningPegPosition.x + 16 - stringWidth) : (tuningPegPosition.x - 16 + stringWidth);

        context.lineTo(tuningPegX, tuningPegPosition.y);

        context.lineWidth = stringWidth;
        context.strokeStyle = '#bbb';

        context.stroke();
    };

    var drawTuningPegCap = function drawTuningPegCap(context, tuningPegPosition) {
        // Set Tuning Pegs color
        context.fillStyle = 'rgba(255, 255, 255, 0.25)';

        // Set shadow
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur    = 10;
        context.shadowColor   = "black";

        // Draw second circle
        context.beginPath();
        context.arc(tuningPegPosition.x, tuningPegPosition.y, 16, 0, 2 * Math.PI, false);
        context.closePath();

        var gradient = context.createRadialGradient(tuningPegPosition.x, tuningPegPosition.y, 3, tuningPegPosition.x, tuningPegPosition.y, 17);
        gradient.addColorStop(0, "#aaa");
        gradient.addColorStop(1, "#666");

        // Fill with gradient
        context.fillStyle = gradient;

        context.fill();

        context.lineWidth = 1;
        context.strokeStyle = '#333';
        context.stroke();
    };

    // Draw each string (from the lowest to the highest)
    // 1. Draw base of the tuning pegs
    for (var s = 0; s < this.strings; s++) {
        drawTuningPeg(context, this.tuningPegs[this.headstock][s]);
    }

    // 2. Draw strings
    var intervalWidth = Math.round(200 / this.strings);
    var startX = 100 + (intervalWidth / 2);
    for (var s = 0; s < this.strings; s++) {
        var stringWidth = (this.strings + 1) - s;
        drawString(context, startX, s, stringWidth, this.tuningPegs[this.headstock][s]);
        startX += intervalWidth;
    }

    // 3. Draw cap of the tuning pegs
    for (var s = 0; s < this.strings; s++) {
        drawTuningPegCap(context, this.tuningPegs[this.headstock][s]);
    }
};

// Register controller into Angular JS
angular
    .module('Tuning')
    .controller('TuningWidgetController', TuningWidgetController);