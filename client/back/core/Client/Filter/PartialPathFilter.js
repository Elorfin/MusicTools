/**
 * Partial Path filter
 */
var PartialPathFilter = function PartialPathFilter($client) {
    return function partial_path(path, module) {
        return $client.getPartial(path, module);
    };
};

// Set up dependency injection
PartialPathFilter.$inject = [ '$client' ];

// Register filter into Angular JS
angular
    .module('Client')
    .filter('partial_path', PartialPathFilter);