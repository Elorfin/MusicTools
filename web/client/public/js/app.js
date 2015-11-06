(function() {
"use strict";
// File : app/Advertisement/module.js
/**
 * Advertisement Module
 */
angular.module('Advertisement', []);
// File : app/Badge/module.js
/**
 * Badge Module
 */
angular.module('Badge', []);
// File : app/Forum/module.js
/**
 * Forum Module
 */
angular.module('Forum', []);
// File : app/Game/module.js
/**
 * Game Module
 */
angular.module('Game', []);
// File : app/GuitarNeck/module.js
(function () {
    'use strict';

    angular.module('GuitarNeck', [
        'Guitar'
    ]);
})();
// File : app/Instrument/module.js
/**
 * Instrument Module
 */
angular.module('Instrument', []);
// File : app/Layout/module.js
/**
 * Layout Module
 * Contains all the tools for building the Layout of the application (header, sidebar, etc.)
 */
angular.module('Layout', []);
// File : app/Lesson/module.js
/**
 * Lesson Module
 */
angular.module('Lesson', []);
// File : app/SheetMusic/module.js
/**
 *
 */
angular.module('SheetMusic', []);
// File : app/SongBook/module.js
/**
 * SongBook Module
 */
angular
    .module('SongBook', [
        'ngResource',
        'ngFileUpload'
    ])
    .config([
        '$translateProvider',
        function($translateProvider) {
            // Inject translations
            for (var lang in songBookTranslations) {
                if (songBookTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, songBookTranslations[lang]);
                }
            }
        }
    ]);
// File : app/Theory/module.js
/**
 * Theory Module
 */
angular.module('Theory', []);
// File : app/Tuning/module.js
/**
 * Tuning module
 */
angular.module('Tuning', []);
// File : app/User/module.js
/**
 * User Module
 */
angular.module('User', []);
// File : app/Utilities/module.js
/**
 * Utilities Module
 */
angular.module('Utilities', []);
// File : app/app.js
/**
 * Workspace Application Root
 * Initializes needed modules in the Angular application
 */
angular
    .module('MusicTools', [
        // Angular modules
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngResource',

        // Libraries modules
        'ngFileUpload',
        'ui.bootstrap',
        'pascalprecht.translate',
        /*'ui.scrollable',*/
        'angular-loading-bar',

        // Core modules
        'Utilities',
        'Layout',

        // App modules
        'Advertisement',
        'Badge',
        'Forum',
        'Game',
        'Instrument',
        'Lesson',
        'SongBook',
        'Theory',
        'Tuning',
        'User'

        /*'Note',
        'Guitar',
        'GuitarNeck',
        'SheetMusic'*/
    ])
    .config([
        '$translateProvider',
        'cfpLoadingBarProvider',
        function($translateProvider, cfpLoadingBarProvider) {
            // Inject translations
            for (var lang in appTranslations) {
                if (appTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, appTranslations[lang]);
                }
            }

            // Set the default lang
            $translateProvider.preferredLanguage('en');

            // Set sanitize strategy for translations
            $translateProvider.useSanitizeValueStrategy('sanitize');

            // Disable loading spinner
            cfpLoadingBarProvider.includeSpinner = false;
        }
    ]);
// File : app/Advertisement/routes.js
/**
 * Advertisement routes
 */
angular.module('Advertisement').config([
    '$routeProvider',
    function AdvertisementRoutes($routeProvider) {

    }
]);
// File : app/Badge/routes.js
/**
 * Badge routes
 */
angular.module('Badge').config([
    '$routeProvider',
    function BadgeRoutes($routeProvider) {

    }
]);
// File : app/Forum/routes.js
/**
 * Forum routes
 */
angular.module('Forum').config([
    '$routeProvider',
    function ForumRoutes($routeProvider) {

    }
]);
// File : app/Game/routes.js
/**
 * Game routes
 */
angular.module('Game').config([
    '$routeProvider',
    function GameRoutes($routeProvider) {

    }
]);
// File : app/GuitarNeck/Controller/GuitarNeckController.js
var GuitarNeckController = function GuitarNeckController() {

};

GuitarNeckController.prototype.height = 300;

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('GuitarNeckController', GuitarNeckController);

// File : app/GuitarNeck/Controller/Layer/AbstractLayerController.js
/**
 * Abstract Layer Controller
 * @returns {AbstractLayerController}
 * @constructor
 */
var AbstractLayerController = function AbstractLayerController() {
    return this;
};

/**
 * Options for rendering
 * @type {Object}
 */
AbstractLayerController.prototype.renderOptions = {
    /**
     * Width of the Layer
     * @type {Number}
     */
    width  : null,

    /**
     * Height of the Layer
     * @type {Number}
     */
    height : null,

    /**
     * Rendering colors
     * @type {Object}
     */
    color: {
        /**
         * Color of the font
         * @type {String}
         */
        font      : '#161616',

        /**
         * Default color
         * @type {String}
         */
        default   : '#303030',

        /**
         * Highlighted color
         * @type {String}
         */
        highlight : '#444444'
    }
};

/**
 * Redraw Layer
 * @param   {HTMLCanvasElement} canvas
 * @param   {Number}            width
 * @param   {Number}            height
 * @returns {AbstractLayerController}
 */
AbstractLayerController.prototype.redraw = function redraw(canvas, width, height) {
    console.log('Abstract Layer is redrawn.');

    // Set sizes
    this.renderOptions.width  = width;
    this.renderOptions.height = height;

    // Get 2D context of the canvas
    var context = canvas.getContext('2d');
    if (null !== context) {
        // Set width of the canvas
        canvas.width  = this.renderOptions.width;
        canvas.height = this.renderOptions.height;
    }

    return this;
};

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('AbstractLayerController', AbstractLayerController);

// File : app/GuitarNeck/Controller/Layer/FretLayerController.js
/**
 * Fret Layer Controller
 * @returns {FretLayerController}
 * @constructor
 */
var FretLayerController = function FretLayerController() {
    // Call parent constructor
    AbstractLayerController.apply(this, arguments);

    return this;
};

// Extends the base controller
FretLayerController.prototype = Object.create(AbstractLayerController.prototype);
FretLayerController.prototype.constructor = AbstractLayerController;

/**
 * Configuration for the rendering of reference Frets
 * @type {Object}
 */
FretLayerController.prototype.renderOptions.references = {
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
FretLayerController.prototype.renderOptions.numbers = {
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
FretLayerController.prototype.fretFirst = 0;

/**
 * Last displayed fret
 * @type {Number}
 */
FretLayerController.prototype.fretLast = 24;

/**
 * Total of frets that can be displayed
 * @type {Number}
 */
FretLayerController.prototype.fretCount = 24;

/**
 * Redraw Layer
 * @param   {HTMLCanvasElement} canvas Canvas to draw on
 * @param   {Number}            width  Width of the Layer
 * @param   {Number}            height Height of the Layer
 * @returns {FretLayerController}
 */
FretLayerController.prototype.redraw = function redraw(canvas, width, height) {
    console.log('Fret Layer is redrawn.');

    // Call parent controller
    AbstractLayerController.prototype.redraw.apply(this, arguments);

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
 * @returns {FretLayerController}
 */
FretLayerController.prototype.drawFrets = function drawFrets(context) {
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
FretLayerController.prototype.fretIsHighlighted = function fretIsHighlighted(fretNumber) {
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
 * @returns {FretLayerController}
 */
FretLayerController.prototype.drawFret = function drawFret(context, x, number, highlight) {
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
 * @returns {FretLayerController}
 */
FretLayerController.prototype.drawFretNumber = function drawFretNumber(context, x, number, highlight) {
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
 * @returns {FretLayerController}
 */
FretLayerController.prototype.drawFretReference = function drawFretReference(context, x, number) {
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

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('FretLayerController', FretLayerController);

// File : app/GuitarNeck/Controller/Layer/NoteLayerController.js
/**
 * Note Layer Controller
 * @returns {NoteLayerController}
 * @constructor
 */
var NoteLayerController = function NoteLayerController() {
    // Call parent constructor
    AbstractLayerController.apply(this, arguments);

    return this;
};

// Extends the base controller
NoteLayerController.prototype = Object.create(AbstractLayerController.prototype);
NoteLayerController.prototype.constructor = NoteLayerController;

/**
 * Redraw strings
 * @param   {HTMLCanvasElement} canvas Context to draw on
 * @param   {Number}            width  Width of the Layer
 * @param   {Number}            height Height of the Layer
 * @returns {NoteLayerController}
 */
NoteLayerController.prototype.redraw = function redraw(canvas, width, height) {
    console.log('Note Layer is redrawn.');

    return this;
};

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('NoteLayerController', NoteLayerController);

// File : app/GuitarNeck/Controller/Layer/StringLayerController.js
/**
 * String Layer Controller
 * @returns {StringLayerController}
 * @constructor
 */
var StringLayerController = function StringLayerController() {
    // Call parent constructor
    AbstractLayerController.apply(this, arguments);

    return this;
};

// Extends the base controller
StringLayerController.prototype = Object.create(AbstractLayerController.prototype);
StringLayerController.prototype.constructor = StringLayerController;

/**
 * Redraw strings
 * @param   {HTMLCanvasElement} canvas Context to draw on
 * @param   {Number}            width  Width of the Layer
 * @param   {Number}            height Height of the Layer
 * @returns {StringLayerController}
 */
StringLayerController.prototype.redraw = function redraw(canvas, width, height) {
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

StringLayerController.prototype.drawStrings = function drawStrings(context) {
    /*for (var i = this.strings.length - 1; i >= 0; i--) {
        this.drawString(i, this.strings[i].value);
    }*/

    return this;
};

/**
 * Draw a string
 */
StringLayerController.prototype.drawString = function drawString(stringNumber, stringValue) {
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

StringLayerController.prototype.getStringPosition = function getStringPosition(stringNumber) {
    // Calculate position of the string
    var stringPosition = this.height.strings.interval * stringNumber + 0.5 + this.height.strings.offset;
    if (this.frets.showNumber) {
        // We display the fret numbers, so move down the strings
        stringPosition += this.renderOptions.fretNumberSize;
    }

    return stringPosition;
};

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('StringLayerController', StringLayerController);

// File : app/GuitarNeck/Directive/GuitarNeckDirective.js
angular
    .module('GuitarNeck')
    .directive('guitarNeckWidget', [
        function () {

            return {
                restrict: 'E',
                templateUrl: assetDirectory + '/musictoolsinstrument/js/GuitarNeck/Partial/GuitarNeck.html',
                replace: true,
                scope: {
                    guitar: '=?'
                },
                controller: 'GuitarNeckController',
                controllerAs: 'guitarNeckCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);

// File : app/GuitarNeck/Directive/Layer/FretLayerDirective.js
angular
    .module('GuitarNeck')
    .directive('fretLayer', [
        '$window',
        function FretLayerDirective($window) {
            return {
                restrict: 'E',
                templateUrl: assetDirectory + '/musictoolsinstrument/js/GuitarNeck/Partial/Layer/FretLayer.html',
                replace: true,
                scope: {
                    /**
                     * First displayed fret
                     */
                    fretFirst: '@',

                    /**
                     * Last displayed fret
                     */
                    fretLast : '@',

                    /**
                     * Total of frets that can be displayed
                     */
                    fretCount: '@'
                },
                controller: 'FretLayerController',
                controllerAs: 'fretLayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs, fretLayerCtrl) {
                    // Get canvas
                    var canvas = element.find('canvas').get(0);

                    // Draw frets on load
                    fretLayerCtrl.redraw(canvas, element.width(), element.height());

                    // Watch properties
                    scope.$watch(function() { return fretLayerCtrl.fretFirst }, function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            // Redraw Layer
                            fretLayerCtrl.redraw(canvas, element.width(), element.height());
                        }
                    });

                    scope.$watch(function() { return fretLayerCtrl.fretLast }, function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            // Redraw Layer
                            fretLayerCtrl.redraw(canvas, element.width(), element.height());
                        }
                    });

                    scope.$watch(function() { return fretLayerCtrl.fretCount }, function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            // Redraw Layer
                            fretLayerCtrl.redraw(canvas, element.width(), element.height());
                        }
                    });

                    // Redraw layer on window resize
                    $($window).on('resize', function onWindowResize(event) {
                        fretLayerCtrl.redraw(canvas, element.width(), element.height());
                    });
                }
            };
        }
    ]);
// File : app/GuitarNeck/Directive/Layer/NoteLayerDirective.js
angular
    .module('GuitarNeck')
    .directive('noteLayer', [
        '$window',
        function NoteLayerDirective($window) {
            return {
                restrict: 'E',
                templateUrl: assetDirectory + '/musictoolsinstrument/js/GuitarNeck/Partial/Layer/NoteLayer.html',
                replace: true,
                scope: {

                },
                controller: 'NoteLayerController',
                controllerAs: 'noteLayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs, noteLayerCtrl) {
                    // Draw notes on load
                    noteLayerCtrl.redraw();

                    // Redraw layer on window resize
                    $($window).on('resize', function onWindowResize(event) {
                        noteLayerCtrl.redraw();
                    });
                }
            };
        }
    ]);

// File : app/GuitarNeck/Directive/Layer/StringLayerDirective.js
angular
    .module('GuitarNeck')
    .directive('stringLayer', [
        '$window',
        function StringLayerDirective($window) {
            return {
                restrict: 'E',
                templateUrl: assetDirectory + '/musictoolsinstrument/js/GuitarNeck/Partial/Layer/StringLayer.html',
                replace: true,
                scope: {
                    strings: '=?'
                },
                controller: 'StringLayerController',
                controllerAs: 'stringLayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs, stringLayerCtrl) {
                    // Get canvas
                    var canvas = element.get(0);

                    // Draw strings on load
                    stringLayerCtrl.redraw(canvas, element.width(), element.height());

                    // Redraw layer on window resize
                    $($window).on('resize', function onWindowResize(event) {
                        stringLayerCtrl.redraw(canvas, element.width(), element.height());
                    });
                }
            };
        }
    ]);

// File : app/Instrument/Controller/ListViewController.js
var ListViewController = function ListViewControllerContructor() {

};

// Register controller into angular
angular.module('Instrument').controller('ListViewController', [ ListViewController ]);
// File : app/Instrument/Directive/MenuDirective.js
/**
 * Instrument menu
 * Used to select the current instrument, and if relevant the tuning (e.g. for Guitar or Bass)
 */
angular
    .module('Instrument')
    .directive('instrumentMenu', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Instrument/Partial/menu.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Instrument/Service/GuitarService.js
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
// File : app/Instrument/routes.js
/**
 * Instrument routes
 */
angular.module('Instrument').config([
    '$routeProvider',
    function InstrumentRoutes($routeProvider) {
        // List route
        $routeProvider
            .when('/instruments', {
                templateUrl:  '../app/Instrument/Partial/list.html',
                controller:   'ListViewController',
                controllerAs: 'listViewCtrl'
            });
    }
]);
// File : app/Layout/Controller/Page/FormController.js
/**
 * Base Form controller
 * @constructor
 */
var BaseFormController = function BaseFormControllerContructor(entity) {
    this.entity = entity;
};

/**
 * Current Entity
 * @type {Object}
 */
BaseFormController.prototype.entity = null;

/**
 * Is the edited entity a new one ?
 * @returns {boolean}
 */
BaseFormController.prototype.isNew = function () {
    var isNew = true;
    if (null !== this.entity && 'undefined' !== typeof (this.entity.id) && null !== this.entity.id && 0 !== this.entity.id.length) {
        isNew = false;
    }

    return isNew;
};

/**
 * Validate the form
 */
BaseFormController.prototype.validate = function () {
    this.entity.$create();
};

// Register controller into angular
angular
    .module('Layout')
    .controller('BaseFormController', [ 'entity', BaseFormController ]);

// File : app/Layout/Directive/Header/HeaderDirective.js
/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('layoutHeader', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Header/navbar.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Layout/Directive/Page/PageButtonDirective.js
/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('layoutPageButton', [
        function () {
            return {
                restrict: 'E',
                template: '<li role="presentation" data-ng-transclude=""></li>',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Layout/Directive/Page/PageButtonsDirective.js
/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('layoutPageButtons', [
        function () {
            return {
                restrict: 'E',
                template: '<nav class="page-buttons navbar navbar-default"><ul class=" nav navbar-nav" data-ng-transclude=""></ul></nav>',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Layout/Directive/Page/PageDirective.js
/**
 * Represents a page of the application
 */
angular
    .module('Layout')
    .directive('layoutPage', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Page/page.html',
                replace: true,
                transclude: true
            };
        }
    ]);
// File : app/Layout/Directive/Page/PageTitleDirective.js
/**
 * Represents the title of a Page
 */
angular
    .module('Layout')
    .directive('layoutPageTitle', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Page/title.html',
                replace: true,
                transclude: true,
                scope: {
                    /**
                     * If true, the title is hidden with the `sr-only` class
                     */
                    hideTitle: '@'
                }
            };
        }
    ]);
// File : app/Layout/Directive/Sidebar/SidebarDirective.js
/**
 * Sidebar of the application
 */
angular
    .module('Layout')
    .directive('layoutSidebar', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Sidebar/sidebar.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Layout/Directive/Sidebar/SidebarItemDirective.js
/**
 * Represents a link in the sidebar
 */
angular
    .module('Layout')
    .directive('layoutSidebarItem', [
        '$route',
        function ($route) {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/Sidebar/sidebar-item.html',
                replace: true,
                scope: {
                    icon  : '@',
                    label : '@',
                    url   : '@'
                },
                link: function (scope, element, attrs) {
                    scope.current = false;
                    if ($route.current && $route.current.regexp) {
                        scope.current = $route.current.regexp.test(scope.url);
                    }
                }
            };
        }
    ]);
// File : app/Lesson/routes.js
/**
 * Lesson routes
 */
angular.module('Lesson').config([
    '$routeProvider',
    function LessonRoutes($routeProvider) {

    }
]);
// File : app/SheetMusic/Controller/SheetMusicController.js
/**
 * Controller constructor
 * @constructor
 */
var SheetMusicController = function SheetMusicController() {

};

/**
 * Sheet music file to display
 * @type {string}
 */
SheetMusicController.prototype.file = null;

/**
 * The alphaTab object
 * @type {Object}
 */
SheetMusicController.prototype.component = {};

/**
 * Information about the playback player
 * @type {Object}
 */
SheetMusicController.prototype.player = {
    /**
     * Is the player ready ?
     * @type {boolean}
     */
    ready: false,

    /**
     * State of the player
     *     0 = stopped
     *     1 = playing
     *     2 = paused
     * @type {integer}
     */
    state: 0,

    /**
     * The alphaTab player object
     * @type {object}
     */
    component: {}
};

/**
 * Start playback
 */
SheetMusicController.prototype.play = function play() {
    this.player.component.Play();
};

/**
 * Pause playback
 */
SheetMusicController.prototype.pause = function pause() {
    this.player.component.Pause();
};

/**
 * Jump to previous bar
 */
SheetMusicController.prototype.previousBar = function previousBar() {

};

/**
 * Jump to next bar
 */
SheetMusicController.prototype.nextBar = function nextBar() {

};

// Inject the controller into angular
angular.module('SheetMusic').controller('SheetMusicController', SheetMusicController);

// File : app/SheetMusic/Directive/SheetMusicDirective.js
(function () {
    'use strict';

    angular.module('SheetMusic')
        .directive('sheetMusic', [
            '$timeout',
            function ($timeout) {
                return {
                    restrict: 'E',
                    templateUrl: assetDirectory + '/musictoolssongbook/js/SheetMusic/Partial/sheet-music.html',
                    replace: true,
                    scope: {
                        file: '@'
                    },
                    bindToController: true,
                    controller:   'SheetMusicController',
                    controllerAs: 'sheetMusicCtrl',
                    link: function (scope, element, attrs, sheetMusicCtrl) {
                        // Store alphaTab object into the Controller
                        sheetMusicCtrl.component = $('.alphaTab');

                        var $element = $(element);

                        // Set size of the player navbar
                        var sheetPosition = $element.offset();
                        var sheetWidth = $element.width();
                        var navbar = $element.find('.sheet-music-controls');

                        // Set navbar position and size
                        navbar.offset({ left: sheetPosition.left });
                        navbar.width(sheetWidth);

                        // Initialize alphaTab
                        $timeout(function () {
                            //
                            // 1. Load alphaTab
                            sheetMusicCtrl.component.alphaTab();

                            //
                            // 2. Initialize Player and Setup Player UI
                            sheetMusicCtrl.player.component = sheetMusicCtrl.component.alphaTab('playerInit', {
                                asRoot        : assetDirectory + '/musictoolssongbook/libraries/alphaTab/Samples/JavaScript/lib/alphaSynth/',
                                swfObjectRoot : assetDirectory + '/musictoolssongbook/libraries/alphaTab/Samples/JavaScript/lib/alphaSynth/'
                            }); // init alphaSynth

                            //
                            // 3. Bind events
                            sheetMusicCtrl.player.component.On('ready', function(r) {
                                // load default data
                                sheetMusicCtrl.player.component.LoadSoundFontUrl(assetDirectory + '/musictoolssongbook/libraries/alphaTab/Samples/JavaScript/lib/alphaSynth/default.sf2');
                            });

                            sheetMusicCtrl.player.component.On('soundFontLoad', function(loaded, full) {
                                var percentage = ((loaded / full) * 100)|0;
                                $('#sfInfo .progress').text('(' + percentage + '%)');
                            });

                            sheetMusicCtrl.player.component.On('soundFontLoaded', function() {
                                $('#sfInfo').hide();
                            });

                            sheetMusicCtrl.player.component.On('readyForPlay', function(r) {
                                /*sheetMusicCtrl.player.ready = r;*/
                                updateControls();

                                scope.$apply();
                            });

                            sheetMusicCtrl.player.component.On('playerStateChanged', function(s) {
                                sheetMusicCtrl.player.state = s;
                                updateControls();

                                scope.$apply();
                            });

                            //
                            // 3. Add cursors (optional)
                            sheetMusicCtrl.component.alphaTab('playerCursor');
                            // sheetMusicCtrl.component.alphaTab('drop'); // drag and drop
                        }, 300);

                        function updateControls() {
                            if(!sheetMusicCtrl.player.ready) {
                                $('#loadingInfo').show()
                            }
                            else {
                                $('#loadingInfo').hide()
                            }
                        }
                    }
                };
            }
        ]);
})();
// File : app/SongBook/Controller/SongFormController.js
/**
 * Form controller for Songs
 * @constructor
 */
var SongFormController = function SongFormController(entity, Upload, ApiService, $timeout, $scope) {
    BaseFormController.apply(this, arguments);

    /*this.uploadService = Upload;*/

    $scope.uploadPic = function(file) {
        var method = this.isNew() ? 'POST' : 'PUT';
        var url    = this.isNew() ? ApiService.getServer() + '/songs' : ApiService.getServer() + '/songs/' + this.entity.id;
        file.upload = Upload.upload({
            url: url,
            method: method,
            data: {
                musictools_songbookbundle_song: {
                    title: this.entity.title,
                    artist: this.entity.artist,

                        cover: {
                            file: file
                        }
                }

            }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }.bind(this);
};

// Extends BaseFormController
SongFormController.prototype             = Object.create(BaseFormController.prototype);
SongFormController.prototype.constructor = SongFormController;

SongFormController.prototype.validate = function () {
    /*this.uploadCover(this.entity.cover);*/

    BaseFormController.validate.apply(this, arguments);
};

SongFormController.prototype.uploadCover = function uploadCover(file) {
    /*file.upload = this.uploadService.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: { file: file, username: $scope.username }
    });

    file.upload.then(function (response) {
        $timeout(function () {
            file.result = response.data;
        });
    }, function (response) {
        if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });*/
};

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongFormController', [ 'entity', 'Upload', 'ApiService', '$timeout', '$scope', SongFormController ]);

// File : app/SongBook/Controller/SongListController.js
/**
 * List controller for Songs
 * @constructor
 */
var SongListController = function SongListControllerConstructor(entities) {
    console.log(entities.length);

    this.entities = entities;
};

SongFormController.prototype.entities = [];

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongListController', [ 'entities', SongListController ]);

// File : app/SongBook/Controller/SongShowController.js
/**
 * Show controller for Songs
 * @constructor
 */
var SongShowController = function SongShowControllerContructor(entity) {
    this.entity = entity;
};

SongShowController.prototype.entity = null;

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongShowController', [ 'entity', SongShowController ]);

// File : app/SongBook/Resource/Song.js
/**
 * Song Resource
 */
angular
    .module('SongBook')
    .factory('Song', [
        '$resource',
        'ApiService',
        function SongResource($resource, ApiService){
            return $resource(ApiService.getServer() + '/songs/:id', { id: '@id' }, {
                create: {
                    method: 'POST',
                    transformRequest: function (data, headersGetter) {
                        var wrappedData = {
                            'musictools_songbookbundle_song': data
                        };

                        return JSON.stringify(wrappedData);
                    }
                },
                update: {
                    method: 'PUT',
                    transformRequest: function (data, headersGetter) {
                        var result = JSON.stringify(data.productIntro);
                        return result;
                    }
                }
            });
        }]
    );
// File : app/SongBook/routes.js
/**
 * SongBook routes
 */
angular.module('SongBook').config([
    '$routeProvider',
    function SongBookRoutes($routeProvider) {
        $routeProvider
            // List
            .when('/songs', {
                templateUrl:  '../app/SongBook/Partial/list.html',
                controller:   'SongListController',
                controllerAs: 'songListCtrl',
                resolve: {
                    entities: [
                        '$route',
                        'Song',
                        function entitiesResolver($route, Song) {
                            return Song.query();
                        }
                    ]
                }
            })

            // New form
            .when('/songs/new', {
                templateUrl:  '../app/SongBook/Partial/form.html',
                controller:   'SongFormController',
                controllerAs: 'songFormCtrl',
                resolve: {
                    entity: [
                        'Song',
                        function entityResolver(Song) {
                            return new Song();
                        }
                    ]
                }
            })

            // Show
            .when('/songs/:id', {
                templateUrl:  '../app/SongBook/Partial/show.html',
                controller:   'SongShowController',
                controllerAs: 'songShowCtrl',
                resolve: {
                    entity: [
                        '$route',
                        'Song',
                        function entityResolver($route, Song) {
                            return Song.get({ id: $route.current.params.id });
                        }
                    ]
                }
            })

            // Edit form
            .when('/songs/:id/edit', {
                templateUrl:  '../app/SongBook/Partial/form.html',
                controller:   'SongFormController',
                controllerAs: 'songFormCtrl',
                resolve: {
                    entity: [
                        '$route',
                        'Song',
                        function entityResolver($route, Song) {
                            return Song.get({ id: $route.current.params.id });
                        }
                    ]
                }
            });
    }
]);
// File : app/SongBook/translations.js
/**
 * SongBook translations
 * @type {Object}
 */
var songBookTranslations = {};

/**
 * Language = EN
 */
songBookTranslations['en'] = {
    no_song_found: 'No song found.'
};

/**
 * Language = FR
 */
songBookTranslations['fr'] = {
    no_song_found: 'Aucun morceau trouvé.'
};
// File : app/Theory/Directive/NoteDisplaySwitchDirective.js
angular
    .module('Theory')
    .directive('noteDisplaySwitch', [
        function NoteDisplaySwitchDirective() {
            return {
                restrict: 'A',
                controller: [
                    'NoteService',
                    function NoteDisplaySwitchController(NoteService) {
                        this.displayFlat = NoteService.isDisplayFlat();

                        this.switchDisplay = function switchDisplay() {
                            this.displayFlat = !this.displayFlat;
                            NoteService.setDisplayFlat(this.displayFlat);
                        }
                    }
                ],
                controllerAs: 'noteDisplaySwitchCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Theory/Directive/NoteListDirective.js
angular
    .module('Theory')
    .directive('noteList', [
        'NoteService',
        function (NoteService) {
            return {
                restrict: 'E',
                templateUrl: assetDirectory + '/musictoolstheory/js/Note/Partial/list.html',
                replace: true,
                scope: {

                },
                /*controller: 'FretsOverlayController',
                 bindToController: true,*/
                link: function (scope, element, attrs) {
                    NoteService.all().then(function (data) {
                        scope.notes = data;
                    });
                }
            };
        }
    ]);
// File : app/Theory/Directive/NoteSelectorDirective.js
angular
    .module('Theory')
    .directive('noteSelector', [
        'NoteService',
        function NoteSelectorService(NoteService) {
            return {
                restrict: 'E',
                templateUrl: assetDirectory + '/musictoolstheory/js/Note/Partial/selector.html',
                replace: true,
                scope: {

                },
                controller: function NoteSelectorController() {},
                controllerAs: 'noteSelectorCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {
                    NoteService.all().then(function (data) {
                        scope.notes = data;
                    });

                    /*$(document).keydown(function(e) {
                        switch(e.which) {
                            case 37: // left
                                break;

                            case 38: // up
                                break;

                            case 39: // right
                                break;

                            case 40: // down
                                break;

                            default: return; // exit this handler for other keys
                        }
                        e.preventDefault(); // prevent the default action (scroll / move caret)
                    });*/
                }
            };
        }
    ]);
// File : app/Theory/Service/NoteService.js
/**
 * Note Service
 * @param $http
 * @param $q
 * @returns {NoteService}
 * @constructor
 */
var NoteService = function NoteService($http, $q) {
    this.services['$http'] = $http;
    this.services['$q']    = $q;

    return this;
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
 * @param   {Object} note
 * @returns {NoteService}
 */
NoteService.prototype.setCurrent = function setCurrent(note) {
    this.current = note;

    return this;
};

/**
 * Is the displayed name of the Note is flat (true) or sharp (false)
 * @returns {boolean}
 */
NoteService.prototype.isDisplayFlat = function isDisplayFlat() {
    return this.displayFlat;
};

/**
 * Change the way the Note names are displayed
 * @param   {boolean} newValue
 * @returns {NoteService}
 */
NoteService.prototype.setDisplayFlat = function setDisplayFlat(newValue) {
    if (newValue !== this.displayFlat) {
        this.displayFlat = newValue;

        // Rename the notes
        this.renameNotes();
    }

    return this;
};

/**
 * Change the displayed name of Notes
 * @returns {NoteService}
 */
NoteService.prototype.renameNotes = function renameNotes() {
    this.apply(function (note) {
        // Get the display name based of the configuration
        if (this.displayFlat) {
            // Display flat name
            note.name = note.flatName;
        } else {
            // Display sharp name
            note.name = note.sharpName;
        }
    }.bind(this));

    return this;
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

/**
 * Call server to get the list of Notes
 * @returns {promise}
 */
NoteService.prototype.find = function find() {
    var deferred = this.services.$q.defer();

    this.services.$http
        .get(Routing.generate('theory_note', { _format: 'json' }), {})

        .success(function (response) {
            this.notes = response;

            this.renameNotes();

            deferred.resolve(response);
        }.bind(this))
        .error(function (response) {
            deferred.reject(response);
        });

    return deferred.promise;
};

/**
 * Get a Note by its value
 * @param   {Number} value
 * @returns {Object}
 */
NoteService.prototype.get = function get(value) {
    return this.notes.find(function findByValue(element) {
        return value == element.value;
    });
};

/**
 * Add semitones to the Note given and get the corresponding Note
 * @param   {Object} reference
 * @param   {Number} semitones
 * @returns {Object}
 */
NoteService.prototype.addSemitone = function addSemitone(reference, semitones) {
    var newValue = (reference.value + semitones) % 12;

    return this.get(newValue);
};

/**
 * Apply a callback to all the Notes
 * @param   {Function} callback
 * @returns {NoteService}
 */
NoteService.prototype.apply = function apply(callback) {
    if (typeof callback === 'function') {
        for (var i = 0; i < this.notes.length; i++) {
            callback(this.notes[i]);
        }
    }

    return this;
};

// Inject Service into AngularJS
angular.module('Theory').service('NoteService', [ '$http', '$q', NoteService ]);
// File : app/Theory/routes.js
/**
 * Theory routes
 */
angular.module('Theory').config([
    '$routeProvider',
    function TheoryRoutes($routeProvider) {
        $routeProvider
            .when('/theory', {
                templateUrl:  '../app/Theory/Partial/index.html'
            });
    }
]);
// File : app/Tuning/tuning-widget.js
(function () {
    'use strict';

    angular
        .module('GuitarTuning', [])
        .directive('tuningEdit', [
            function () {
                return {
                    restrict: 'E',
                    templateUrl: '',
                    replace: true,
                    scope: {
                        headstock: '=',
                        strings: '='
                    }
                };
            }
        ]);
})();
// File : app/User/Controller/ProfileController.js
/**
 *
 * @constructor
 */
var ProfileController = function ProfileControllerContructor() {

};

// Register controller into angular
angular.module('User').controller('ProfileController', [ ProfileController ]);

// File : app/User/Controller/SettingsController.js
/**
 *
 * @constructor
 */
var SettingsController = function SettingsControllerContructor() {

};

// Register controller into angular
angular.module('User').controller('SettingsController', [ SettingsController ]);

// File : app/User/Directive/MenuDirective.js
/**
 * User menu
 */
angular
    .module('User')
    .directive('userMenu', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/User/Partial/menu.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/User/routes.js
/**
 * User routes
 */
angular.module('User').config([
    '$routeProvider',
    function UserRoutes($routeProvider) {
        // Users list
        $routeProvider
            .when('/users', {
                templateUrl:  '../app/User/Partial/list.html',
                controller:   'ListViewController',
                controllerAs: 'listViewCtrl'
            });

        // Current User profile
        $routeProvider
            .when('/profile', {
                templateUrl:  '../app/User/Partial/profile.html',
                controller:   'ProfileController',
                controllerAs: 'profileCtrl'
            });

        // Current User settings
        $routeProvider
            .when('/profile/settings', {
                templateUrl:  '../app/User/Partial/settings.html',
                controller:   'SettingsController',
                controllerAs: 'settingsCtrl'
            });
    }
]);
// File : app/Utilities/Service/ApiService.js
/**
 * API Service
 * @returns {ApiService}
 * @constructor
 */
var ApiService = function ApiService() {

    return this;
};

ApiService.prototype.constructor = ApiService;

/**
 * Server base path
 * @type {String}
 */
ApiService.prototype.server = '/MusicTools/web/app_dev.php';

/**
 * Get server
 * @returns {String}
 */
ApiService.prototype.getServer = function getServer() {
    return this.server;
};

// Inject Service into AngularJS
angular
    .module('Utilities')
    .service('ApiService', [ ApiService ]);
// File : app/routes.js
/**
 * Workspace Application routes
 * Defines all routes for the Application
 */
angular.module('MusicTools').config([
    '$routeProvider',
    function MusicToolsConfig($routeProvider) {
        // Bind errors routes
    }
]);
// File : app/translations.js
/**
 * Application translations
 * @type {Object}
 */
var appTranslations = {};

/**
 * Language = EN
 */
appTranslations['en'] = {
    'link.instrument':    'my instruments',
    'link.song_book':     'my songbook',
    'link.theory':        'theory',
    'link.musician':      'musicians',
    'link.advertisement': 'advertisement',
    'link.game':          'games',
    'link.forum':         'forum',
    'link.lesson':        'lessons'
};

/**
 * Language = FR
 */
appTranslations['fr'] = {
    'link.instrument':    'mes instruments',
    'link.song_book':     'my songbook',
    'link.theory':        'théorie',
    'link.musician':      'musiciens',
    'link.advertisement': 'annonces',
    'link.game':          'jeux',
    'link.forum':         'forum',
    'link.lesson':        'cours'
};
})();