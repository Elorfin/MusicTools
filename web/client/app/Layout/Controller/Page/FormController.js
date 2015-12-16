/**
 * Base Form controller
 * @constructor
 */
var FormController = function FormControllerConstructor(data, ApiResource) {
    this.data        = data;
    this.apiResource = ApiResource;
};

// Set up dependency injection
FormController.$inject = [ 'data', 'ApiResource' ];

/**
 * Errors
 * @type {Array}
 */
FormController.prototype.errors = [];

/**
 * Current data
 * @type {Object}
 */
FormController.prototype.data = null;

/**
 * Is the edited entity a new one ?
 * @returns {boolean}
 */
FormController.prototype.isNew = function isNew() {
    var isNew = true;
    if (null !== this.data && 'undefined' !== typeof (this.data.id) && null !== this.data.id && 0 !== this.data.id.length) {
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
            this.apiResource.new(this.data);
        } else {
            this.apiResource.update(this.data);
        }
    }
};

// Register controller into Angular JS
angular
    .module('Layout')
    .controller('FormController', FormController);
