(function () {
    'use strict';

    var GuitarNeckController = function () {

    };

    GuitarNeckController.prototype = {
        constructor: GuitarNeckController,

        guitar: null
    };

    // Inject controller into Angular
    angular
        .module('GuitarNeck')
        .controller('GuitarNeckController', GuitarNeckController);
});