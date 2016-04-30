/**
 * List controller for Lessons
 * @constructor
 */
var LessonListController = function LessonListController($uibModal, resources) {
    ListController.apply(this, arguments);
};

// Extends ListController
LessonListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
LessonListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
LessonListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
LessonListController.prototype.sortFields = {
    name    : 'string'
};

// Register controller into angular
angular
    .module('Lesson')
    .controller('LessonListController', LessonListController);
