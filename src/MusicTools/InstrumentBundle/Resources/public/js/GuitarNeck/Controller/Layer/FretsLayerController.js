(function () {
    'use strict';

    var FretsLayerController = function () {

    };

    FretsLayerController.prototype = {
        constructor: FretsLayerController,

        firstFret: 0,
        lastFret:  24
    };

    // Inject controller into Angular
    angular
        .module('GuitarNeck')
        .controller('FretsLayerController', FretsLayerController);
});