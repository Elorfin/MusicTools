/**
 * Form Component controller
 * @constructor
 */
var FormComponentController = function FormComponentControllerConstructor() {

};

/**
 * Form definition object
 * @type {Object}
 */
FormComponentController.prototype.formDef = {};

FormComponentController.prototype.getValidHTMLMethod = function getValidHTMLMethod() {
    if ('GET' == this.formDef.vars.method || 'POST' == this.formDef.vars.method) {
        var method = this.formDef.vars.method;
    } else {
        var method = 'POST';
    }

    return method;
};

FormComponentController.prototype.getNotRenderedChildren = function getNotRenderedChildren() {
    var notRendered = {};
    angular.forEach(this.formDef.children, function filterChildren(value, key) {
        if (!value.rendered) {
            notRendered[key] = value;
        }
    });
    return notRendered;
};

FormComponentController.prototype.submit = function formSubmit() {

};

// Register controller into angular
angular
    .module('Form')
    .controller('FormComponentController', [ FormComponentController ]);
