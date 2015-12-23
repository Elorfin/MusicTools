/**
 * Wizard Form controller
 * @constructor
 */
var FormWizardController = function FormWizardControllerConstructor(resource, ApiResource) {
    FormController.apply(this, arguments);

    this.setCurrentStep(this.steps[0]);
};

// Extends FormController
FormWizardController.prototype             = Object.create(FormController.prototype);
FormWizardController.prototype.constructor = FormWizardController;

// Set up dependency injection
FormWizardController.$inject = [ 'resource', 'ApiResource' ];

/**
 * Wizard steps
 * @type {Array}
 */
FormWizardController.prototype.steps = [];

/**
 * Current step
 * @type {Object}
 */
FormWizardController.prototype.currentStep = null;

FormWizardController.prototype.hasPrevious = true;

FormWizardController.prototype.hasNext = true;

/**
 * Set current step wizard
 * @param step
 */
FormWizardController.prototype.setCurrentStep = function setCurrentStep(step) {
    if (null !== this.currentStep) {
        // Validate step before leaving
        this.validateStep(this.currentStep);
    }

    this.currentStep = step;

    this.hasPrevious = true;
    this.hasNext     = true;

    var position = this.steps.indexOf(this.currentStep);
    if (0 === position) {
        this.hasPrevious = false;
    }

    if (this.steps.length - 1 === position) {
        this.hasNext = false;
    }
};

/**
 * Go to previous step
 */
FormWizardController.prototype.previousStep = function previousStep() {
    var pos = this.steps.indexOf(this.currentStep);
    if (-1 !== pos && this.steps[pos - 1]) {
        this.setCurrentStep(this.steps[pos - 1]);
    }
};

/**
 * Go to next step
 */
FormWizardController.prototype.nextStep = function nextStep() {
    var pos = this.steps.indexOf(this.currentStep);
    if (-1 !== pos && this.steps[pos + 1]) {
        this.setCurrentStep(this.steps[pos + 1]);
    }
};

/**
 * Validate step
 * @param step
 */
FormWizardController.prototype.validateStep = function validateStep(step) {
    // Empty errors
    this.errors.splice(0, this.errors.length);

    var valid = true;
    if (this.currentStep.hasOwnProperty('validate')) {
        valid = this.currentStep.validate(this.resource, this.errors);
    }

    if (valid) {
        this.currentStep.state = 'done';
    } else {
        this.currentStep.state = 'has-errors';
    }
};

/**
 * Validate the whole wizard
 * @returns {boolean}
 */
FormWizardController.prototype.validate = function validate() {
    var valid = true;

    for (var i = 0; i < this.steps.length; i++) {
        valid = this.validateStep(this.steps[i]);
        if (!valid) {
            break;
        }
    }

    return valid;
};

// Register controller into Angular JS
angular
    .module('Layout')
    .controller('FormWizardController', FormWizardController);
