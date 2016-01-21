/**
 * Form controller for Instrument
 * @constructor
 */
var InstrumentCreateController = function InstrumentCreateControllerConstructor(resource, InstrumentResource, instrumentTypes, InstrumentTemplateResource) {
    FormWizardController.apply(this, arguments);

    this.instrumentTypes  = instrumentTypes;
    this.templateResource = InstrumentTemplateResource;
};

// Extends FormController
InstrumentCreateController.prototype             = Object.create(FormWizardController.prototype);
InstrumentCreateController.prototype.constructor = InstrumentCreateController;

// Set up dependency injection
InstrumentCreateController.$inject = [ 'resource', 'InstrumentResource', 'instrumentTypes', 'InstrumentTemplateResource' ];

/**
 * Create steps
 * @type {Array}
 */
InstrumentCreateController.prototype.steps = [
    // Step 1
    {
        number: 1,
        name: 'create_choose_type',
        templateUrl: '../app/Instrument/Partial/CreateWizard/choose_type.html',
        validate: function validate(data, errors) {
            if (data.type) {
                return true;
            } else {
                errors.push('You must choose an instrument type');

                return false;
            }
        }
    },

    // Step 2
    {
        number: 2,
        name: 'create_choose_template',
        templateUrl: '../app/Instrument/Partial/CreateWizard/choose_template.html'
    },

    // Step 3
    {
        number: 3,
        name: 'create_fill_info',
        templateUrl: '../app/Instrument/Partial/CreateWizard/fill_info.html'
    }
];

/**
 * Instrument templates
 * @type {Array}
 */
InstrumentCreateController.prototype.templates = [];

/**
 * Selected template
 * @type {Object}
 */
InstrumentCreateController.prototype.selectedTemplate = null;

/**
 * Select the type of the Instrument
 * @param {Object} type
 */
InstrumentCreateController.prototype.selectType = function selectType(type) {
    this.apiResource.addRelationship(this.resource, 'type', type);

    // Load templates for this type
    this.loadTemplates(type);
};

/**
 * Load the list of available Templates for the selected Type
 * @param {Object} type
 */
InstrumentCreateController.prototype.loadTemplates = function loadTemplates(type) {
    this.templates = this.templateResource.get({ type: type.id }).then(function (result) {
        this.templates = result;

        // Jump to next step when templates are loaded
        this.nextStep();
    }.bind(this));
};

/**
 * Select a template for the Instrument
 * @param {Object} template
 */
InstrumentCreateController.prototype.selectTemplate = function selectTemplate(template) {
    this.selectedTemplate = template;

    // Fill instrument information with template
    for (var attr in template.attributes) {
        if (template.attributes.hasOwnProperty(attr)) {
            this.resource.attributes[attr] = template.attributes[attr];
        }
    }

    // Jump to next step
    this.nextStep();
};

// Register controller into Angular JS
angular
    .module('Instrument')
    .controller('InstrumentCreateController', InstrumentCreateController);
