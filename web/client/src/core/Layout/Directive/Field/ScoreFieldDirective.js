/**
 * Score Field
 */
angular
    .module('Layout')
    .directive('scoreField', [
        '$partial',
        function ScoreFieldDirective($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Layout', 'Field/score-field.html', true),
                replace: true,
                scope: {
                    /**
                     * Model variable
                     */
                    model: '=',

                    /**
                     * Name to use for form element
                     */
                    name: '@',

                    /**
                     * Icon of the field
                     */
                    icon: '@',

                    /**
                     * Enable editable features
                     */
                    editable: '@',

                    /**
                     * Min value of the field
                     */
                    min: '@',

                    /**
                     * Max value of the field
                     */
                    max: '@',

                    /**
                     * Step between values
                     */
                    step: '@'
                },
                controllerAs: 'scoreFieldCtrl',
                bindToController: true,
                controller: function ScoreFieldController () {
                    /**
                     * Default options
                     * @type {Object}
                     */
                    var _defaults = {
                        editable: false,
                        step    : 1,
                        min     : 0,
                        max     : 10,
                        icon    : 'fa fa-star'
                    };

                    // Set default vars
                    for (var prop in _defaults) {
                        if (_defaults.hasOwnProperty(prop) && undefined == this[prop]) {
                            this[prop] = _defaults[prop];
                        }
                    }

                    // Initialize value if empty
                    if (null == this.model) {
                        this.model = this.min;
                    }

                    // Create array of values for ng-repeat
                    this.values = [];
                    for (var i = this.min + 1; i <= this.max; i += this.step) {
                        this.values.push(i);
                    }
                }
            };
        }
    ]);