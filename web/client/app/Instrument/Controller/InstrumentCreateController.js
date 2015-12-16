/**
 * Form controller for Instrument
 * @constructor
 */
var InstrumentCreateController = function InstrumentCreateControllerConstructor(data, InstrumentResource, instrumentTypes, InstrumentTemplateResource) {
    FormWizardController.apply(this, arguments);

    this.instrumentTypes  = instrumentTypes;
    this.templateResource = InstrumentTemplateResource;
};

// Extends FormController
InstrumentCreateController.prototype             = Object.create(FormWizardController.prototype);
InstrumentCreateController.prototype.constructor = InstrumentCreateController;

// Set up dependency injection
InstrumentCreateController.$inject = [ 'data', 'InstrumentResource', 'instrumentTypes', 'InstrumentTemplateResource' ];

/**
 * Step 1 - Choose Type
 * @type {Object}
 */
InstrumentCreateController.prototype.steps.chooseType = {
    order       : 1,
    title       : 'create_choose_type',
    templateUrl : '../app/Instrument/Partial/CreateWizard/choose_type.html'
};

/**
 * Step 2 - Choose Template
 * @type {Object}
 */
InstrumentCreateController.prototype.steps.chooseTemplate = {
    order       : 2,
    title       : 'create_choose_template',
    templateUrl : '../app/Instrument/Partial/CreateWizard/choose_template.html',
    onLoad: function onLoad() {

    },
    onUnload: function onUnload() {

    }
};

/**
 * Step 3 - Customize info
 * @type {Object}
 */
InstrumentCreateController.prototype.steps.customizeInfo = {
    order       : 3,
    title       : 'create_fill_info',
    templateUrl : '../app/Instrument/Partial/CreateWizard/fill_info.html'
};

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
InstrumentCreateController.prototype.selectType = function (type) {
    this.data.type = type;

    // Load templates for this type
    this.loadTemplates(type);
};

InstrumentCreateController.prototype.loadTemplates = function (type) {
    this.templates = this.templateResource.get({ type: type.id }).then(function (result) {
        this.templates = result;
    }.bind(this));
};

/**
 * Select a template for the Instrument
 * @param {Object} template
 */
InstrumentCreateController.prototype.selectTemplate = function (template) {
    this.selectedTemplate = template;
};

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentCreateController', InstrumentCreateController);
