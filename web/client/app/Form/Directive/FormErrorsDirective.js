/**
 * Form Errors Directive
 */
angular
    .module('Form')
    .directive('formErrors', [
        function FormErrorsDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Form/Partial/form-errors.html',
                replace: true,
                scope: {
                    formDef: '='
                },
                controller: function FormErrorsController() {

                },
                controllerAs: 'formErrorsCtrl',
                bindToController: true
            };
        }
    ]);