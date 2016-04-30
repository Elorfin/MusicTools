/**
 * Asset Path filter
 */
var AssetPathFilter = function AssetPathFilter($client) {
    return function asset_path(path) {
        return $client.getAsset(path);
    };
};

// Set up dependency injection
AssetPathFilter.$inject = [ '$client' ];

// Register filter into Angular JS
angular
    .module('Client')
    .filter('asset_path', AssetPathFilter);