/**
 * Form Widget Directive
 */
angular
    .module('Form')
    .directive('formWidget', [
        function FormWidgetDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Form/Partial/form-widget.html',
                replace: true,
                transclude: true,
                scope: {
                    formDef: '='
                }
                /*controller: 'FormWidgetController',
                controllerAs: 'formWidgetCtrl',
                bindToController: true,*/
            };
        }
    ]);