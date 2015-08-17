(function () {
    'use strict';

    var FretsOverlayController = function () {

    };

    FretsOverlayController.prototype = {
        start: 0,
        end: 24
    };

    angular.module('GuitarNeck')
        .controller('FretsOverlayController', FretsOverlayController);
})();