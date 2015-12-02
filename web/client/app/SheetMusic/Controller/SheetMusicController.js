/**
 * Controller constructor
 * @constructor
 */
var SheetMusicController = function SheetMusicControllerConstructor() {

};

SheetMusicController.$inject = [];

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
angular
    .module('SheetMusic')
    .controller('SheetMusicController', SheetMusicController);
