/**
 * Form Row Directive
 */
angular
    .module('Form')
    .directive('formRow', [
        function FormRowDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Form/Partial/form-row.html',
                replace: true,
                scope: {
                    formDef: '='
                },
                controller: function FormRowController() {

                },
                controllerAs: 'formRowCtrl',
                bindToController: true
            };
        }
    ]);