/**
 * Partial Provider
 * @returns {PartialProvider}
 * @constructor
 */
var PartialProvider = function PartialProvider() {
    var options = this.default;

    this.$get = function () {
        return new Partial(options);
    };
};

PartialProvider.prototype.default = {
    baseCorePath : '../src/core/',
    baseAppPath  : '../src/core/',
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

    var path = (isCore) ? this.default.baseCorePath : this.default.baseAppPath;
    path += module + '/' + this.default.partialDir;

    return path + relativePath;
};

var Partial = function Partial(options) {
    this.getPath = function getPath(relativePath, module, isCore) {
        var path = (isCore) ? options.baseCorePath : options.baseAppPath;
        path += module + '/' + options.partialDir;

        var fullPath = path + relativePath;

        return fullPath;
    };
};

// Inject Service into AngularJS
angular
    .module('Utilities')
    .provider('$partial', PartialProvider);
