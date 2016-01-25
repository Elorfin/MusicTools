var GuitarNeckController = function GuitarNeckController() {

};

GuitarNeckController.prototype.height = 300;

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('GuitarNeckController', GuitarNeckController);
