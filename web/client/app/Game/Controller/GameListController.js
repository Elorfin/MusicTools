/**
 * List controller for Games
 * @constructor
 */
var GameListController = function GameListControllerConstructor($uibModal, resources) {
    ListController.apply(this, arguments);
};

// Extends ListController
GameListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
GameListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
GameListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
GameListController.prototype.sortFields = {
    name    : 'string'
};

// Register controller into angular
angular
    .module('Game')
    .controller('GameListController', GameListController);
