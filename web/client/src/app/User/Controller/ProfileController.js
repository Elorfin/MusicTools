/**
 * Profile Controller
 * @constructor
 */
var ProfileController = function ProfileController() {

};

// Set up dependency injection
ProfileController.$inject = [];

// Register controller into Angular JS
angular
    .module('User')
    .controller('ProfileController', ProfileController);
