var ClientProvider = function ClientProvider() {
    this.$get = function () {
        var provider = this;

        return {
            /**
             * Allow access to the Client configuration at runtime
             */
            config: {

            },

            /**
             * Get Asset URL
             * @param {String} path
             */
            getAsset: function getAsset(path) {
                provider.getAsset(path);
            },

            /**
             * Get Partial path
             * @param {String} path
             */
            getPartial: function getPartial(path) {
                provider.getPartial(path);
            }
        };
    };
};

// Set up dependency injection
ClientProvider.$inject = [];

ClientProvider.prototype.configure = function configure(configuration) {

};

/**
 * Get Asset path
 * @param {String} path
 */
ClientProvider.prototype.getAsset = function getAsset(path) {

};

/**
 * Get Partial path
 * @param {String} path
 */
ClientProvider.prototype.getPartial = function getPartial(path) {

};

// Register provider into Angular JS
angular
    .module('Client')
    .provider('$client', ClientProvider);