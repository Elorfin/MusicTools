/**
 * Form controller for Lessons
 * @constructor
 */
var LessonFormController = function LessonFormController(resource, LessonResource) {
    FormController.apply(this, arguments);
};

// Extends FormController
LessonFormController.prototype             = Object.create(FormController.prototype);
LessonFormController.prototype.constructor = LessonFormController;

// Set up dependency injection
LessonFormController.$inject = [ 'resource', 'LessonResource' ];

/**
 * Name of the current view
 * @type {string}
 */
LessonFormController.prototype.view = 'info';

/**
 * Switch the current view
 * @param {string} newView
 */
LessonFormController.prototype.changeView = function changeView(newView) {
    if (-1 !== [ 'info', 'section', 'summary'].indexOf(newView)) {
        this.view = newView;
    }
};

/**
 * Add a new Section to the Lesson
 */
LessonFormController.prototype.addSection = function addSection() {
    // Initialize new sections array if not exist
    if (typeof this.resource.sections === 'undefined') {
        this.resource.sections = [];
    }

    this.resource.sections.push({
        name: 'Title of the Section'
    });
};

// Register controller into Angular JS
angular
    .module('Lesson')
    .controller('LessonFormController', LessonFormController);
