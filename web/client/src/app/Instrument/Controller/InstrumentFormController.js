/**
 * Form controller for Instruments
 * @constructor
 */
var InstrumentFormController = function InstrumentFormController(resource, InstrumentResource, instrumentTypes, InstrumentTemplateResource) {
    FormController.apply(this, arguments);

    this.instrumentTypes  = instrumentTypes;
    this.templateResource = InstrumentTemplateResource;
};

// Extends FormController
InstrumentFormController.prototype             = Object.create(FormController.prototype);
InstrumentFormController.prototype.constructor = InstrumentFormController;

// Set up dependency injection
InstrumentFormController.$inject = [ 'resource', 'InstrumentResource' ];

/**
 * Select the type of the Instrument
 * @param {Object} type
 */
InstrumentFormController.prototype.selectType = function selectType(type) {
    this.apiResource.addRelationship(this.resource, 'type', type);

    // Load templates for this type
    this.loadTemplates(type);
};

/**
 * Load the list of available Templates for the selected Type
 * @param {Object} type
 */
InstrumentFormController.prototype.loadTemplates = function loadTemplates(type) {
    this.templates = this.templateResource.get({ type: type.id }).then(function (result) {
        this.templates = result;
    }.bind(this));
};

/**
 * Select a template for the Instrument
 * @param {Object} template
 */
InstrumentFormController.prototype.selectTemplate = function selectTemplate(template) {
    this.selectedTemplate = template;

    // Fill instrument information with template
    for (var attr in template.attributes) {
        if (template.attributes.hasOwnProperty(attr)) {
            this.resource.attributes[attr] = template.attributes[attr];
        }
    }
};

// Register controller into Angular JS
angular
    .module('Instrument')
    .controller('InstrumentFormController', InstrumentFormController);
