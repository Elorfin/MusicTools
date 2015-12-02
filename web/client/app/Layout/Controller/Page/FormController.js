/**
 * Base Form controller
 * @constructor
 */
var BaseFormController = function BaseFormControllerConstructor(form) {
    this.form   = form.form;
    this.entity = form.entity;
};

// Set up dependency injection
BaseFormController.$inject = [ 'form' ];

/**
 * Current form
 * @type {Object}
 */
BaseFormController.prototype.form = null;

/**
 * Current Entity
 * @type {Object}
 */
BaseFormController.prototype.entity = null;

/**
 * Is form include file Upload ? (Internally used to know which AJAX service we need to use $http or Upload)
 * @type {boolean}
 */
BaseFormController.prototype.multipart = false;

/**
 * Is the edited entity a new one ?
 * @returns {boolean}
 */
BaseFormController.prototype.isNew = function () {
    var isNew = true;
    if (null !== this.entity && 'undefined' !== typeof (this.entity.id) && null !== this.entity.id && 0 !== this.entity.id.length) {
        isNew = false;
    }

    return isNew;
};

/**
 * Validate the form
 */
BaseFormController.prototype.validate = function () {
    this.entity.$create();
};

// Register controller into Angular JS
angular
    .module('Layout')
    .controller('BaseFormController', BaseFormController);
