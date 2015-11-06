/**
 * Base Form controller
 * @constructor
 */
var BaseFormController = function BaseFormControllerContructor(entity) {
    this.entity = entity;
};

/**
 * Current Entity
 * @type {Object}
 */
BaseFormController.prototype.entity = null;

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

// Register controller into angular
angular
    .module('Layout')
    .controller('BaseFormController', [ 'entity', BaseFormController ]);
