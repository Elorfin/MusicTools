/**
 * Resource Router
 * Registers standard routes for ApiResources
 *
 * Information about naming rules :
 * - Resource MUST be suffixed with `Resource`
 * - Templates MUST be located in `MY_MODULE/Partial/MY_RESOURCE/`
 * - Templates for `list`, `show`, `new`, `edit` MUST be respectively named : `index.html`, `show.html`, `new.html`, `edit.html`
 *
 * @param {Object} $routeProvider
 * @constructor
 */
var ResourceRouteProvider = function ResourceRouteProvider($routeProvider) {
    this.$routeProvider = $routeProvider;

    // Just return the default $route object
    this.$get = $routeProvider.$get;
};

/**
 * Create default routes for Resource (`list`, `show`, `create`, `update`)
 * @param {String}  module      - The name of the module which contains the Resource
 * @param {String}  resource    - The name of the Resource to expose
 * @param {String}  routePrefix - Prefix to append to all routes
 * @param {boolean} [readOnly]  - Enable or disable read only (if true, `create` and `update` routes are omitted)
 */
ResourceRouteProvider.prototype.register = function register(module, resource, routePrefix, readOnly) {
    // Append `/` in route prefix if not set
    if (routePrefix && 0 !== routePrefix.length) {
        if ('/' !== routePrefix.charAt(0)) {
            routePrefix = '/' + routePrefix;
        }
    } else {
        routePrefix = '';
    }

    // Get Resource class to fetch data
    var resourceClass = resource + 'Resource';

    // Build url to template location
    var templateUrl = '../app/' + module + '/Partial/' + resource + '/';

    // Register LIST route
    var listCtrl      = resource + 'ListController';
    var listCtrlAlias = resource.toLowerCase() + 'ListCtrl';
    this.$routeProvider.when(routePrefix, {
        templateUrl:  templateUrl + 'index.html',
        controller:   listCtrl,
        controllerAs: listCtrlAlias,
        resolve: {
            /**
             * Load the list of Resources
             */
            resources: [
                resourceClass,
                function resourcesResolver(Resource) {
                    return Resource.query();
                }
            ]
        }
    });

    if (!readOnly) {
        // The resource is not READ ONLY, so add modification and creation route
        var formCtrl      = resource + 'FormController';
        var formCtrlAlias = resource.toLowerCase() + 'FormCtrl';

        // Register NEW route
        this.$routeProvider.when(routePrefix + '/new', {
            templateUrl:  templateUrl + 'form.html',
            controller:   formCtrl,
            controllerAs: formCtrlAlias,
            resolve: {
                /**
                 * Initialize an empty object that will be fill by form
                 */
                resource: [
                    resourceClass,
                    function resourceResolver(Resource) {
                        return Resource.init();
                    }
                ]
            }
        });

        // Register EDIT route
        this.$routeProvider.when(routePrefix + '/:id/edit', {
            templateUrl:  templateUrl + 'form.html',
            controller:   formCtrl,
            controllerAs: formCtrlAlias,
            resolve: {
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
            }
        });
    }

    // Register SHOW route
    var showCtrl      = resource + 'ShowController';
    var showCtrlAlias = resource.toLowerCase() + 'ShowCtrl';
    this.$routeProvider.when(routePrefix + '/:id', {
        templateUrl:  templateUrl + 'show.html',
        controller:   showCtrl,
        controllerAs: showCtrlAlias,
        resolve: {
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
        }
    });
};

// Set up dependency injection
ResourceRouteProvider.$inject = [ '$routeProvider' ];

// Register provider into Angular JS
angular
    .module('Utilities')
    .provider('resourceRoute', ResourceRouteProvider);