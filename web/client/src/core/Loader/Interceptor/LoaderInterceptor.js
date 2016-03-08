/**
 * Loader Interceptor
 * Catch all XHR to display and update the Loader
 * @constructor
 */
var LoaderInterceptor = function LoaderInterceptor($q, $cacheFactory, $timeout, $log) {
    /**
     * The amount of time spent fetching before showing the loading bar
     */
    var latencyThreshold = cfpLoadingBar.latencyThreshold;

    /**
     * $timeout handle for latencyThreshold
     */
    var startTimeout;


    /**
     * calls cfpLoadingBar.complete() which removes the
     * loading bar from the DOM.
     */
    function setComplete() {
        $timeout.cancel(startTimeout);
        cfpLoadingBar.complete();
        this.completed = 0;
        this.total = 0;
    }

    /**
     * Determine if the response has already been cached
     * @param  {Object}  config the config option from the request
     * @return {Boolean} retrns true if cached, otherwise false
     */
    function isCached(config) {
        var cache;
        var defaultCache = $cacheFactory.get('$http');
        var defaults = $httpProvider.defaults;

        // Choose the proper cache source. Borrowed from angular: $http service
        if ((config.cache || defaults.cache) && config.cache !== false &&
            (config.method === 'GET' || config.method === 'JSONP')) {
            cache = angular.isObject(config.cache) ? config.cache
                : angular.isObject(defaults.cache) ? defaults.cache
                : defaultCache;
        }

        var cached = cache !== undefined ?
        cache.get(config.url) !== undefined : false;

        if (config.cached !== undefined && cached !== config.cached) {
            return config.cached;
        }
        config.cached = cached;
        return cached;
    }


    return {
        request: function onRequest(config) {
            // Check to make sure this request hasn't already been cached and that
            // the requester didn't explicitly ask us to ignore this request:
            if (!config.ignoreLoadingBar && !isCached(config)) {
                if (reqsTotal === 0) {
                    startTimeout = $timeout(function() {
                        cfpLoadingBar.start();
                    }, latencyThreshold);
                }
                reqsTotal++;
                cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
            return config;
        },

        response: function onResponse(response) {
            if (!response || !response.config) {
                $log.error('Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
                return response;
            }

            if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
                reqsCompleted++;
                if (reqsCompleted >= reqsTotal) {
                    setComplete();
                } else {
                    cfpLoadingBar.set(reqsCompleted / reqsTotal);
                }
            }
            return response;
        },

        responseError: function onResponseError(rejection) {
            if (!rejection || !rejection.config) {
                $log.error('Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
                return $q.reject(rejection);
            }

            if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
                reqsCompleted++;
                if (reqsCompleted >= reqsTotal) {
                    setComplete();
                } else {
                    cfpLoadingBar.set(reqsCompleted / reqsTotal);
                }
            }
            return $q.reject(rejection);
        }
    };
};

// Set up dependency injection
LoaderInterceptor.$inject = [ '$q', '$cacheFactory', '$timeout', '$log' ];

/**
 * The total number of requests made
 * @var {Number}
 */
LoaderInterceptor.prototype.total = 0;

/**
 * The number of requests completed (either successfully or not)
 * @var {Number}
 */
LoaderInterceptor.prototype.completed = 0;

// Inject Service into AngularJS
angular
    .module('Loader')
    .service('LoaderInterceptor', LoaderInterceptor);