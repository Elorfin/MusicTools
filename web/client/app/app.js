/**
 * Workspace Application Root
 * Initializes needed modules in the Angular application
 */
angular.module('MusicTools', [
    'ngRoute',
    'ngAnimate',

    'ui.bootstrap',
    /*'ui.scrollable',*/

    // Core features
    'Layout',
    'Form',

    // Modules
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
]);