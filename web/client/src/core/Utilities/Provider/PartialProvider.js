/**
 * Partial Provider
 * @returns {PartialProvider}
 * @constructor
 */
var PartialProvider = function PartialProvider() {
    var options = this.default;

    this.$get = function () {
        return {
            options: options,
            getPath: function getPath(relativePath, module, isCore) {
                var path = (typeof isCore !== 'undefined' && isCore) ? this.options.baseCorePath : this.options.baseAppPath;
                path += module + '/' + this.options.partialDir;

                return path + relativePath;
            }
        };
    };
};

/**
 * Configuration of the provider
 * @type {Object}
 */
PartialProvider.prototype.default = {
    baseCorePath : '../src/core/',
    baseAppPath  : '../src/app/',
    partialDir   : 'Partial/'
};

/**
 * Get partials base path
 * @param {string}  relativePath
 * @param {string}  module
 * @param {boolean} [isCore]
 */
PartialProvider.prototype.getPath = function getPath(relativePath, module, isCore) {
    if (!module) {
        console.error('You must provide the module name to get the Partials path.');
    }

    var path = (isCore !== 'undefined' && isCore) ? this.default.baseCorePath : this.default.baseAppPath;
    path += module + '/' + this.default.partialDir;

    return path + relativePath;
};

// Inject Service into AngularJS
angular
    .module('Utilities')
    .provider('$partial', PartialProvider);
