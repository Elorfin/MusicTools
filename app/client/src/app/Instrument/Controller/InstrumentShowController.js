/**
 * Form controller for Instruments
 * @constructor
 */
var InstrumentShowController = function InstrumentShowController(resource, InstrumentResource) {
    ShowController.apply(this, arguments);

    /*this.instrumentTypes       = instrumentTypes;
    this.specificationResource = InstrumentSpecificationResource;*/

    // Initialize empty relationships
    /*if (!this.apiResource.hasRelationship(this.resource, 'instrumentType')) {
        this.setType(this.instrumentTypes[0]);
    } else {
        this.loadTemplates(this.resource.relationships.instrumentType.data);
    }*/

    /*if (!this.apiResource.hasRelationship(this.resource, 'specification')) {
        this.apiResource.addRelationship(this.resource, 'specification', this.specificationResource.init());
    }*/
};

// Extends FormController
InstrumentShowController.prototype             = Object.create(ShowController.prototype);
InstrumentShowController.prototype.constructor = InstrumentShowController;

// Set up dependency injection
InstrumentShowController.$inject = [
    'resource',
    'InstrumentResource'
];

/**
 * Select the type of the Instrument
 * @param {Object} type
 */
/*InstrumentShowController.prototype.setType = function setType(type) {
    this.apiResource.addRelationship(this.resource, 'instrumentType', type);

    // Load templates for this type
    this.loadTemplates(type);
};*/

/**
 * Load the list of available Templates for the selected Type
 * @param {Object} type
 */
/*InstrumentShowController.prototype.loadTemplates = function loadTemplates(type) {
    this.templates = this.templateResource
        .get({ type: type.id })
        .then(function onSuccess(result) {
            this.templates = result;
        }.bind(this));
};*/

/**
 * Select a template for the Instrument
 * @param {Object} template
 */
/*InstrumentShowController.prototype.selectTemplate = function selectTemplate(template) {
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
};*/

// Register controller into Angular JS
angular
    .module('Instrument')
    .controller('InstrumentShowController', InstrumentShowController);
