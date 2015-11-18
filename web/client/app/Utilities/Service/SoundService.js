/**
 * API Service
 * @returns {ApiService}
 * @constructor
 */
var SoundService = function SoundServiceConstructor() {

};

/**
 * Get server
 * @returns {String}
 */
SoundService.prototype.playFrequency = function playFrequency(frequency, autoplay, duration) {
    var context = new AudioContext();

    var oscillator = context.createOscillator();

    oscillator.type = 2;
    oscillator.frequency.value = 500;
    oscillator.connect(context.destination);

    if (autoplay) {
        oscillator.start(0);
        oscillator.stop(duration);
    }

    return oscillator;
};

// Inject Service into AngularJS
angular
    .module('Utilities')
    .service('SoundService', [ SoundService ]);