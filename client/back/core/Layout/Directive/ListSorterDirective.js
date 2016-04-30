/**
 * Widget to sort lists
 */
var LayoutListSorterDirective = function LayoutListSorterDirectiveConstructor($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('list-sorter.html', 'core/Layout'),
        replace: true,
        scope: {
            /**
             * Number of elements in the list
             */
            count: '=',

            /**
             * Element name for translation
             */
            element: '@',

            /**
             * Current field to sort by
             */
            current: '=',

            /**
             * Reverse direction of the sort (if true, ascendant, else descendant)
             */
            reverse: '=',

            /**
             * Usable fields for sort
             */
            fields: '='
        },
        controllerAs: 'listSorterCtrl',
        bindToController: true,
        controller: function LayoutListSorterController () {
            /**
             * Get the type of the current sort field
             * @returns {string}
             */
            this.getSortType = function getSortType() {
                var type = null;

                switch (this.fields[this.current]) {
                    case 'string':
                        type = 'string';
                        break;

                    case 'number':
                        type = 'number';
                        break;
                }

                return type;
            };

            /**
             * Set current sort field
             * @param {string} current
             */
            this.setCurrent = function setCurrent(current) {
                this.current = current;
            };

            /**
             * Toggle direction of the sort
             */
            this.toggleReverse = function toggleReverse() {
                this.reverse = !this.reverse;
            };
        }
    };
};

// Set up dependency injection
LayoutListSorterDirective.$inject = [ '$client' ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutListSorter', LayoutListSorterDirective);
