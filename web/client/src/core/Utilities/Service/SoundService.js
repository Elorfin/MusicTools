/**
 * Sound Service
 * @returns {SoundService}
 * @constructor
 */
var SoundService = function SoundService() {

};

/**
 * Current AudioContext
 * @type {AudioContext|webkitAudioContext}
 */
SoundService.prototype.context = null;

/**
 * Get server
 * @returns {String}
 */
SoundService.prototype.playFrequency = function playFrequency(frequency, start, duration) {
    var context = new (window.AudioContext || window.webkitAudioContext)();

    var oscillator = context.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(context.destination);

    oscillator.start(start);
    oscillator.stop(start + duration);

    return oscillator;
};

// Inject Service into AngularJS
angular
    .module('Utilities')
    .service('SoundService', [ SoundService ]);