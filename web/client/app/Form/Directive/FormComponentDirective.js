/**
 * Form Component Directive
 */
angular
    .module('Form')
    .directive('formComponent', [
        function FormComponentDirective() {
            return {
                restrict: 'E',
                templateUrl: '../app/Form/Partial/form.html',
                replace: true,
                transclude: true,
                scope: {
                    formDef: '='
                },
                controller: 'FormComponentController',
                controllerAs: 'formComponentCtrl',
                bindToController: true
            };
        }
    ]);