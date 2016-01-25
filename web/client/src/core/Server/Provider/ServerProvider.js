/**
 * Server Provider
 * @constructor
 */
var ServerProvider = function ServerProvider() {

};

// Set up dependency injection
ServerProvider.$inject = [];

// Register provider into Angular JS
angular
    .module('Server')
    .provider('ServerProvider', ServerProvider);