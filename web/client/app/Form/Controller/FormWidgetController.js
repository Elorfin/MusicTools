/**
 * Form Widget controller
 * @constructor
 */
var FormWidgetController = function FormWidgetControllerConstructor() {
    /*console.log(this.formDef);*/
};

/**
 * Form definition object
 * @type {Object}
 */
FormWidgetController.prototype.formDef = null;

FormWidgetController.prototype.getValidHTMLMethod = function getValidHTMLMethod() {
    if ('GET' == this.formDef.vars.method || 'POST' == this.formDef.vars.method) {
        var method = this.formDef.vars.method;
    } else {
        var method = 'POST';
    }

    return method;
};

// Register controller into angular
angular
    .module('Form')
    .controller('FormWidgetController', [ FormWidgetController ]);
