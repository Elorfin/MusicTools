/**
 * Provides Loading visualization on XHR
 * @constructor
 */
var LoaderProvider = function LoaderProvider($animate) {
    this.$get = function Loader() {
        var provider = this;

        var $parentSelector = this.parentSelector,
            loadingBarContainer = angular.element(this.template),
            loadingBar = loadingBarContainer.find('div').eq(0);

        var incTimeout,
            completeTimeout,
            started = false,
            status = 0;

        var autoIncrement = this.autoIncrement;
        var startSize = this.startSize;

        /**
         * Inserts the loading bar element into the dom, and sets it to 2%
         */
        function _start() {
            var $parent = $document.find($parentSelector).eq(0);
            $timeout.cancel(completeTimeout);

            // do not continually broadcast the started event
            if (started) {
                return;
            }

            started = true;

            $animate.enter(loadingBarContainer, $parent, angular.element($parent[0].lastChild));

            _set(startSize);
        }

        /**
         * Set the loading bar's width to a certain percent.
         *
         * @param n any value between 0 and 1
         */
        function _set(n) {
            if (!started) {
                return;
            }
            var pct = (n * 100) + '%';
            loadingBar.css('width', pct);
            status = n;

            // increment loadingbar to give the illusion that there is always
            // progress but make sure to cancel the previous timeouts so we don't
            // have multiple incs running at the same time.
            if (autoIncrement) {
                $timeout.cancel(incTimeout);
                incTimeout = $timeout(function() {
                    _inc();
                }, 250);
            }
        }

        /**
         * Increments the loading bar by a random amount
         * but slows down as it progresses
         */
        function _inc() {
            if (_status() >= 1) {
                return;
            }

            var rnd = 0;

            // TODO: do this mathmatically instead of through conditions

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

        function _status() {
            return status;
        }

        function _completeAnimation() {
            status = 0;
            started = false;
        }

        function _complete() {
            _set(1);

            $timeout.cancel(completeTimeout);

            // Attempt to aggregate any start/complete calls within 500ms:
            completeTimeout = $timeout(function() {
                var promise = $animate.leave(loadingBarContainer, _completeAnimation);
                if (promise && promise.then) {
                    promise.then(_completeAnimation);
                }
            }, 500);
        }

        return {
            start            : _start,
            set              : _set,
            status           : _status,
            inc              : _inc,
            complete         : _complete,
            autoIncrement    : this.autoIncrement,
            latencyThreshold : this.latencyThreshold,
            parentSelector   : this.parentSelector,
            startSize        : this.startSize
        };
    };
};

// Set up dependency injection
LoaderProvider.$inject = [ '$animate' ];

LoaderProvider.prototype.autoIncrement = true;
LoaderProvider.prototype.latencyThreshold = 100;
LoaderProvider.prototype.startSize = 0.02;
LoaderProvider.prototype.parentSelector = 'body';
LoaderProvider.prototype.template = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

/**
 * Start loading progress
 */
LoaderProvider.prototype.start = function start() {
    var $parent = $document.find($parentSelector).eq(0);
    $timeout.cancel(completeTimeout);

    // do not continually broadcast the started event
    if (started) {
        return;
    }

    started = true;

    $animate.enter(loadingBarContainer, $parent, angular.element($parent[0].lastChild));

    _set(startSize);
};

LoaderProvider.prototype.updateProgress = function updateProgress() {

};

// Register provider into Angular JS
angular
    .module('Loader')
    .provider('$loader', LoaderProvider);