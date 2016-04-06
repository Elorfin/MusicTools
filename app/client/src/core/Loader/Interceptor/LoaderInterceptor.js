/**
 * Loader Interceptor
 * Catch all XHR to display and update the Loader
 * @constructor
 */
var LoaderInterceptor = function LoaderInterceptor($q, $timeout, $loader) {
    this.services = {};

    this.services['$q']       = $q;
    this.services['$timeout'] = $timeout;
    this.services['$loader']  = $loader;
};

// Set up dependency injection
LoaderInterceptor.$inject = [ '$q', '$timeout', '$loader' ];

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

/**
 * HTTP event : onRequest
 * @param   {Object} config
 * @returns {Object}
 */
LoaderInterceptor.prototype.request = function onRequest(config) {
    this.startRequest();

    return config;
};

/**
 * HTTP event : onResponse
 * @param   {Object} response
 * @returns {Object}
 */
LoaderInterceptor.prototype.response = function onResponse(response) {
    this.completeRequest();

    return response;
};

/**
 * HTTP event : onResponseError
 * @param   {Object} rejection
 * @returns {Object}
 */
LoaderInterceptor.prototype.responseError = function onResponseError(rejection) {
    this.completeRequest();

    return this.services.$q.reject(rejection);
};

/**
 * Start a new Request
 */
LoaderInterceptor.prototype.startRequest = function startRequest() {
    if (this.total === 0) {
        this.services.$timeout(this.startLoader.bind(this), this.services.$loader.latencyThreshold);
    }

    // Increment current running Requests count
    this.total++;

    this.services.$loader.updateProgress(this.completed / this.total);
};

/**
 * Start the Loader visualization
 */
LoaderInterceptor.prototype.startLoader = function startLoader() {
    this.services.$loader.start();
};

/**
 * Complete the Request
 */
LoaderInterceptor.prototype.completeRequest = function completeRequest() {
    // Increment completed Requests count
    this.completed++;

    if (this.completed >= this.total) {
        // All running Requests have finished
        this.services.$timeout.cancel(this.startLoader.bind(this));

        // End Loader progress
        this.services.$loader.complete();

        // Reset counters
        this.completed = 0;
        this.total = 0;
    } else {
        this.services.$loader.updateProgress(this.completed / this.total);
    }
};

// Inject Service into AngularJS
angular
    .module('Loader')
    .service('LoaderInterceptor', LoaderInterceptor);