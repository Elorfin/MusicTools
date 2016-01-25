/**
 * ApiResource Router
 * Registers standard routes for ApiResources
 *
 * Information about naming rules :
 * - Resource MUST be suffixed with `Resource`
 * - Templates MUST be located in `MY_MODULE/Partial/MY_RESOURCE/`
 * - Templates for `list`, `show`, `new`, `edit` MUST be respectively named : `index.html`, `show.html`, `new.html`, `edit.html`
 *
 * @param {Object} $routeProvider
 * @param {Object} $partialProvider
 * @constructor
 */
var ApiResourceRouteProvider = function ApiResourceRouteProvider($routeProvider, $partialProvider) {
    this.$routeProvider   = $routeProvider;
    this.$partialProvider = $partialProvider;

    // Just return the default $route object
    this.$get = $routeProvider.$get;
};

// Set up dependency injection
ApiResourceRouteProvider.$inject = [ '$routeProvider', '$partialProvider' ];

/**
 * Default options
 * @type {Object}
 */
ApiResourceRouteProvider.prototype.default = {};

/**
 * Default resource name pattern (placeholders : {resource} and {module} will be replaced on register)
 * @type {string}
 */
ApiResourceRouteProvider.prototype.default.resourceName = '{resource}Resource';

/**
 * Configuration for CRUD routes (template, controller, controller alias)
 * @type {Object}
 */
ApiResourceRouteProvider.prototype.default.options = {
    list: {
        templateUrl  : '{resource}/index.html',
        controller   : '{resource}ListController',
        controllerAs : 'listCtrl'
    },

    show: {
        templateUrl  : '{resource}/show.html',
        controller   : '{resource}ShowController',
        controllerAs : 'showCtrl'
    },

    new: {
        templateUrl  : '{resource}/form.html',
        controller   : '{resource}FormController',
        controllerAs : 'formCtrl'
    },

    edit: {
        templateUrl  : '{resource}/form.html',
        controller   : '{resource}FormController',
        controllerAs : 'formCtrl'
    }
};

/**
 * Create default routes for Resource (`list`, `show`, `create`, `update`)
 * @param {String}  module          - The name of the module which contains the Resource
 * @param {String}  resource        - The name of the Resource to expose
 * @param {String}  routePrefix     - Prefix to append to all routes
 * @param {boolean} [readOnly]      - Enable or disable read only (if true, `create` and `update` routes are omitted)
 * @param {Object}  [customOptions] - Custom options object (is merged with ResourceRouteProvider.defaultOptions if provided)
 */
ApiResourceRouteProvider.prototype.register = function register(module, resource, routePrefix, readOnly, customOptions) {
    var options = {};

    // Set default options
    angular.merge(options, this.default.options);

    // Override default options with custom if provided
    if (angular.isObject(customOptions)) {
        angular.merge(options, customOptions);
    }

    // Append `/` in route prefix if not set
    if (routePrefix && 0 !== routePrefix.length) {
        if ('/' !== routePrefix.charAt(0)) {
            routePrefix = '/' + routePrefix;
        }
    } else {
        routePrefix = '';
    }

    // Get Resource class to fetch data
    var resourceClass = this.setPlaceholders(this.default.resourceName, module, resource);

    // Register LIST route
    var listTemplate  = this.$partialProvider.getPath(module, this.setPlaceholders(options.list.templateUrl, module, resource));
    var listCtrl      = this.setPlaceholders(options.list.controller,   module, resource);
    var listCtrlAlias = this.setPlaceholders(options.list.controllerAs, module, resource);
    var listResolve   = {
        /**
         * Load the list of Resources
         */
        resources: [
            resourceClass,
            function resourcesResolver(Resource) {
                return Resource.query();
            }
        ]
    };

    // Append custom resolvers
    if (angular.isObject(options.list.resolve)) {
        angular.merge(listResolve, options.list.resolve);
    }

    this.$routeProvider.when(routePrefix, {
        templateUrl:  listTemplate,
        controller:   listCtrl,
        controllerAs: listCtrlAlias,
        resolve:      listResolve
    });

    if (!readOnly) {
        // The resource is not READ ONLY, so add modification and creation route

        // Register NEW route
        var newTemplate  = this.$partialProvider.getPath(module, this.setPlaceholders(options.new.templateUrl, module, resource));
        var newCtrl      = this.setPlaceholders(options.new.controller,   module, resource);
        var newCtrlAlias = this.setPlaceholders(options.new.controllerAs, module, resource);
        var newResolve   = {
            /**
             * Initialize an empty object that will be fill by form
             */
            resource: [
                resourceClass,
                function resourceResolver(Resource) {
                    return Resource.init();
                }
            ]
        };

        // Append custom resolvers
        if (angular.isObject(options.new.resolve)) {
            angular.merge(newResolve, options.new.resolve);
        }

        this.$routeProvider.when(routePrefix + '/new', {
            templateUrl  : newTemplate,
            controller   : newCtrl,
            controllerAs : newCtrlAlias,
            resolve      : newResolve
        });

        // Register EDIT route
        var editTemplate  = this.$partialProvider.getPath(module, this.setPlaceholders(options.edit.templateUrl, module, resource));
        var editCtrl      = this.setPlaceholders(options.edit.controller,   module, resource);
        var editCtrlAlias = this.setPlaceholders(options.edit.controllerAs, module, resource);
        var editResolve   = {
            /**
             * Load the Resource to edit
             */
            resource: [
                '$route',
                resourceClass,
                function resourceResolver($route, Resource) {
                    return Resource.get({ id: $route.current.params.id });
                }
            ]
        };

        // Append custom resolvers
        if (angular.isObject(options.edit.resolve)) {
            angular.merge(editResolve, options.edit.resolve);
        }

        this.$routeProvider.when(routePrefix + '/:id/edit', {
            templateUrl  : editTemplate,
            controller   : editCtrl,
            controllerAs : editCtrlAlias,
            resolve      : editResolve
        });
    }

    // Register SHOW route
    var showTemplate  = this.$partialProvider.getPath(module, this.setPlaceholders(options.show.templateUrl, module, resource));
    var showCtrl      = this.setPlaceholders(options.show.controller,   module, resource);
    var showCtrlAlias = this.setPlaceholders(options.show.controllerAs, module, resource);
    var showResolve   = {
        /**
         * Load the Resource to display
         */
        resource: [
            '$route',
            resourceClass,
            function resourceResolver($route, Resource) {
                return Resource.get({ id: $route.current.params.id });
            }
        ]
    };

    // Append custom resolvers
    if (angular.isObject(options.show.resolve)) {
        angular.merge(showResolve, options.show.resolve);
    }

    this.$routeProvider.when(routePrefix + '/:id', {
        templateUrl  : showTemplate,
        controller   : showCtrl,
        controllerAs : showCtrlAlias,
        resolve      : showResolve
    });
};

/**
 * Replace `{module}` and `{resource}` placeholders by values
 * @param {String} string
 * @param {String} module
 * @param {String} resource
 */
ApiResourceRouteProvider.prototype.setPlaceholders = function setPlaceholders(string, module, resource) {

    return string
        .replace('{module}',   module)
        .replace('{resource}', resource)
    ;
};

// Register provider into Angular JS
angular
    .module('ApiResource')
    .provider('apiResourceRoute', ApiResourceRouteProvider);
