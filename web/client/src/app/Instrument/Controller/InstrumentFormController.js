/**
 * Form controller for Instruments
 * @constructor
 */
var InstrumentFormController = function InstrumentFormController(resource, InstrumentResource, instrumentTypes, InstrumentTemplateResource) {
    FormController.apply(this, arguments);

    this.instrumentTypes  = instrumentTypes;
    this.templateResource = InstrumentTemplateResource;

    // Initialize empty relationships
    if (!this.apiResource.hasRelationship(this.resource, 'instrumentType')) {
        this.setType(this.instrumentTypes[0]);
    }

    if (!this.apiResource.hasRelationship(this.resource, 'specification')) {
        this.apiResource.addRelationship(this.resource, 'specification', {});
    }
};

// Extends FormController
InstrumentFormController.prototype             = Object.create(FormController.prototype);
InstrumentFormController.prototype.constructor = InstrumentFormController;

// Set up dependency injection
InstrumentFormController.$inject = [ 'resource', 'InstrumentResource', 'instrumentTypes', 'InstrumentTemplateResource' ];

/**
 * List of Templates for the current InstrumentType
 * @type {Array}
 */
InstrumentFormController.prototype.templates = [];

/**
 * Selected Template
 * @type {Object}
 */
InstrumentFormController.prototype.selectedTemplate = null;

/**
 * Select the type of the Instrument
 * @param {Object} type
 */
InstrumentFormController.prototype.setType = function setType(type) {
    this.apiResource.addRelationship(this.resource, 'instrumentType', type);

    // Load templates for this type
    this.loadTemplates(type);
};

/**
 * Load the list of available Templates for the selected Type
 * @param {Object} type
 */
InstrumentFormController.prototype.loadTemplates = function loadTemplates(type) {
    this.templates = this.templateResource
        .get({ type: type.id })
        .then(function onSuccess(result) {
            this.templates = result;
        }.bind(this));
};

/**
 * Select a template for the Instrument
 * @param {Object} template
 */
InstrumentFormController.prototype.selectTemplate = function selectTemplate(template) {
    this.selectedTemplate = template;

    // Use the Template name as default name
    if (!this.resource.attributes.name) {
        this.resource.attributes.name = template.attributes.name;
    }

    if (!this.apiResource.hasRelationship(this.resource, 'specification')) {
        // Initialize object
        this.apiResource.addRelationship(this.resource, 'specification', {});
    }

    var specification = this.apiResource.getRelationship(this.resource, 'specification');

    // Fill instrument specification with template
    for (var attr in template.attributes) {
        if ('name' !== attr && template.attributes.hasOwnProperty(attr)) {
            specification.attributes[attr] = template.attributes[attr];
        }
    }
};

// Register controller into Angular JS
angular
    .module('Instrument')
    .controller('InstrumentFormController', InstrumentFormController);
