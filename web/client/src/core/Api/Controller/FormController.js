/**
 * Base Form controller
 * @constructor
 */
var FormController = function FormController(resource, ApiResource) {
    this.resource    = resource;
    this.apiResource = ApiResource;
};

// Set up dependency injection
FormController.$inject = [ 'resource', 'ApiResource' ];

/**
 * Errors
 * @type {Array}
 */
FormController.prototype.errors = [];

/**
 * Current Resource
 * @type {Object}
 */
FormController.prototype.resource = null;

/**
 * Is the edited entity a new one ?
 * @returns {boolean}
 */
FormController.prototype.isNew = function isNew() {
    var isNew = true;
    if (null !== this.resource && 'undefined' !== typeof (this.resource.id) && null !== this.resource.id && 0 !== this.resource.id.length) {
        isNew = false;
    }

    return isNew;
};

/**
 * Validate the form
 */
FormController.prototype.validate = function validate() {
    return true
};

/**
 * Submit the form
 */
FormController.prototype.submit = function submit() {
    if (this.validate()) {
        if (this.isNew()) {
            this.apiResource.new(this.resource);
        } else {
            this.apiResource.update(this.resource);
        }
    }
};

// Register controller into Angular JS
angular
    .module('Api')
    .controller('FormController', FormController);
