/**
 * Form Label Directive
 */
angular
    .module('Form')
    .directive('formLabel', [
        function FormLabelDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Form/Partial/form-label.html',
                replace: true,
                scope: {
                    formDef: '='
                }
            };
        }
    ]);