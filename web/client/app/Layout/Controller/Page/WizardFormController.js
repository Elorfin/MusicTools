/**
 * Wizard Form controller
 * @constructor
 */
var BaseWizardFormController = function BaseWizardFormControllerConstructor(data, ApiResource) {
    BaseFormController.apply(this, arguments);

    this.setCurrentStep(this.steps[0]);
};

// Extends BaseFormController
BaseWizardFormController.prototype             = Object.create(BaseFormController.prototype);
BaseWizardFormController.prototype.constructor = BaseWizardFormController;

// Set up dependency injection
BaseWizardFormController.$inject = [ 'data', 'ApiResource' ];

/**
 * Wizard steps
 * @type {Array}
 */
BaseWizardFormController.prototype.steps = [];

/**
 * Current step
 * @type {Object}
 */
BaseWizardFormController.prototype.currentStep = null;

BaseWizardFormController.prototype.hasPrevious = true;

BaseWizardFormController.prototype.hasNext = true;

/**
 * Set current step wizard
 * @param step
 */
BaseWizardFormController.prototype.setCurrentStep = function setCurrentStep(step) {
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
BaseWizardFormController.prototype.previousStep = function previousStep() {
    var pos = this.steps.indexOf(this.currentStep);
    if (-1 !== pos && this.steps[pos - 1]) {
        this.setCurrentStep(this.steps[pos - 1]);
    }
};

/**
 * Go to next step
 */
BaseWizardFormController.prototype.nextStep = function nextStep() {
    var pos = this.steps.indexOf(this.currentStep);
    if (-1 !== pos && this.steps[pos + 1]) {
        this.setCurrentStep(this.steps[pos + 1]);
    }
};

/**
 * Validate step
 * @param step
 */
BaseWizardFormController.prototype.validateStep = function validateStep(step) {
    // Empty errors
    this.errors.splice(0, this.errors.length);

    var valid = true;
    if (this.currentStep.hasOwnProperty('validate')) {
        valid = this.currentStep.validate(this.data, this.errors);
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
BaseWizardFormController.prototype.validate = function validate() {
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
    .controller('BaseWizardFormController', BaseWizardFormController);
