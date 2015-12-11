/**
 * Base Form controller
 * @constructor
 */
var BaseFormController = function BaseFormControllerConstructor(data, ApiResource) {
    this.data        = data;
    this.apiResource = ApiResource;
};

// Set up dependency injection
BaseFormController.$inject = [ 'data', 'ApiResource' ];

/**
 * Errors
 * @type {Array}
 */
BaseFormController.prototype.errors = [];

/**
 * Current data
 * @type {Object}
 */
BaseFormController.prototype.data = null;

/**
 * Is form include file Upload ? (Internally used to know which AJAX service we need to use $http or Upload)
 * @type {boolean}
 */
BaseFormController.prototype.multipart = false;

/**
 * Is the edited entity a new one ?
 * @returns {boolean}
 */
BaseFormController.prototype.isNew = function isNew() {
    var isNew = true;
    if (null !== this.data && 'undefined' !== typeof (this.data.id) && null !== this.data.id && 0 !== this.data.id.length) {
        isNew = false;
    }

    return isNew;
};

/**
 * Validate the form
 */
BaseFormController.prototype.validate = function validate() {
    return true
};

/**
 * Submit the form
 */
BaseFormController.prototype.submit = function submit() {
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
    .controller('BaseFormController', BaseFormController);
