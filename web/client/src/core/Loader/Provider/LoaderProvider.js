/**
 * Provides Loading visualization on XHR
 * @constructor
 */
var LoaderProvider = function LoaderProvider($document, $animate, $timeout) {
    this.services = {};
    this.services['$document'] = $document;
    this.services['$animate']  = $animate;
    this.services['$timeout']  = $timeout;

    this.$get = function Loader() {
        var provider = this;

        var loadingBarContainer = angular.element(this.template),
            loadingBar = loadingBarContainer.find('div').eq(0);

        var incTimeout,
            completeTimeout;

        /**
         * Increments the loading bar by a random amount
         * but slows down as it progresses
         */
        function _inc() {
            if (_status() >= 1) {
                return;
            }

            var rnd = 0;

            // TODO: do this mathematically instead of through conditions

            var stat = _status();
            if (stat >= 0 && stat < 0.25) {
                // Start out between 3 - 6% increments
                rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
            } else if (stat >= 0.25 && stat < 0.65) {
                // increment between 0 - 3%
                rnd = (Math.random() * 3) / 100;
            } else if (stat >= 0.65 && stat < 0.9) {
                // increment between 0 - 2%
                rnd = (Math.random() * 2) / 100;
            } else if (stat >= 0.9 && stat < 0.99) {
                // finally, increment it .5 %
                rnd = 0.005;
            } else {
                // after 99%, don't increment:
                rnd = 0;
            }

            var pct = _status() + rnd;
            _set(pct);
        }

        return {
            start            : provider.start,
            progress         : progress.updateProgress,
            status           : provider.status,
            complete         : provider.complete,
            latencyThreshold : provider.latencyThreshold,
            parentSelector   : provider.parentSelector,
            startSize        : provider.startSize
        };
    };
};

// Set up dependency injection
LoaderProvider.$inject = [ '$document', '$animate', '$timeout' ];

/**
 * Is the Loader started ?
 * @type {boolean}
 */
LoaderProvider.prototype.started = false;

/**
 * Current status of the Loader
 * @type {number}
 */
LoaderProvider.prototype.status = 0;

LoaderProvider.prototype.latencyThreshold = 100;

LoaderProvider.prototype.startSize = 0.02;

LoaderProvider.prototype.parentSelector = 'body';

LoaderProvider.prototype.template = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

/**
 * Start loading progress
 */
LoaderProvider.prototype.start = function start() {
    var $parent = this.services.$document.find(this.parentSelector).eq(0);

    this.services.$timeout.cancel(completeTimeout);

    // do not continually broadcast the started event
    if (this.started) {
        return;
    }

    // Mark load as started
    this.started = true;

    var loadingBarContainer = angular.element(this.template);

    $animate.enter(loadingBarContainer, $parent, angular.element($parent[0].lastChild));

    this.updateProgress(this.startSize);
};

/**
 * Set the loading bar's width to a certain percent.
 * @param {Number} value any value between 0 and 1
 */
LoaderProvider.prototype.updateProgress = function updateProgress(value) {
    if (!this.started) {
        return;
    }

    // Update progressbar based on the value

    var pct = (value * 100) + '%';
    loadingBar.css('width', pct);
    this.status = value;

    this.services.$timeout.cancel(incTimeout);
    incTimeout = $timeout(function() {
        _inc();
    }.bind(this), 250);
};

LoaderProvider.prototype.complete = function complete() {
    this.updateProgress(1);

    function _completeAnimation() {
        status = 0;
        started = false;
    }

    $timeout.cancel(completeTimeout);

    // Attempt to aggregate any start/complete calls within 500ms
    completeTimeout = $timeout(function() {
        _completeAnimation();
    }, 500);
};

// Register provider into Angular JS
angular
    .module('Loader')
    .provider('$loader', LoaderProvider);