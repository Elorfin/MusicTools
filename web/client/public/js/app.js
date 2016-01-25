(function() {
"use strict";
// File : src/core/Alert/module.js
/**
 * Alert Module
 * Manages User messages
 */
angular.module('Alert', []);
// File : src/core/ApiResource/module.js
/**
 * ApiResource Module
 * Manages communication with a REST API server following the JSON API specification
 */
angular.module('ApiResource', []);
// File : src/core/Layout/module.js
/**
 * Layout Module
 * Contains all the tools for building the Layout of the application (header, sidebar, etc.)
 */
angular
    .module('Layout', [
        'ui.bootstrap'
    ])
    .config([
        '$translateProvider',
        function($translateProvider) {
            // Inject translations
            for (var lang in layoutTranslations) {
                if (layoutTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, layoutTranslations[lang]);
                }
            }
        }
    ]);
// File : src/core/Utilities/module.js
/**
 * Utilities Module
 */
angular.module('Utilities', []);
// File : src/core/core.js
/**
 *
 */
angular
    .module('AppCore', [
        // Angular modules
        'ngRoute',
        'ngAnimate',
        'ngSanitize',

        // Libraries modules
        'ngFileUpload',
        'ui.bootstrap',
        'pascalprecht.translate',
        'angular-loading-bar',

        'Utilities',
        'ApiResource',
        'Layout',
        'Alert'
    ]);
// File : src/core/Alert/Directive/AlertsDirective.js
/**
 * Alerts Directive
 * Renders user messages
 */
angular
    .module('Alert')
    .directive('alerts', [
        '$partial',
        function AlertsDirective($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('alerts.html', 'Alert', true),
                replace: true,
                controllerAs: 'alertsCtrl',
                controller: [
                    'AlertService',
                    function AlertsController(AlertService) {
                        // Expose service to template
                        this.alerts      = AlertService.getAlerts();
                        this.removeAlert = function removeAlert(alert) {
                            AlertService.removeAlert(alert, true);
                        };
                    }
                ]
            };
        }
    ]);
// File : src/core/Alert/Service/AlertService.js
/**
 * Alert Service
 * @constructor
 */
var AlertService = function AlertServiceConstructor($timeout) {
    this.$timeout = $timeout;
};

/**
 * List of all current active alerts
 * @param alert
 */
AlertService.prototype.alerts = [];

/**
 * Display duration for the alert which are configured to be auto-hidden
 * @type {number}
 */
AlertService.prototype.displayDuration = 1000;

/**
 * Get active alerts
 * @returns {Array}
 */
AlertService.prototype.getAlerts = function getAlerts() {
    return this.alerts;
};

/**
 * Add an alert in the alerts stack
 * @param {string}  type
 * @param {string}  message
 * @param {boolean} [autoHide]
 */
AlertService.prototype.addAlert = function addAlert(type, message, autoHide) {
    var newAlert = {
        type     : type,
        message  : message
    };

    // Configure auto hide if needed
    if (autoHide) {
        newAlert.timeout = this.$timeout(function () {
            this.removeAlert(newAlert);
        }.bind(this), this.displayDuration);
    }

    // Add to the stack
    this.alerts.push(newAlert);
};

/**
 * Remove an alert from the alerts stack
 * @param {Object}  alert
 * @param {boolean} [clearTimeout]
 */
AlertService.prototype.removeAlert = function removeAlert(alert, clearTimeout) {
    var pos = this.alerts.indexOf(alert);
    if (-1 !== pos) {
        var alert = this.alerts.splice(pos, 1);

        // Clear timeout if needed
        if (alert.timeout && clearTimeout) {
            this.$timeout.cancel(alert.timeout);
        }
    }
};

// Register service into AngularJS
angular
    .module('Alert')
    .service('AlertService', [ '$timeout', AlertService ]);
// File : src/core/ApiResource/Controller/FormController.js
/**
 * Base Form controller
 * @constructor
 */
var FormController = function FormController(resource, ApiResource) {
    this.resource    = resource;
    this.apiResource = ApiResource;
};

// Set up dependency injection
FormController.$inject = [ 'resource', 'ApiResource' ];

/**
 * Errors
 * @type {Array}
 */
FormController.prototype.errors = [];

/**
 * Current Resource
 * @type {Object}
 */
FormController.prototype.resource = null;

/**
 * Is the edited entity a new one ?
 * @returns {boolean}
 */
FormController.prototype.isNew = function isNew() {
    var isNew = true;
    if (null !== this.resource && 'undefined' !== typeof (this.resource.id) && null !== this.resource.id && 0 !== this.resource.id.length) {
        isNew = false;
    }

    return isNew;
};

/**
 * Validate the form
 */
FormController.prototype.validate = function validate() {
    return true
};

/**
 * Submit the form
 */
FormController.prototype.submit = function submit() {
    if (this.validate()) {
        if (this.isNew()) {
            this.apiResource.new(this.resource);
        } else {
            this.apiResource.update(this.resource);
        }
    }
};

// Register controller into Angular JS
angular
    .module('ApiResource')
    .controller('FormController', FormController);

// File : src/core/ApiResource/Controller/ListController.js
/**
 * Base List controller
 * @constructor
 */
var ListController = function ListController($uibModal, resources) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.resources = resources;
};

// Set up dependency injection
ListController.$inject = [ '$uibModal', 'resources' ];

/**
 * List of entities
 * @type {Array}
 */
ListController.prototype.resources = [];

/**
 * Format of the list
 */
ListController.prototype.format = 'detailed';

/**
 * Default field to sort by
 * @type {string}
 */
ListController.prototype.sortBy = null;

/**
 * Reverse direction of the sort
 * @type {boolean}
 */
ListController.prototype.sortReverse = false;

/**
 * Usable fields for sort
 * @type {Object}
 */
ListController.prototype.sortFields = {};

ListController.prototype.remove = function remove(entity) {
    // Display confirm callback
    var modalInstance = this.services.$uibModal.open({
        templateUrl : '../app/Layout/Partial/Modal/confirm.html',
        controller  : 'ConfirmModalController',
        windowClass : 'modal-danger'
    });

    modalInstance.result.then(function (selectedItem) {
        /*$scope.selected = selectedItem;*/
    }, function () {
        /*$log.info('Modal dismissed at: ' + new Date());*/
    });
};

// Register controller into angular
angular
    .module('ApiResource')
    .controller('ListController', ListController);

// File : src/core/ApiResource/Controller/ShowController.js
/**
 * Base Show Controller
 * @constructor
 */
var ShowController = function ShowController(resource) {
    this.resource = resource;
};

// Set up dependency injection
ShowController.$inject = [ 'resource' ];

/**
 * Current displayed entity
 * @type {Object}
 */
ShowController.prototype.resource = null;

// Register controller into angular
angular
    .module('ApiResource')
    .controller('ShowController', ShowController);

// File : src/core/ApiResource/Provider/ApiResourceRouteProvider.js
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
    var listTemplate  = this.$partialProvider.getPath(this.setPlaceholders(options.list.templateUrl, module, resource), module);
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
        var newTemplate  = this.$partialProvider.getPath(this.setPlaceholders(options.new.templateUrl, module, resource), module);
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
        var editTemplate  = this.$partialProvider.getPath(this.setPlaceholders(options.edit.templateUrl, module, resource), module);
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
    var showTemplate  = this.$partialProvider.getPath(this.setPlaceholders(options.show.templateUrl, module, resource), module);
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

// File : src/core/ApiResource/Resource/ApiResource.js
/**
 * Base API Resource
 * Manages API server data
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var ApiResource = function ApiResource($http, $q, ApiService) {
    // Store services
    this.services['$http'] = $http;
    this.services['$q']    = $q;
    this.services['api']   = ApiService;

    // Validate required properties
    if (null === this.type) {
        console.error('An ApiResource must have a property `type`.');
    }

    if (null === this.path) {
        console.error('An ApiResource must have a property `path`.');
    }
};

// Set up dependency injection
ApiResource.$inject = [ '$http', '$q', 'ApiService' ];

/**
 * List of dependencies
 * @type {Object}
 */
ApiResource.prototype.services = {};

/**
 * Type of the Resource
 * @type {string}
 */
ApiResource.prototype.type = null;

/**
 * Path of the API resource
 * @type {string}
 */
ApiResource.prototype.path = null;

/**
 * Initialize an empty Resource Object
 */
ApiResource.prototype.init = function init() {
    return {
        id         : null,
        type       : this.type,
        attributes : {}
    };
};

ApiResource.prototype.addRelationship = function addRelationship(resource, relationshipName, relationshipData) {
    if (!resource.relationships) {
        resource.relationships = {};
    }

    resource.relationships[relationshipName] = {
        data: relationshipData
    };
};

ApiResource.prototype.removeRelationship = function addRelationship(resource, relationshipName, relationshipData) {
    if (resource.relationships && resource.relationships[relationshipName] && resource.relationships[relationshipName].data) {
        if (resource.relationships[relationshipName].data instanceof Array) {
            // Collection of resource objects
        } else {
            // Single resource object

        }
    }

    resource.relationships[relationshipName] = {
        data: relationshipData
    };
};

/**
 * List existing resources filtered by `queryParams`
 *
 * @param   {Object}  [queryParams] - The parameters used to filter the list of elements
 * @returns {promise}               - The list of available resources
 */
ApiResource.prototype.query = function queryResources(queryParams) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(queryParams));

    // Call API
    this.services.$http(request).then(
        // Success callback
        function onServerSuccess(response) {
            // Set default data if empty
            var data = response.data.data ? response.data.data : [];

            deferred.resolve(data);
        },

        // Error callback
        function onServerError(response) {
            deferred.reject(response);
        }
    );

    return deferred.promise;
};

/**
 * Find an existing entity
 *
 * @param   {Object} params - The identifier of the resource to search
 * @returns {Object}        - The resource found
 */
ApiResource.prototype.get = function getResource(params) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(params));

    // Call API
    this.services.$http(request).then(
        // Success callback
        function onServerSuccess(response) {
            // Set default data if empty
            var data = response.data.data ? response.data.data : {};

            deferred.resolve(data);
        },

        // Error callback
        function onServerError(response) {
            deferred.reject(response);
        }
    );

    return deferred.promise;
};

/**
 * Create a new resource
 *
 * @param {Object} resource - The resource to create
 */
ApiResource.prototype.new = function newResource(resource) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(resource), 'POST', resource);

    // Call API
    this.services.$http(request)

        // API results
        .then(
            // Success callback
            function onServerSuccess(response) {
                deferred.resolve(response.data);
            },

            // Error callback
            function onServerError(response) {
                deferred.reject(response);
            }
        );

    return deferred.promise;
};

/**
 * Update an existing resource
 *
 * @param {Object} resource - The resource to update
 */
ApiResource.prototype.update = function updateResource(resource) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(resource), 'PUT', resource);

    // Call API
    this.services.$http(request)

        // API results
        .then(
            // Success callback
            function onServerSuccess(response) {
                deferred.resolve(response.data);
            },

            // Error callback
            function onServerError(response) {
                deferred.reject(response);
            }
        );

    return deferred.promise;
};

/**
 * Remove a resource
 *
 * @param {Object} resource - The resource to remove
 */
ApiResource.prototype.remove = function removeResource(resource) {

};

/**
 * Apply a callback to all resources
 *
 * @param {Function} callback - The callback to apply
 */
ApiResource.prototype.apply = function apply(callback) {
    if (typeof callback === 'function') {
        for (var i = 0; i < this.elements.length; i++) {
            callback(this.elements[i]);
        }
    }
};

/**
 * Build API path of the resource
 *
 * @returns {string}
 */
ApiResource.prototype.getFullPath = function buildPath(params) {
    var fullPath = this.services.api.getServer() + this.path;

    // Extracts params from path (delimited by {})
    var matches = this.path.match(/{([^}]+)}/gi);
    if (matches) {
        // Replace params with resource values
        for (var i = 0; i < matches.length; i++) {
            var resourceProperty = matches[i].replace('{', '').replace('}', '');
            var resourceValue = '';
            if (params && params.hasOwnProperty(resourceProperty)) {
                resourceValue = params[resourceProperty];
            }

            fullPath = fullPath.replace(matches[i], resourceValue);
        }
    }

    // Clean slashes
    while (fullPath.substr(-1) === '/') {
        fullPath = fullPath.substr(0, fullPath.length - 1);
    }

    return fullPath;
};

/**
 * Count elements
 *
 * @returns {Number} - The number of resources in the list
 */
ApiResource.prototype.count = function countResources() {
    return this.elements.length;
};

/**
 * Get request
 *
 * @param   {String} url      - The URL to call
 * @param   {String} [method] - The HTTP method to use to call the server API
 * @param   {Object} [data]   - The data to send to the API server
 *
 * @returns {Object}          - The Request
 */
ApiResource.prototype.getRequest = function createRequest(url, method, data) {
    var request = {};

    request.url     = url;

    // Set default method to GET
    request.method  = method ? method : 'GET';

    // Add data if needed
    request.data    = data ? { data: data } : null;

    // Enable GET requests caching
    request.cache   = true;

    // Force the Request Content-Type to be compliant with the json api specification
    request.headers = {
        'Accept'       : 'application/vnd.api+json',
        'Content-Type' : 'application/vnd.api+json'
    };

    return request;
};

// Register service into Angular JS
angular
    .module('ApiResource')
    .service('ApiResource', ApiResource);

// File : src/core/ApiResource/Service/ApiService.js
/**
 * API Service
 * @returns {ApiService}
 * @constructor
 */
var ApiService = function ApiService() {

};

/**
 * Server base path
 * @type {String}
 */
ApiService.prototype.server       = '/MusicTools/web/app_dev.php';

ApiService.prototype.resourcePath = '/MusicTools/web/';

ApiService.prototype.assetPath    = '/MusicTools/web/client/public/';

/**
 * Get server
 * @returns {String}
 */
ApiService.prototype.getServer = function getServer() {
    return this.server;
};

ApiService.prototype.getResourcePath = function getResourcePath() {
    return this.resourcePath;
};

ApiService.prototype.getAssetPath = function getAssetPath() {
    return this.assetPath;
};

// Inject Service into AngularJS
angular
    .module('ApiResource')
    .service('ApiService', [ ApiService ]);
// File : src/core/Layout/Controller/Modal/ConfirmModalController.js
/**
 * Confirm Modal controller
 * @constructor
 */
var ConfirmModalController = function ConfirmModalControllerConstructor($uibModalInstance) {
    this.instance = $uibModalInstance;
};


// Register controller into angular
angular
    .module('Layout')
    .controller('ConfirmModalController', [ '$uibModalInstance', ConfirmModalController ]);

// File : src/core/Layout/Directive/Field/ScoreFieldDirective.js
/**
 * Score Field
 */
angular
    .module('Layout')
    .directive('scoreField', [
        '$partial',
        function ScoreFieldDirective($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Field/score-field.html', 'Layout', true),
                replace: true,
                scope: {
                    /**
                     * Model variable
                     */
                    model: '=',

                    /**
                     * Name to use for form element
                     */
                    name: '@',

                    /**
                     * Icon of the field
                     */
                    icon: '@',

                    /**
                     * Enable editable features
                     */
                    editable: '@',

                    /**
                     * Min value of the field
                     */
                    min: '@',

                    /**
                     * Max value of the field
                     */
                    max: '@',

                    /**
                     * Step between values
                     */
                    step: '@'
                },
                controllerAs: 'scoreFieldCtrl',
                bindToController: true,
                controller: function ScoreFieldController () {
                    /**
                     * Default options
                     * @type {Object}
                     */
                    var _defaults = {
                        editable: false,
                        step    : 1,
                        min     : 0,
                        max     : 10,
                        icon    : 'fa fa-star'
                    };

                    // Set default vars
                    for (var prop in _defaults) {
                        if (_defaults.hasOwnProperty(prop) && undefined == this[prop]) {
                            this[prop] = _defaults[prop];
                        }
                    }

                    // Initialize value if empty
                    if (null == this.model) {
                        this.model = this.min;
                    }

                    // Create array of values for ng-repeat
                    this.values = [];
                    for (var i = this.min + 1; i <= this.max; i += this.step) {
                        this.values.push(i);
                    }
                }
            };
        }
    ]);
// File : src/core/Layout/Directive/Header/HeaderButtonDirective.js
/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('uiHeaderButton', [
        function HeaderButtonDirective() {
            return {
                restrict: 'E',
                template: '<li role="presentation" data-ng-transclude=""></li>',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : src/core/Layout/Directive/Header/HeaderButtonsDirective.js
/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('uiHeaderButtons', [
        function HeaderButtonsDirective() {
            return {
                restrict: 'E',
                template: '<nav class="ui-header-buttons navbar navbar-default"><ul class=" nav navbar-nav" data-ng-transclude=""></ul></nav>',
                replace: true,
                transclude: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : src/core/Layout/Directive/Header/HeaderDirective.js
/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('uiHeader', [
        '$partial',
        function HeaderDirective($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Header/navbar.html', 'Layout', true),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : src/core/Layout/Directive/ListFormatterDirective.js
/**
 * Widget to change how lists are displayed
 */
var LayoutListFormatterDirective = function LayoutListFormatterDirectiveConstructor($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('list-formatter.html', 'Layout', true),
        replace: true,
        scope: {
            /**
             * Current format of the list
             */
            format: '='
        },
        controllerAs: 'listFormatterCtrl',
        bindToController: true,
        controller: function LayoutListFormatterController () {
            /**
             * Switch display format of the list
             * @param format
             */
            this.switchFormat = function switchFormat(format) {
                this.format = format;
            };
        }
    };
};

// Set up dependency injection
LayoutListFormatterDirective.$inject = [ '$partial' ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutListFormatter', LayoutListFormatterDirective);

// File : src/core/Layout/Directive/ListSorterDirective.js
/**
 * Widget to sort lists
 */
var LayoutListSorterDirective = function LayoutListSorterDirectiveConstructor($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('list-sorter.html', 'Layout', true),
        replace: true,
        scope: {
            /**
             * Number of elements in the list
             */
            count: '=',

            /**
             * Element name for translation
             */
            element: '@',

            /**
             * Current field to sort by
             */
            current: '=',

            /**
             * Reverse direction of the sort (if true, ascendant, else descendant)
             */
            reverse: '=',

            /**
             * Usable fields for sort
             */
            fields: '='
        },
        controllerAs: 'listSorterCtrl',
        bindToController: true,
        controller: function LayoutListSorterController () {
            /**
             * Get the type of the current sort field
             * @returns {string}
             */
            this.getSortType = function getSortType() {
                var type = null;

                switch (this.fields[this.current]) {
                    case 'string':
                        type = 'string';
                        break;

                    case 'number':
                        type = 'number';
                        break;
                }

                return type;
            };

            /**
             * Set current sort field
             * @param {string} current
             */
            this.setCurrent = function setCurrent(current) {
                this.current = current;
            };

            /**
             * Toggle direction of the sort
             */
            this.toggleReverse = function toggleReverse() {
                this.reverse = !this.reverse;
            };
        }
    };
};

// Set up dependency injection
LayoutListSorterDirective.$inject = [ '$partial' ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutListSorter', LayoutListSorterDirective);

// File : src/core/Layout/Directive/Page/PageDirective.js
/**
 * Represents a page of the application
 */
angular
    .module('Layout')
    .directive('layoutPage', [
        function LayoutPageDirective() {
            return {
                restrict: 'E',
                template: '<div class="container-fluid" data-ng-transclude=""></div>',
                replace: true,
                transclude: true
            };
        }
    ]);
// File : src/core/Layout/Directive/Page/PageTitleDirective.js
/**
 * Represents the title of a Page
 */
angular
    .module('Layout')
    .directive('layoutPageTitle', [
        '$partial',
        function LayoutPageTitleDirective($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Page/title.html', 'Layout', true),
                replace: true,
                transclude: true,
                scope: {
                    /**
                     * If true, the title is hidden with the `sr-only` class
                     */
                    hideTitle: '@'
                }
            };
        }
    ]);
// File : src/core/Layout/Directive/ScrollableDirective.js
/**
 * Scrollable Directive
 */
angular
    .module('Layout')
    .directive('layoutScrollable', [
        '$document',
        function ScrollableDirective ($document) {
            // Set some default options
            var options = {
                scrollInertia: 100,
                scrollButtons:{
                    enable: false
                },
                scrollAmount: 80,
                axis: 'y',
                contentTouchScroll: true,
                autoHideScrollbar: false
            };

            return {
                restrict: 'A',
                replace: true,
                transclude: true,
                template: '<div class="scrollable" data-ng-transclude=""></div>',
                scope: {
                    options : '=layoutScrollableOptions'
                },
                link: function (scope, element) {
                    if (scope.options) {
                        angular.extend(options, scope.options);
                    }

                    var $element = $(element);

                    initScrollbar();

                    function initScrollbar() {
                        // Create object
                        $element.ready(function () {
                            $element.mCustomScrollbar(options);
                        });

                        // Add events
                        $(window).on('resize', function () {
                            $element.mCustomScrollbar('update');
                        });

                        $document.on('hover', $element, function () {
                            $document.data({ "keyboard-input" : "enabled" });
                            $(this).addClass("keyboard-input");
                        });

                        $document.on('mouseout', $element, function () {
                            $document.data({ "keyboard-input" : "disabled" });
                            $(this).removeClass("keyboard-input");
                        });

                        $document.on('keydown', function () {
                            if ($(this).data("keyboard-input")==="enabled") {
                                var activeElem = $(".keyboard-input");

                                var top = parseFloat($(".keyboard-input .mCSB_container").position().top);
                                var activeElemPos = Math.abs(top);
                                var pixelsToScroll = 80;

                                if (e.which === 38) { //scroll up
                                    e.preventDefault();
                                    if (pixelsToScroll>activeElemPos) {
                                        activeElem.mCustomScrollbar("scrollTo","top");
                                    }
                                    else {
                                        activeElem.mCustomScrollbar("scrollTo",(activeElemPos-pixelsToScroll),{scrollInertia:400,scrollEasing:"easeOutCirc"});
                                    }
                                }
                                else if (e.which===40) { //scroll down
                                    e.preventDefault();
                                    activeElem.mCustomScrollbar("scrollTo",(activeElemPos+pixelsToScroll),{scrollInertia:400,scrollEasing:"easeOutCirc"});
                                }
                            }
                        });
                    }
                }
            };
        }
    ]);

// File : src/core/Layout/Directive/Sidebar/SidebarDirective.js
/**
 * Sidebar of the application
 */
var LayoutSidebarDirective = function LayoutSidebarDirectiveConstructor($location, $partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Sidebar/sidebar.html', 'Layout', true),
        replace: true,
        scope: {},
        link: function sidebarDirectiveLink(scope, element, attrs) {
            scope.currentPath = $location.path(); // Get current path

            // Watch for path changes
            scope.$on('$locationChangeSuccess', function () {
                scope.currentPath = $location.path();
            });
        }
    };
};

// Set up dependency injection
LayoutSidebarDirective.$inject = [ '$location', '$partial' ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutSidebar', LayoutSidebarDirective);
// File : src/core/Layout/Directive/Sidebar/SidebarItemDirective.js
/**
 * Represents a link in the sidebar
 */
var LayoutSidebarItemDirective = function LayoutSidebarItemDirective($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Sidebar/sidebar-item.html', 'Layout', true),
        replace: true,
        scope: {
            icon       : '@',
            label      : '@',
            url        : '@',
            currentPath: '='
        },
        link: function sidebarItemLink(scope, element, attrs) {
            // Watch current path changes
            scope.$watch('currentPath', function () {
                scope.current = (scope.currentPath && 0 === scope.currentPath.indexOf(scope.url));
            });
        }
    };
};

// Set up dependency injection
LayoutSidebarItemDirective.$inject = [ '$partial' ];

// Register into AngularJS
angular
    .module('Layout')
    .directive('layoutSidebarItem', LayoutSidebarItemDirective);
// File : src/core/Layout/translations.js
/**
 * Layout translations
 * @type {Object}
 */
var layoutTranslations = {};

/**
 * Language = EN
 */
layoutTranslations['en'] = {
    list_display_tile           : 'tiles',
    list_display_list_detailed  : 'detailed list',
    list_display_list_condensed : 'condensed list'
};



/**
 * Language = FR
 */
layoutTranslations['fr'] = {
    list_display_tile           : 'tuiles',
    list_display_list_detailed  : 'liste détaillée',
    list_display_list_condensed : 'liste condensée'
};
// File : src/core/Utilities/Filter/AssetPathFilter.js
/**
 * Asset Path filter
 */
angular
    .module('Utilities')
    .filter('asset_path', [
        'ApiService',
        function (ApiService) {
            return function (path) {
                return ApiService.getAssetPath() + path;
            };
        }
    ]);
// File : src/core/Utilities/Filter/PartialPathFilter.js
/**
 * Partial Path filter
 */
angular
    .module('Utilities')
    .filter('partial_path', [
        '$partial',
        function ($partial) {
            return function (path, module, isCore) {
                return $partial.getPath(path, module, isCore);
            };
        }
    ]);
// File : src/core/Utilities/Filter/ResourcePathFilter.js
/**
 * Resource Path filter
 */
angular
    .module('Utilities')
    .filter('resource_path', [
        'ApiService',
        function (ApiService) {
            return function (path) {
                return ApiService.getResourcePath() + path;
            };
        }
    ]);

// File : src/core/Utilities/Provider/PartialProvider.js
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

var Partial = function Partial(options) {
    this.getPath = function getPath(relativePath, module, isCore) {
        var path = (typeof isCore !== 'undefined' && isCore) ? options.baseCorePath : options.baseAppPath;
        path += module + '/' + options.partialDir;

        var fullPath = path + relativePath;

        return fullPath;
    };
};

// Inject Service into AngularJS
angular
    .module('Utilities')
    .provider('$partial', PartialProvider);

// File : src/core/Utilities/Service/HttpErrorService.js
/**
 * HTTP Error Service
 * @constructor
 */
var HttpErrorService = function HttpErrorService($q, $location) {
    return {
        response: function(responseData) {
            return responseData;
        },

        responseError: function error(response) {
            switch (response.status) {
                case 401:
                    $location.path('/login');
                    break;
                case 404:
                    $location.path('/404');
                    break;
                default:
                    $location.path('/error_server');
            }

            return $q.reject(response);
        }
    };
};

// Inject Service into AngularJS
angular
    .module('Utilities')
    .service('HttpErrorService', [ '$q', '$location', HttpErrorService ]);
// File : src/core/Utilities/Service/SoundService.js
/**
 * API Service
 * @returns {ApiService}
 * @constructor
 */
var SoundService = function SoundService() {

};

/**
 * Current AudioContext
 * @type {AudioContext|webkitAudioContext}
 */
SoundService.prototype.context = null;

/**
 * Get server
 * @returns {String}
 */
SoundService.prototype.playFrequency = function playFrequency(frequency, start, duration) {
    var context = new (window.AudioContext || window.webkitAudioContext)();

    var oscillator = context.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(context.destination);

    oscillator.start(start);
    oscillator.stop(start + duration);

    return oscillator;
};

// Inject Service into AngularJS
angular
    .module('Utilities')
    .service('SoundService', [ SoundService ]);
// File : src/app/Advertisement/module.js
/**
 * Advertisement Module
 */
angular.module('Advertisement', []);
// File : src/app/Badge/module.js
/**
 * Badge Module
 */
angular.module('Badge', []);
// File : src/app/Forum/module.js
/**
 * Forum Module
 */
angular.module('Forum', []);
// File : src/app/Game/module.js
/**
 * Game Module
 */
angular.module('Game', []);
// File : src/app/GuitarNeck/module.js
/**
 * Guitar Neck
 */
angular
    .module('GuitarNeck', []);
// File : src/app/Instrument/module.js
/**
 * Instrument Module
 */
angular
    .module('Instrument', [
        'Utilities'
    ])
    .config([
        '$translateProvider',
        function($translateProvider) {
            // Inject translations
            for (var lang in instrumentTranslations) {
                if (instrumentTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, instrumentTranslations[lang]);
                }
            }
        }
    ]);


// File : src/app/Lesson/module.js
/**
 * Lesson Module
 */
angular
    .module('Lesson', [
        'ui.tinymce'
    ])
    .value('uiTinymceConfig', {
        statusbar: false,
        elementpath: false,
        menubar: false,
        plugins: [
            'link',
            'image',
            'table',
            'code'
        ],
        toolbar: 'undo redo | styleselect | bold italic underline | bullist numlist table | alignleft aligncenter alignright alignjustify | indent outdent | link unlink | image | code'
    })
    .config([
        '$translateProvider',
        function lessonConfig($translateProvider) {
            // Inject translations
            for (var lang in lessonTranslations) {
                if (lessonTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, lessonTranslations[lang]);
                }
            }
        }
    ]);
// File : src/app/SheetMusic/module.js
/**
 * SHeet Music renderer
 */
angular.module('SheetMusic', []);
// File : src/app/SongBook/module.js
/**
 * SongBook Module
 */
angular
    .module('SongBook', [
        'ngFileUpload',
        'Utilities'
    ])
    .config([
        '$translateProvider',
        function($translateProvider) {
            // Inject translations
            for (var lang in songBookTranslations) {
                if (songBookTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, songBookTranslations[lang]);
                }
            }
        }
    ]);
// File : src/app/Theory/module.js
/**
 * Theory Module
 */
angular
    .module('Theory', [
        'ngRoute',
        'SheetMusic'
    ])
    .config([
        '$translateProvider',
        function($translateProvider) {
            // Inject translations
            for (var lang in theoryTranslations) {
                if (theoryTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, theoryTranslations[lang]);
                }
            }
        }
    ]);
// File : src/app/Tuning/module.js
/**
 * Tuning module
 */
angular.module('Tuning', []);
// File : src/app/User/module.js
/**
 * User Module
 */
angular.module('User', []);
// File : src/app/app.js
/**
 * Application Root
 * Initializes needed modules in the Angular application
 */
angular
    .module('App', [
        'AppCore',

        'Advertisement',
        'Badge',
        'Forum',
        'Game',
        'Instrument',
        'GuitarNeck',
        'Lesson',
        'SongBook',
        'Theory',
        'Tuning',
        'User'
        // 'Guitar',
        // 'SheetMusic'
    ])
    .config([
        '$httpProvider',
        '$translateProvider',
        'cfpLoadingBarProvider',
        function configure($httpProvider, $translateProvider, cfpLoadingBarProvider) {
            // Set up Http Error interceptor to catch server error response
            $httpProvider.interceptors.push('HttpErrorService');

            // Inject translations
            for (var lang in appTranslations) {
                if (appTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, appTranslations[lang]);
                }
            }

            // Enable pluralization for translator
            $translateProvider.addInterpolation('$translateMessageFormatInterpolation');

            // Set the default lang
            $translateProvider.preferredLanguage('en');

            // Set sanitize strategy for translations
            $translateProvider.useSanitizeValueStrategy('sanitize');

            // Disable loading spinner
            cfpLoadingBarProvider.includeSpinner = false;
        }
    ]);
// File : src/app/Advertisement/routes.js
/**
 * Advertisement routes
 */
angular.module('Advertisement').config([
    '$routeProvider',
    function AdvertisementRoutes($routeProvider) {

    }
]);
// File : src/app/Badge/routes.js
/**
 * Badge routes
 */
angular.module('Badge').config([
    '$routeProvider',
    function BadgeRoutes($routeProvider) {

    }
]);
// File : src/app/Forum/routes.js
/**
 * Forum routes
 */
angular.module('Forum').config([
    '$routeProvider',
    function ForumRoutes($routeProvider) {

    }
]);
// File : src/app/Game/Controller/GameListController.js
/**
 * List controller for Games
 * @constructor
 */
var GameListController = function GameListControllerConstructor($uibModal, resources) {
    ListController.apply(this, arguments);
};

// Extends ListController
GameListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
GameListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
GameListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
GameListController.prototype.sortFields = {
    name    : 'string'
};

// Register controller into angular
angular
    .module('Game')
    .controller('GameListController', GameListController);

// File : src/app/Game/Resource/GameResource.js
var GameResource = function GameResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
GameResource.prototype = Object.create(ApiResource.prototype);
GameResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
GameResource.prototype.type = 'game';

/**
 * Path of the API resource
 * @type {string}
 */
GameResource.prototype.path = '/games/{id}';

// Register service into Angular JS
angular
    .module('Game')
    .service('GameResource', GameResource);

// File : src/app/Game/routes.js
/**
 * Game routes
 */
angular
    .module('Game')
    .config([
        'apiResourceRouteProvider',
        function GameRoutes(apiResourceRouteProvider) {
            apiResourceRouteProvider.register('Game', 'Game', 'games', true);
        }
    ]);
// File : src/app/GuitarNeck/Controller/GuitarNeckController.js
var GuitarNeckController = function GuitarNeckController() {

};

GuitarNeckController.prototype.height = 300;

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('GuitarNeckController', GuitarNeckController);

// File : src/app/GuitarNeck/Controller/Layer/AbstractLayerController.js
/**
 * Abstract Layer Controller
 * @returns {AbstractLayerController}
 * @constructor
 */
var AbstractLayerController = function AbstractLayerController() {
    return this;
};

/**
 * Options for rendering
 * @type {Object}
 */
AbstractLayerController.prototype.renderOptions = {
    /**
     * Width of the Layer
     * @type {Number}
     */
    width  : null,

    /**
     * Height of the Layer
     * @type {Number}
     */
    height : null,

    /**
     * Rendering colors
     * @type {Object}
     */
    color: {
        /**
         * Color of the font
         * @type {String}
         */
        font      : '#161616',

        /**
         * Default color
         * @type {String}
         */
        default   : '#303030',

        /**
         * Highlighted color
         * @type {String}
         */
        highlight : '#444444'
    }
};

/**
 * Redraw Layer
 * @param   {HTMLCanvasElement} canvas
 * @param   {Number}            width
 * @param   {Number}            height
 * @returns {AbstractLayerController}
 */
AbstractLayerController.prototype.redraw = function redraw(canvas, width, height) {
    console.log('Abstract Layer is redrawn.');

    // Set sizes
    this.renderOptions.width  = width;
    this.renderOptions.height = height;

    // Get 2D context of the canvas
    var context = canvas.getContext('2d');
    if (null !== context) {
        // Set width of the canvas
        canvas.width  = this.renderOptions.width;
        canvas.height = this.renderOptions.height;
    }

    return this;
};

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('AbstractLayerController', AbstractLayerController);

// File : src/app/GuitarNeck/Controller/Layer/FretLayerController.js
/**
 * Fret Layer Controller
 * @returns {FretLayerController}
 * @constructor
 */
var FretLayerController = function FretLayerController() {
    // Call parent constructor
    AbstractLayerController.apply(this, arguments);

    return this;
};

// Extends the base controller
FretLayerController.prototype = Object.create(AbstractLayerController.prototype);
FretLayerController.prototype.constructor = AbstractLayerController;

/**
 * Configuration for the rendering of reference Frets
 * @type {Object}
 */
FretLayerController.prototype.renderOptions.references = {
    /**
     * Display dots for reference Frets
     * @type {boolean}
     */
    display   : true,

    /**
     * Highlight references (other color + thicker line)
     * @type {boolean}
     */
    highlight : true,

    /**
     * Size of the rendered dots
     * @type {Number}
     */
    dotSize   : 10
};

/**
 * Configuration for the rendering of Fret numbers
 * @type {Object}
 */
FretLayerController.prototype.renderOptions.numbers = {
    /**
     * Is the number must be displayed ?
     * @type {boolean}
     */
    display : true,

    /**
     * Size of the numbers when displayed
     * @type {Number}
     */
    size    : 30,

    /**
     * Font properties
     * @type {Object}
     */
    font: {
        /**
         * Size of the Font (in pixels)
         * @type {Number}
         */
        size   : 12,

        /**
         * Weight of the Font (bold or normal)
         * @type {String}
         */
        weight : 'bold',

        /**
         * Font family
         * @type {String}
         */
        family : '"Helvetica Neue",Helvetica,Arial,sans-serif'
    }
};


/**
 * First displayed fret
 * @type {Number}
 */
FretLayerController.prototype.fretFirst = 0;

/**
 * Last displayed fret
 * @type {Number}
 */
FretLayerController.prototype.fretLast = 24;

/**
 * Total of frets that can be displayed
 * @type {Number}
 */
FretLayerController.prototype.fretCount = 24;

/**
 * Redraw Layer
 * @param   {HTMLCanvasElement} canvas Canvas to draw on
 * @param   {Number}            width  Width of the Layer
 * @param   {Number}            height Height of the Layer
 * @returns {FretLayerController}
 */
FretLayerController.prototype.redraw = function redraw(canvas, width, height) {
    console.log('Fret Layer is redrawn.');

    // Call parent controller
    AbstractLayerController.prototype.redraw.apply(this, arguments);

    // Get 2D context of the canvas
    var context = canvas.getContext('2d');
    if (null !== context) {
        // Start drawing
        this.drawFrets(context);
    }

    return this;
};

/**
 * Draw frets
 * @param   {Object} context Context to draw on
 * @returns {FretLayerController}
 */
FretLayerController.prototype.drawFrets = function drawFrets(context) {
    var fretPosition = 15;
    var fretInterval = (this.renderOptions.width - 30) / (this.fretLast - this.fretFirst);

    // Loop through all frets that need to be drawn
    for (var i = this.fretFirst; i <= this.fretLast; i++) {
        var highlight = this.fretIsHighlighted(i);

        // Draw the fret reference if needed
        if (highlight && this.renderOptions.references.display) {
            this.drawFretReference(context, fretPosition - (fretInterval / 2), i);
        }

        // Draw the Fret line
        this.drawFret(context, fretPosition, i, highlight);

        // Set position of the next fret
        fretPosition += fretInterval;
    }

    return this;
};

/**
 * Check if the current fret is a reference fret (e.g. 3, 5, 7)
 * @param   {Number} fretNumber Number of the Fret
 * @returns {boolean}
 */
FretLayerController.prototype.fretIsHighlighted = function fretIsHighlighted(fretNumber) {
    var highlight = false;

    if (this.renderOptions.references.highlight) {
        if ( 0 !== fretNumber && (fretNumber % 12) == 0 ) {
            highlight = true;
        } else {
            var caseNumber = fretNumber % 12;
            if ( 13 !== fretNumber && caseNumber < 10 && (caseNumber % 2) != 0 ) {
                highlight = true;
            }
        }
    }

    return highlight;
};

/**
 * Draw a Fret
 * @param   {Object}  context   Context to draw on
 * @param   {Number}  x         Horizontal position of the Fret (in pixels)
 * @param   {Number}  number    Number of the Fret
 * @param   {boolean} highlight Is the current Fret a reference Fret ?
 * @returns {FretLayerController}
 */
FretLayerController.prototype.drawFret = function drawFret(context, x, number, highlight) {
    context.beginPath();

    var lineWidth = 3;
    if (this.renderOptions.references.highlight) {
        if (0 == number) {
            lineWidth = 9;
        } else if (highlight) {
            lineWidth = 5;
        }
    }

    var fretColor = this.renderOptions.color.default;
    if (highlight) {
        fretColor = this.renderOptions.color.highlight;
    }

    // Fix x position for better rendering
    if ( 0 === (x / 0.5) % 2 ) {
        // Check if the current position finishes by 0.5 (number of 0.5 MUST be odd for a good rendering )
        x += 0.5;
    }

    var y = this.renderOptions.height;
    if (this.renderOptions.references.display) {
        // We need to draw the dots for reference frets, so let some space for it
        y -= this.renderOptions.references.dotSize * 2;
    }

    context.moveTo(x, 0);
    context.lineTo(x, y);

    context.lineWidth   = lineWidth;
    context.strokeStyle = fretColor;

    context.closePath();
    context.stroke();

    // Draw fret numbers if needed
    if (this.renderOptions.numbers.display && this.fretFirst !== number && this.fretLast !== number) {
        this.drawFretNumber(context, x, number, highlight);
    }

    return this;
};

/**
 * Draw the number of the current Fret
 * @param   {Object}  context   Context to draw on
 * @param   {Number}  x         Horizontal position of the Fret (in pixels)
 * @param   {Number}  number    Number of the Fret
 * @param   {boolean} highlight Is the current Fret a reference Fret ?
 * @returns {FretLayerController}
 */
FretLayerController.prototype.drawFretNumber = function drawFretNumber(context, x, number, highlight) {
    var y = 0;

    var fretColor = this.renderOptions.color.default;
    if (highlight) {
        fretColor = this.renderOptions.color.highlight;
    }

    // Number background
    context.beginPath();
    context.fillStyle = fretColor;
    context.rect(x - (this.renderOptions.numbers.size / 2), y, this.renderOptions.numbers.size, this.renderOptions.numbers.size);
    context.closePath();
    context.fill();

    // Number text
    context.beginPath();

    context.font         = this.renderOptions.numbers.font.weight + ' ' + this.renderOptions.numbers.font.size + 'px ' + this.renderOptions.numbers.font.family;
    context.fillStyle    = this.renderOptions.color.font;
    context.textAlign    = 'center';
    context.shadowColor  = 'transparent';
    context.textBaseline = 'middle';

    context.closePath();

    context.fillText(number, x, y + (this.renderOptions.numbers.size / 2));

    return this;
};

/**
 * Draw the dots for reference Fret
 * @param   {Object} context Context to draw on
 * @param   {Number} x       Horizontal position of the Fret (in pixels)
 * @param   {Number} number  Number of the Fret
 * @returns {FretLayerController}
 */
FretLayerController.prototype.drawFretReference = function drawFretReference(context, x, number) {
    var double = false;
    if (0 === number % 12) {
        double = true;
    }

    context.beginPath();
    context.fillStyle = this.renderOptions.color.highlight;

    var y = this.renderOptions.height - this.renderOptions.references.dotSize;

    if (double) {
        // Draw two dots
        context.arc(x + this.renderOptions.references.dotSize, y, this.renderOptions.references.dotSize/2, 0, 2 * Math.PI, false);
        context.arc(x - this.renderOptions.references.dotSize, y, this.renderOptions.references.dotSize/2, 0, 2 * Math.PI, false);
    } else {
        // Draw one dot
        context.arc(x, y, this.renderOptions.references.dotSize/2, 0, 2 * Math.PI, false);
    }

    context.closePath();
    context.fill();

    return this;
};

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('FretLayerController', FretLayerController);

// File : src/app/GuitarNeck/Controller/Layer/NoteLayerController.js
/**
 * Note Layer Controller
 * @returns {NoteLayerController}
 * @constructor
 */
var NoteLayerController = function NoteLayerController() {
    // Call parent constructor
    AbstractLayerController.apply(this, arguments);

    return this;
};

// Extends the base controller
NoteLayerController.prototype = Object.create(AbstractLayerController.prototype);
NoteLayerController.prototype.constructor = NoteLayerController;

/**
 * Redraw strings
 * @param   {HTMLCanvasElement} canvas Context to draw on
 * @param   {Number}            width  Width of the Layer
 * @param   {Number}            height Height of the Layer
 * @returns {NoteLayerController}
 */
NoteLayerController.prototype.redraw = function redraw(canvas, width, height) {
    console.log('Note Layer is redrawn.');

    return this;
};

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('NoteLayerController', NoteLayerController);

// File : src/app/GuitarNeck/Controller/Layer/StringLayerController.js
/**
 * String Layer Controller
 * @returns {StringLayerController}
 * @constructor
 */
var StringLayerController = function StringLayerController() {
    // Call parent constructor
    AbstractLayerController.apply(this, arguments);

    return this;
};

// Extends the base controller
StringLayerController.prototype = Object.create(AbstractLayerController.prototype);
StringLayerController.prototype.constructor = StringLayerController;

/**
 * Redraw strings
 * @param   {HTMLCanvasElement} canvas Context to draw on
 * @param   {Number}            width  Width of the Layer
 * @param   {Number}            height Height of the Layer
 * @returns {StringLayerController}
 */
StringLayerController.prototype.redraw = function redraw(canvas, width, height) {
    console.log('String Layer is redrawn.');

    // Call parent controller
    AbstractLayerController.prototype.redraw.apply(this, arguments);

    // Get 2D context of the canvas
    var context = canvas.getContext('2d');
    if (null !== context) {
        // Start drawing
        this.drawStrings(context);
    }

    return this;
};

StringLayerController.prototype.drawStrings = function drawStrings(context) {
    /*for (var i = this.strings.length - 1; i >= 0; i--) {
        this.drawString(i, this.strings[i].value);
    }*/

    return this;
};

/**
 * Draw a string
 */
StringLayerController.prototype.drawString = function drawString(stringNumber, stringValue) {
    var note = this.notes.get(stringValue);

    // Calculate position of the string
    var stringPosition = this.getStringPosition(stringNumber);

    // Calculate width of the string
    var stringWidth = ( (stringNumber + 1) * 0.5) + 0.5;

    // Draw the string
    this.context.beginPath();

    this.context.moveTo(0, stringPosition);
    this.context.lineTo(this.width, stringPosition);

    this.context.lineWidth   = stringWidth;
    this.context.strokeStyle = this.renderOptions.stringColor;

    this.context.shadowColor = '#000';
    this.context.shadowBlur = 4;
    this.context.shadowOffsetX = 0;
    this.context.shadowOffsetY = 0;

    this.context.closePath();
    this.context.stroke();

    // Draw the name of the string
    this.drawNote((this.renderOptions.notes.size + 2) / 2 , stringPosition, note, this.renderOptions.notes.size, this.renderOptions.notes.defaultColor, this.renderOptions.notes.defaultFill, '#dddddd');
};

StringLayerController.prototype.getStringPosition = function getStringPosition(stringNumber) {
    // Calculate position of the string
    var stringPosition = this.height.strings.interval * stringNumber + 0.5 + this.height.strings.offset;
    if (this.frets.showNumber) {
        // We display the fret numbers, so move down the strings
        stringPosition += this.renderOptions.fretNumberSize;
    }

    return stringPosition;
};

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('StringLayerController', StringLayerController);

// File : src/app/GuitarNeck/Directive/GuitarNeckDirective.js
angular
    .module('GuitarNeck')
    .directive('guitarNeckWidget', [
        '$partial',
        function ($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('GuitarNeck.html', 'GuitarNeck'),
                replace: true,
                scope: {
                    guitar: '=?'
                },
                controller: 'GuitarNeckController',
                controllerAs: 'guitarNeckCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);

// File : src/app/GuitarNeck/Directive/Layer/FretLayerDirective.js
angular
    .module('GuitarNeck')
    .directive('fretLayer', [
        '$window',
        '$partial',
        function FretLayerDirective($window, $partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Layer/FretLayer.html', 'GuitarNeck'),
                replace: true,
                scope: {
                    /**
                     * First displayed fret
                     */
                    fretFirst: '@',

                    /**
                     * Last displayed fret
                     */
                    fretLast : '@',

                    /**
                     * Total of frets that can be displayed
                     */
                    fretCount: '@'
                },
                controller: 'FretLayerController',
                controllerAs: 'fretLayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs, fretLayerCtrl) {
                    // Get canvas
                    var canvas = element.find('canvas').get(0);

                    // Draw frets on load
                    fretLayerCtrl.redraw(canvas, element.width(), element.height());

                    // Watch properties
                    scope.$watch(function() { return fretLayerCtrl.fretFirst }, function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            // Redraw Layer
                            fretLayerCtrl.redraw(canvas, element.width(), element.height());
                        }
                    });

                    scope.$watch(function() { return fretLayerCtrl.fretLast }, function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            // Redraw Layer
                            fretLayerCtrl.redraw(canvas, element.width(), element.height());
                        }
                    });

                    scope.$watch(function() { return fretLayerCtrl.fretCount }, function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            // Redraw Layer
                            fretLayerCtrl.redraw(canvas, element.width(), element.height());
                        }
                    });

                    // Redraw layer on window resize
                    $($window).on('resize', function onWindowResize(event) {
                        fretLayerCtrl.redraw(canvas, element.width(), element.height());
                    });
                }
            };
        }
    ]);
// File : src/app/GuitarNeck/Directive/Layer/NoteLayerDirective.js
angular
    .module('GuitarNeck')
    .directive('noteLayer', [
        '$window',
        '$partial',
        function NoteLayerDirective($window, $partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Layer/NoteLayer.html', 'GuitarNeck'),
                replace: true,
                scope: {

                },
                controller: 'NoteLayerController',
                controllerAs: 'noteLayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs, noteLayerCtrl) {
                    // Draw notes on load
                    noteLayerCtrl.redraw();

                    // Redraw layer on window resize
                    $($window).on('resize', function onWindowResize(event) {
                        noteLayerCtrl.redraw();
                    });
                }
            };
        }
    ]);

// File : src/app/GuitarNeck/Directive/Layer/StringLayerDirective.js
angular
    .module('GuitarNeck')
    .directive('stringLayer', [
        '$window',
        '$partial',
        function StringLayerDirective($window, $partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Layer/StringLayer.html', 'GuitarNeck'),
                replace: true,
                scope: {
                    strings: '=?'
                },
                controller: 'StringLayerController',
                controllerAs: 'stringLayerCtrl',
                bindToController: true,
                link: function (scope, element, attrs, stringLayerCtrl) {
                    // Get canvas
                    var canvas = element.get(0);

                    // Draw strings on load
                    stringLayerCtrl.redraw(canvas, element.width(), element.height());

                    // Redraw layer on window resize
                    $($window).on('resize', function onWindowResize(event) {
                        stringLayerCtrl.redraw(canvas, element.width(), element.height());
                    });
                }
            };
        }
    ]);

// File : src/app/Instrument/Controller/InstrumentFormController.js
/**
 * Form controller for Instruments
 * @constructor
 */
var InstrumentFormController = function InstrumentFormController(resource, InstrumentResource, instrumentTypes, InstrumentTemplateResource) {
    FormController.apply(this, arguments);

    this.instrumentTypes  = instrumentTypes;
    this.templateResource = InstrumentTemplateResource;
};

// Extends FormController
InstrumentFormController.prototype             = Object.create(FormController.prototype);
InstrumentFormController.prototype.constructor = InstrumentFormController;

// Set up dependency injection
InstrumentFormController.$inject = [ 'resource', 'InstrumentResource' ];

/**
 * Select the type of the Instrument
 * @param {Object} type
 */
InstrumentFormController.prototype.selectType = function selectType(type) {
    this.apiResource.addRelationship(this.resource, 'type', type);

    // Load templates for this type
    this.loadTemplates(type);
};

/**
 * Load the list of available Templates for the selected Type
 * @param {Object} type
 */
InstrumentFormController.prototype.loadTemplates = function loadTemplates(type) {
    this.templates = this.templateResource.get({ type: type.id }).then(function (result) {
        this.templates = result;
    }.bind(this));
};

/**
 * Select a template for the Instrument
 * @param {Object} template
 */
InstrumentFormController.prototype.selectTemplate = function selectTemplate(template) {
    this.selectedTemplate = template;

    // Fill instrument information with template
    for (var attr in template.attributes) {
        if (template.attributes.hasOwnProperty(attr)) {
            this.resource.attributes[attr] = template.attributes[attr];
        }
    }
};

// Register controller into Angular JS
angular
    .module('Instrument')
    .controller('InstrumentFormController', InstrumentFormController);

// File : src/app/Instrument/Controller/InstrumentListController.js
/**
 * List controller for Instruments
 * @constructor
 */
var InstrumentListController = function InstrumentListController($uibModal, resources) {
    ListController.apply(this, arguments);
};

// Extends ListController
InstrumentListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
InstrumentListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
InstrumentListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
InstrumentListController.prototype.sortFields = {
    name :  'string'
};

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentListController', InstrumentListController);

// File : src/app/Instrument/Controller/InstrumentShowController.js
/**
 * Show controller for Instruments
 * @constructor
 */
var InstrumentShowController = function InstrumentShowController(resource) {
    ShowController.apply(this, arguments);
};

// Extends ShowController
InstrumentShowController.prototype = Object.create(ShowController.prototype);
InstrumentShowController.$inject = ShowController.$inject;

/**
 * Current displayed data
 * @type {Object}
 */
InstrumentShowController.prototype.data = null;

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentShowController', InstrumentShowController);

// File : src/app/Instrument/Directive/InstrumentMenuDirective.js
/**
 * Instrument menu
 * Used to select the current instrument, and if relevant the tuning (e.g. for Guitar or Bass)
 */
var InstrumentMenuDirective = function InstrumentMenuDirective($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Instrument/menu.html', 'Instrument'),
        replace: true
    };
};

// Set up dependency injection
InstrumentMenuDirective.$inject = [ '$partial' ];

// Register directive into AngularJS
angular
    .module('Instrument')
    .directive('instrumentMenu', InstrumentMenuDirective);
// File : src/app/Instrument/Resource/InstrumentResource.js
var InstrumentResource = function InstrumentResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentResource.prototype = Object.create(ApiResource.prototype);
InstrumentResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentResource.prototype.type = 'instrument';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentResource.prototype.path = '/instruments/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentResource', InstrumentResource);

// File : src/app/Instrument/Resource/InstrumentTemplateResource.js
var InstrumentTemplateResource = function InstrumentTemplateResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentTemplateResource.prototype = Object.create(ApiResource.prototype);
InstrumentTemplateResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentTemplateResource.prototype.type = 'instrument_template';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentTemplateResource.prototype.path = '/instrument_types/{type}/templates/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentTemplateResource', InstrumentTemplateResource);

// File : src/app/Instrument/Resource/InstrumentTypeResource.js
var InstrumentTypeResource = function InstrumentTypeResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentTypeResource.prototype = Object.create(ApiResource.prototype);
InstrumentTypeResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentTypeResource.prototype.type = 'instrument_type';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentTypeResource.prototype.path = '/instrument_types/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentTypeResource', InstrumentTypeResource);

// File : src/app/Instrument/routes.js
/**
 * Instrument routes
 */
angular
    .module('Instrument')
    .config([
        'apiResourceRouteProvider',
        function InstrumentRoutes(apiResourceRouteProvider) {
            apiResourceRouteProvider.register('Instrument', 'Instrument', 'instruments', false, {
                // Add the list of InstrumentType to the NEW routes resolvers
                new: {
                    resolve: {
                        instrumentTypes: [
                            'InstrumentTypeResource',
                            function instrumentTypesResolver(InstrumentTypeResource) {
                                return InstrumentTypeResource.query();
                            }
                        ]
                    }
                }
            });
        }
    ]);
// File : src/app/Instrument/translations.js
/**
 * Instrument translations
 * @type {Object}
 */
var instrumentTranslations = {};

/**
 * Language = EN
 */
instrumentTranslations['en'] = {
    // C
    create_choose_template : 'Choose a preconfigured model (optional)',
    create_choose_type     : 'Choose the type of the Instrument you want to create',
    create_fill_info       : 'Fill information',

    // D
    delete_instrument      : 'Delete instrument',

    // E
    edit_instrument        : 'Edit instrument',

    // I
    instrument             : 'instrument{COUNT, plural, =0{} one{} other{s}}',

    // M
    my_instruments_title   : 'My instruments',

    // N
    new_instrument         : 'Add a new instrument',
    no_instrument_found    : 'No instrument found.',

    // S
    show_instrument        : 'Show instrument'
};

/**
 * Language = FR
 */
instrumentTranslations['fr'] = {
    // C
    create_choose_template : 'Choisir un modèle (optionnel)',
    create_choose_type     : 'Choisir le type d\'instrument à créer',
    create_fill_info       : 'Saisir les informations à propos de l\'instrument',

    // D
    delete_instrument      : 'Supprimer l\'instrument',

    // E
    edit_instrument        : 'Modifier l\'instrument',

    // I
    instrument             : 'instrument{COUNT, plural, =0{} one{} other{s}}',

    // M
    my_instruments_title   : 'Mes instruments',

    // N
    new_instrument         : 'Ajouter un instrument',
    no_instrument_found    : 'Aucun instrument trouvé.',

    // S
    show_instrument        : 'Voir l\'instrument'
};
// File : src/app/Lesson/Controller/LessonFormController.js
/**
 * Form controller for Lessons
 * @constructor
 */
var LessonFormController = function LessonFormController(resource, LessonResource) {
    FormController.apply(this, arguments);
};

// Extends FormController
LessonFormController.prototype             = Object.create(FormController.prototype);
LessonFormController.prototype.constructor = LessonFormController;

// Set up dependency injection
LessonFormController.$inject = [ 'resource', 'LessonResource' ];

/**
 * Name of the current view
 * @type {string}
 */
LessonFormController.prototype.view = 'info';

/**
 * Switch the current view
 * @param {string} newView
 */
LessonFormController.prototype.changeView = function changeView(newView) {
    if (-1 !== [ 'info', 'section', 'summary'].indexOf(newView)) {
        this.view = newView;
    }
};

/**
 * Add a new Section to the Lesson
 */
LessonFormController.prototype.addSection = function addSection() {
    // Initialize new sections array if not exist
    if (typeof this.resource.sections === 'undefined') {
        this.resource.sections = [];
    }

    this.resource.sections.push({
        name: 'Title of the Section'
    });
};

// Register controller into Angular JS
angular
    .module('Lesson')
    .controller('LessonFormController', LessonFormController);

// File : src/app/Lesson/Controller/LessonListController.js
/**
 * List controller for Lessons
 * @constructor
 */
var LessonListController = function LessonListController($uibModal, resources) {
    ListController.apply(this, arguments);
};

// Extends ListController
LessonListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
LessonListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
LessonListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
LessonListController.prototype.sortFields = {
    name    : 'string'
};

// Register controller into angular
angular
    .module('Lesson')
    .controller('LessonListController', LessonListController);

// File : src/app/Lesson/Resource/LessonResource.js
/**
 * Resource : Lesson
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var LessonResource = function LessonResource($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
LessonResource.prototype = Object.create(ApiResource.prototype);
LessonResource.prototype.constructor = LessonResource;

// Set up dependency injection
LessonResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
LessonResource.prototype.type = 'lesson';

/**
 * Path of the API resource
 * @type {string}
 */
LessonResource.prototype.path = '/lessons/{id}';

// Register service into Angular JS
angular
    .module('Lesson')
    .service('LessonResource', LessonResource);

// File : src/app/Lesson/routes.js
/**
 * Lesson routes
 */
angular
    .module('Lesson')
    .config([
        'apiResourceRouteProvider',
        function LessonRoutes(apiResourceRouteProvider) {
            apiResourceRouteProvider.register('Lesson', 'Lesson', 'lessons', false);
        }
    ]);
// File : src/app/Lesson/translations.js
/**
 * Lesson translations
 * @type {Object}
 */
var lessonTranslations = {};

/**
 * Language = EN
 */
lessonTranslations['en'] = {
    // D
    delete_lesson   : 'Delete lesson',

    // E
    edit_lesson     : 'Edit lesson',

    // M
    lesson_title    : 'Lessons',

    // N
    new_lesson      : 'Add a new lesson',
    no_lesson_found : 'No lesson found.',

    // S
    lesson_song     : 'Show lesson',
    lesson          : 'lesson{COUNT, plural, =0{} one{} other{s}}'
};



/**
 * Language = FR
 */
lessonTranslations['fr'] = {
    // D
    delete_lesson   : 'Supprimer le cours',

    // E
    edit_lesson     : 'Modifier le cours',

    // M
    lesson_title    : 'Cours',

    // N
    new_lesson      : 'Ajouter un cours',
    no_lesson_found : 'Aucun cours trouvé.',

    // S
    show_lesson     : 'Voir le cours',
    lesson          : 'cours{COUNT, plural, =0{} one{} other{}}'
};
// File : src/app/SheetMusic/Controller/SheetMusicController.js
/**
 * Controller constructor
 * @constructor
 */
var SheetMusicController = function SheetMusicControllerConstructor() {

};

SheetMusicController.$inject = [];

/**
 * Sheet music file to display
 * @type {string}
 */
SheetMusicController.prototype.file = null;

/**
 * The alphaTab object
 * @type {Object}
 */
SheetMusicController.prototype.component = {};

/**
 * Information about the playback player
 * @type {Object}
 */
SheetMusicController.prototype.player = {
    /**
     * Is the player ready ?
     * @type {boolean}
     */
    ready: false,

    /**
     * State of the player
     *     0 = stopped
     *     1 = playing
     *     2 = paused
     * @type {integer}
     */
    state: 0,

    /**
     * The alphaTab player object
     * @type {object}
     */
    component: {}
};

/**
 * Start playback
 */
SheetMusicController.prototype.play = function play() {
    this.player.component.Play();
};

/**
 * Pause playback
 */
SheetMusicController.prototype.pause = function pause() {
    this.player.component.Pause();
};

/**
 * Jump to previous bar
 */
SheetMusicController.prototype.previousBar = function previousBar() {

};

/**
 * Jump to next bar
 */
SheetMusicController.prototype.nextBar = function nextBar() {

};

// Inject the controller into angular
angular
    .module('SheetMusic')
    .controller('SheetMusicController', SheetMusicController);

// File : src/app/SheetMusic/Directive/ChordSheetDirective.js
/**
 * Display Chord score
 */
var ChordSheetDirective = function ChordSheetDirectiveConstructor($timeout) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="chordTab"></div>',
        scope: {
            /**
             * Root note of the Chord
             */
            root: '=',

            /**
             * Chord definition
             */
            chord: '='
        },
        link: function chordSheetLink(scope, element, attrs) {
            $timeout(function () {
                var dataTex = ':1 (3.4 3.5)';

                var $alphaTab = $(element);

                $alphaTab.alphaTab({
                    staves: [ 'score', 'tab' ],
                    layout: {
                        mode: 'horizontal',
                        additionalSettings: {
                            hideInfo: true,
                            hideBarCount: true
                        }
                    }
                });

                $alphaTab.alphaTab('tex', dataTex);
            }, 0);
        }
    };
};

// Set up dependency injection
ChordSheetDirective.$inject = [ '$timeout' ];

// Inject directive into AngularJS
angular
    .module('SheetMusic')
    .directive('chordSheet', ChordSheetDirective);
// File : src/app/SheetMusic/Directive/SheetMusicDirective.js
(function () {
    'use strict';

    angular.module('SheetMusic')
        .directive('sheetMusic', [
            '$timeout',
            '$partial',
            function ($timeout, $partial) {
                return {
                    restrict: 'E',
                    templateUrl: $partial.getPath('sheet-music.html', 'SheetMusic'),
                    replace: true,
                    scope: {
                        file: '@'
                    },
                    bindToController: true,
                    controller:   'SheetMusicController',
                    controllerAs: 'sheetMusicCtrl',
                    link: function (scope, element, attrs, sheetMusicCtrl) {
                        // Store alphaTab object into the Controller
                        sheetMusicCtrl.component = $('.alphaTab');

                        var $element = $(element);

                        // Set size of the player navbar
                        var sheetPosition = $element.offset();
                        var sheetWidth = $element.width();
                        var navbar = $element.find('.sheet-music-controls');

                        // Set navbar position and size
                        navbar.offset({ left: sheetPosition.left });
                        navbar.width(sheetWidth);

                        // Initialize alphaTab
                        $timeout(function () {
                            //
                            // 1. Load alphaTab
                            sheetMusicCtrl.component.alphaTab();

                            //
                            // 2. Initialize Player and Setup Player UI
                            /*sheetMusicCtrl.player.component = sheetMusicCtrl.component.alphaTab('playerInit', {
                                asRoot        : assetDirectory + '/musictoolssongbook/libraries/alphaTab/Samples/JavaScript/lib/alphaSynth/',
                                swfObjectRoot : assetDirectory + '/musictoolssongbook/libraries/alphaTab/Samples/JavaScript/lib/alphaSynth/'
                            }); // init alphaSynth

                            //
                            // 3. Bind events
                            sheetMusicCtrl.player.component.On('ready', function(r) {
                                // load default data
                                sheetMusicCtrl.player.component.LoadSoundFontUrl(assetDirectory + '/musictoolssongbook/libraries/alphaTab/Samples/JavaScript/lib/alphaSynth/default.sf2');
                            });*/

                            /*sheetMusicCtrl.player.component.On('soundFontLoad', function(loaded, full) {
                                var percentage = ((loaded / full) * 100)|0;
                                $('#sfInfo .progress').text('(' + percentage + '%)');
                            });

                            sheetMusicCtrl.player.component.On('soundFontLoaded', function() {
                                $('#sfInfo').hide();
                            });

                            sheetMusicCtrl.player.component.On('readyForPlay', function(r) {
                                *//*sheetMusicCtrl.player.ready = r;*//*
                                updateControls();

                                scope.$apply();
                            });

                            sheetMusicCtrl.player.component.On('playerStateChanged', function(s) {
                                sheetMusicCtrl.player.state = s;
                                updateControls();

                                scope.$apply();
                            });

                            //
                            // 3. Add cursors (optional)
                            sheetMusicCtrl.component.alphaTab('playerCursor');*/
                            // sheetMusicCtrl.component.alphaTab('drop'); // drag and drop
                        }, 300);

                        function updateControls() {
                            if(!sheetMusicCtrl.player.ready) {
                                $('#loadingInfo').show()
                            }
                            else {
                                $('#loadingInfo').hide()
                            }
                        }
                    }
                };
            }
        ]);
})();
// File : src/app/SongBook/Controller/SongFormController.js
/**
 * Form controller for Songs
 * @constructor
 */
var SongFormController = function SongFormController(resource, SongResource, Upload) {
    FormController.apply(this, arguments);

    this.upload = Upload;
};

// Extends FormController
SongFormController.prototype             = Object.create(FormController.prototype);
SongFormController.prototype.constructor = SongFormController;

// Set up dependency injection
SongFormController.$inject = [ 'resource', 'SongResource', 'Upload' ];

SongFormController.prototype.selectCover = function selectCover(file) {
    if (!this.resource.cover) {
        this.resource.cover = {};
    }

    // Convert file to Base 64
    this.upload.base64DataUrl(file).then(function (url) {
        this.resource.cover.file = url;
    }.bind(this));
};

SongFormController.prototype.removeCover = function removeCover() {
    this.resource.cover = null;
};

// Register controller into Angular JS
angular
    .module('SongBook')
    .controller('SongFormController', SongFormController);

// File : src/app/SongBook/Controller/SongListController.js
/**
 * List controller for Songs
 * @constructor
 */
var SongListController = function SongListController($uibModal, resources) {
    ListController.apply(this, arguments);
};

// Extends ListController
SongListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
SongListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
SongListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
SongListController.prototype.sortFields = {
    name    : 'string',
    artist  : 'string',
    rating  : 'number',
    mastery : 'number'
};

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongListController', SongListController);

// File : src/app/SongBook/Controller/SongShowController.js
/**
 * Show controller for Songs
 * @constructor
 */
var SongShowController = function SongShowController(resource) {
    ShowController.apply(this, arguments);
};

// Extends ShowController
SongShowController.prototype = Object.create(ShowController.prototype);
SongShowController.$inject = ShowController.$inject;

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongShowController', SongShowController);

// File : src/app/SongBook/Resource/SongResource.js
var SongResource = function SongResourceConstructor() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
SongResource.prototype = Object.create(ApiResource.prototype);
SongResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
SongResource.prototype.type = 'song';

/**
 * Path of the API resource
 * @type {string}
 */
SongResource.prototype.path = '/songs/{id}';

// Register service into Angular JS
angular
    .module('SongBook')
    .service('SongResource', SongResource);

// File : src/app/SongBook/routes.js
/**
 * SongBook routes
 */
angular
    .module('SongBook')
    .config([
        'apiResourceRouteProvider',
        function SongBookRoutes(apiResourceRouteProvider) {
            apiResourceRouteProvider.register('SongBook', 'Song', 'songs');
        }
    ]);
// File : src/app/SongBook/translations.js
/**
 * SongBook translations
 * @type {Object}
 */
var songBookTranslations = {};

/**
 * Language = EN
 */
songBookTranslations['en'] = {
    // D
    delete_song       : 'Delete song',

    // E
    edit_song         : 'Edit song',

    // M
    my_songbook_title : 'My Songbook',

    // N
    new_song          : 'Add a new song',
    no_song_found     : 'No song found.',

    // S
    show_song         : 'Show song',
    song              : 'song{COUNT, plural, =0{} one{} other{s}}'
};



/**
 * Language = FR
 */
songBookTranslations['fr'] = {
    // D
    delete_song       : 'Supprimer le morceau',

    // E
    edit_song         : 'Modifier le morceau',

    // M
    my_songbook_title : 'Mon livre de chansons',

    // N
    new_song          : 'Ajouter une chanson',
    no_song_found     : 'Aucun morceau trouvé.',

    // S
    show_song         : 'Voir le morceau',
    song              : 'morceau{COUNT, plural, =0{} one{} other{x}}'
};
// File : src/app/Theory/Controller/Chord/ChordListController.js
/**
 * List controller for Chords
 * @constructor
 */
var ChordListController = function ChordListControllerConstructor($uibModal, entities) {
    ListController.apply(this, arguments);
};

// Extends ListController
ChordListController.prototype = Object.create(ListController.prototype);

// Set up dependency injection
ChordListController.$inject = ListController.$inject;

/**
 * Default field to sort by
 * @type {string}
 */
ChordListController.prototype.sortBy = 'name';

/**
 * Usable fields for sort
 * @type {Object}
 */
ChordListController.prototype.sortFields = {
    name        : 'string',
    notes_count : 'string'
};

/**
 * Current root for Chord display
 * @type {Object}
 */
ChordListController.prototype.root = null;

// Register controller into angular
angular
    .module('Theory')
    .controller('ChordListController', ChordListController);

// File : src/app/Theory/Controller/Chord/ChordShowController.js
/**
 * Show controller for Songs
 * @constructor
 */
var ChordShowController = function ChordShowControllerConstructor(resource, notes) {
    ShowController.apply(this, arguments);

    this.notes = notes;
};

// Extends ShowController
ChordShowController.prototype = Object.create(ShowController.prototype);

// Set up dependency injection
ChordShowController.$inject = ShowController.$inject;

// Register controller into angular
angular
    .module('Theory')
    .controller('ChordShowController', ChordShowController);

// File : src/app/Theory/Controller/DegreeListController.js
/**
 * List controller for Degrees
 * @constructor
 */
var DegreeListController = function DegreeListControllerConstructor($uibModal, resources) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.resources = resources;
};

// Set up dependency injection
DegreeListController.$inject = ['$uibModal', 'resources'];

/**
 * List of entities
 * @type {Array}
 */
DegreeListController.prototype.resources = [];

// Register controller into angular
angular
    .module('Theory')
    .controller('DegreeListController', DegreeListController);

// File : src/app/Theory/Controller/IntervalListController.js
/**
 * List controller for Intervals
 * @constructor
 */
var IntervalListController = function IntervalListControllerConstructor($uibModal, resources) {
    this.services = {};
    this.services['$uibModal'] = $uibModal;

    this.resources = resources;
};

// Set up dependency injection
IntervalListController.$inject = ['$uibModal', 'resources'];

/**
 * List of entities
 * @type {Array}
 */
IntervalListController.prototype.resources = [];

/**
 * Interval loaded in the player
 * @type {object}
 */
IntervalListController.prototype.selected = null;

IntervalListController.prototype.selectInterval = function selectInterval(interval) {
    if (this.selected !== interval) {
        // Select interval
        this.selected = interval;
    } else {
        // Unselect interval
        this.selected = null;
    }
};

// Register controller into angular
angular
    .module('Theory')
    .controller('IntervalListController', IntervalListController);

// File : src/app/Theory/Controller/Note/NoteListController.js
/**
 * List controller for Notes
 * @constructor
 */
var NoteListController = function NoteListControllerConstructor($uibModal, resources) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.resources = resources;
};

// Set up dependency injection
NoteListController.$inject = ['$uibModal', 'resources'];

/**
 * List of resources
 * @type {Array}
 */
NoteListController.prototype.resources = [];

// Register controller into angular
angular
    .module('Theory')
    .controller('NoteListController', NoteListController);

// File : src/app/Theory/Controller/Note/NoteMenuController.js
/**
 * Menu controller for Notes
 * @constructor
 */
var NoteMenuController = function NoteMenuControllerConstructor(NoteResource) {
    this.notes = NoteResource.query().then(function (result) {
        this.notes = result;
        if (!this.current) {
            this.current = result[0];
        }
    }.bind(this));
};

// Set up dependency injection
NoteMenuController.$inject = [ 'NoteResource' ];

/**
 * List of notes
 * @type {Array}
 */
NoteMenuController.prototype.notes = [];

/**
 * Current note
 * @type {Object}
 */
NoteMenuController.prototype.current = null;

NoteMenuController.prototype.previous = function previous() {
    var pos = this.notes.indexOf(this.current);
    if (-1 !== pos && this.notes[pos - 1]) {
        this.current = this.notes[pos - 1];
    }
};

NoteMenuController.prototype.next = function next() {
    var pos = this.notes.indexOf(this.current);
    if (-1 !== pos && this.notes[pos + 1]) {
        this.current = this.notes[pos + 1];
    }
};

// Register controller into angular
angular
    .module('Theory')
    .controller('NoteMenuController', NoteMenuController);

// File : src/app/Theory/Controller/ScaleListController.js
/**
 * List controller for Scales
 * @constructor
 */
var ScaleListController = function ScaleListControllerConstructor($uibModal, resources) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;

    this.resources = resources;
};

// Set up dependency injection
ScaleListController.$inject = ['$uibModal', 'resources'];

/**
 * List of entities
 * @type {Array}
 */
ScaleListController.prototype.resources = [];

// Register controller into angular
angular
    .module('Theory')
    .controller('ScaleListController', ScaleListController);

// File : src/app/Theory/Directive/Interval/IntervalPlayerDirective.js
/**
 * Interval player directive
 * @returns {Object}
 * @constructor
 */
var IntervalPlayerDirective = function IntervalPlayerDirective($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Interval/player.html', 'Theory'),
        replace: true,
        scope: {
            interval    : '='
        },
        bindToController: true,
        controllerAs: 'intervalPlayerCtrl',
        controller: [
            '$scope',
            'SoundService',
            'IntervalResource',
            'NoteResource',
            function IntervalPlayerController($scope, SoundService, IntervalResource, NoteResource) {
                this.notes     = NoteResource.query().then(function (result) {
                    this.notes = result;
                    this.referenceNote = result[57];

                    return result;
                }.bind(this));

                this.intervals = IntervalResource.query().then(function (result) {
                    this.intervals = result;
                }.bind(this));

                /**
                 * Tempo
                 * @type {number}
                 */
                this.tempo = 70;

                /**
                 * Reference note
                 * @type {Object}
                 */
                this.referenceNote = null;

                /**
                 * Reference Note + nb semitones of the current interval
                 * @type {Object}
                 */
                this.calculatedNote = null;

                /**
                 * Direction of the interval (ascending or descending)
                 * @type {string}
                 */
                this.direction = 'ascending';

                /**
                 * Set direction of the Interval
                 * @param {String} direction
                 */
                this.setDirection = function setDirection(direction) {
                    if (direction !== this.direction) {
                        if ('ascending' === direction || 'descending' === direction) {
                            this.direction = direction;
                        } else {
                            // Invalid direction
                            console.error('Invalid interval direction. It can only be "ascending" or "descending".');
                        }
                    }
                };

                /**
                 * Set current interval
                 * @param {Object} interval
                 */
                this.setInterval = function setInterval(interval) {
                    this.interval = interval;
                };

                this.calculateNote = function calculateNote() {
                    if (this.interval && this.direction && this.referenceNote) {

                        if ('ascending' === this.direction) {
                            var newNoteValue = this.referenceNote.attributes.value + this.interval.attributes.value;
                        } else {
                            var newNoteValue = this.referenceNote.attributes.value - this.interval.attributes.value;
                        }

                        this.calculatedNote = this.notes[newNoteValue];
                    }
                };

                this.incrementReference = function incrementReference() {
                    var newNoteValue = this.referenceNote.attributes.value + 1;

                    this.referenceNote = this.notes[newNoteValue];
                };

                this.decrementReference = function incrementReference() {
                    var newNoteValue = this.referenceNote.attributes.value - 1;

                    this.referenceNote = this.notes[newNoteValue];
                };

                /**
                 * Play interval
                 */
                this.playInterval = function playInterval() {
                    SoundService.playFrequency(this.referenceNote.attributes.frequency,  0, 1);
                    SoundService.playFrequency(this.calculatedNote.attributes.frequency, 1, 1);
                };

                // Watch changes of the interval
                $scope.$watch(
                    function intervalWatch() {
                        return this.interval;
                    }.bind(this), this.calculateNote.bind(this)
                );

                // Watch changes of the direction
                $scope.$watch(
                    function directionWatch() {
                        return this.direction;
                    }.bind(this), this.calculateNote.bind(this)
                );

                // Watch changes of the reference note
                $scope.$watch(
                    function referenceWatch() {
                        return this.referenceNote;
                    }.bind(this), this.calculateNote.bind(this)
                );
            }
        ],
        compile: function compile() {
            return {
                pre: function preLink(scope, element, attrs, intervalPlayerCtrl) {
                    intervalPlayerCtrl.dropdownOptions = {
                        setHeight: (element.height() - 70) + 'px'
                    };
                }
            }
        }
    };
};

// Set up dependency injection
IntervalPlayerDirective.$inject = [ '$partial' ];

// Register directive into angular
angular
    .module('Theory')
    .directive('intervalPlayer', IntervalPlayerDirective);
// File : src/app/Theory/Directive/Note/NoteDisplaySwitchDirective.js
/**
 * Note display switch directive
 * @returns {Object}
 * @constructor
 */
var NoteDisplaySwitchDirective = function NoteDisplaySwitchDirective() {
    return {
        restrict: 'A',
        controller: [
            'NoteResource',
            function NoteDisplaySwitchController(NoteResource) {
                this.displayFlat = NoteResource.isDisplayFlat();

                this.switchDisplay = function switchDisplay() {
                    this.displayFlat = !this.displayFlat;
                    NoteResource.setDisplayFlat(this.displayFlat);
                }
            }
        ],
        controllerAs: 'noteDisplaySwitchCtrl',
        bindToController: true,
        link: function (scope, element, attrs) {

        }
    };
};

// Set up dependency injection
NoteDisplaySwitchDirective.$inject = [];

// Register directive into angular
angular
    .module('Theory')
    .directive('noteDisplaySwitch', NoteDisplaySwitchDirective);
// File : src/app/Theory/Directive/Note/NoteMenuDirective.js
/**
 * Note menu directive
 * @param   {NoteResource} NoteResource
 * @returns {Object}
 * @constructor
 */
var NoteMenuDirective = function NoteMenuDirectiveConstructor($partial) {
    return {
        restrict: 'E',
        templateUrl: $partial.getPath('Note/menu.html', 'Theory'),
        replace: true,
        scope: {
            /**
             * Current selected note
             */
            current: '='
        },
        controller: 'NoteMenuController',
        controllerAs: 'noteMenuCtrl',
        bindToController: true
    };
};

// Set up dependency injection
NoteMenuDirective.$inject = [ '$partial' ];

// Register directive into Angular JS
angular
    .module('Theory')
    .directive('noteMenu', NoteMenuDirective);
// File : src/app/Theory/Directive/Scale/ScaleRepresentationDirective.js
angular
    .module('Theory')
    .directive('scaleRepresentation', [
        '$partial',
        'NoteResource',
        function ScaleRepresentationDirective($partial, NoteResource) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('Scale/representation.html', 'Theory'),
                replace: true,
                scope: {

                },
                controller: function NoteSelectorController() {},
                controllerAs: 'noteSelectorCtrl',
                bindToController: true,
                link: function (scope, element, attrs) {
                    scope.notes = NoteResource.query();

                    var canvas = element.find('canvas').get(0);
                    var $canvas = $(canvas);

                    canvas.width  = $canvas.parent().width();
                    canvas.height = $canvas.parent().width();

                    var context = canvas.getContext('2d');
                    var centerX = canvas.width / 2;
                    var centerY = canvas.height / 2;
                    var radius = Math.round((canvas.width / 8) * 3);

                    context.beginPath();
                    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

                    context.lineWidth = 40;
                    context.strokeStyle = 'rgba(0, 0, 0, 0.25)';
                    context.stroke();

                    // Draw Notes
                    var angleStep = (360 / notes.length) * (2.0 * Math.PI) / 360.0;
                    var angle = - Math.PI / 2;
                    for (var i = 0; i < notes.length; i++) {
                        if (notes[i].accidental) {
                            drawAlteration(angle, notes[i]);
                        } else {
                            drawNote(angle, notes[i])
                        }

                        angle += angleStep;
                    }

                    function drawAlteration(angle, note)
                    {
                        var startX = centerX + (radius - 30) * Math.cos(angle);
                        var startY = centerY + (radius - 30) * Math.sin(angle);

                        var endX = centerX + (radius + 30) * Math.cos(angle);
                        var endY = centerY + (radius + 30) * Math.sin(angle);

                        context.beginPath();
                        context.moveTo(startX, startY);
                        context.lineTo(endX, endY);

                        context.lineWidth = 2;
                        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

                        context.stroke();

                        context.beginPath();
                        context.font="bold 12pt Calibri";
                        context.fillText(notes[i].info.name, endX,endY);
                    }

                    function drawNote(angle, note)
                    {
                        var startX = centerX + (radius - 30) * Math.cos(angle);
                        var startY = centerY + (radius - 30) * Math.sin(angle);

                        var endX = centerX + (radius + 30) * Math.cos(angle);
                        var endY = centerY + (radius + 30) * Math.sin(angle);

                        context.beginPath();
                        context.moveTo(startX, startY);
                        context.lineTo(endX, endY);

                        context.lineWidth = 5;
                        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

                        context.stroke();

                        context.beginPath();
                        context.font="bold 12pt Calibri";
                        context.fillText(notes[i].info.name, endX,endY);
                    }

                    function drawInterval()
                    {

                    }
                }
            };
        }
    ]);
// File : src/app/Theory/Filter/NoteNameFilter.js
/**
 * Note Name filter
 */
angular
    .module('Theory')
    .filter('note_name', [
        'NoteResource',
        function NoteNameFilter(NoteResource) {
            return function getName(note) {
                var name = null;
                if (note) {
                    if (NoteResource.displayFlat) {
                        // Display flat name
                        name = note.attributes.flat_name;
                    } else {
                        // Display sharp name
                        name = note.attributes.sharp_name;
                    }
                }

                return name;
            };
        }
    ]);
// File : src/app/Theory/Resource/ChordResource.js
/**
 * Resource : Chord
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var ChordResource = function ChordResourceConstructor($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
ChordResource.prototype = Object.create(ApiResource.prototype);
ChordResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
ChordResource.prototype.type = 'chord';

/**
 * Path of the API resource
 * @type {string}
 */
ChordResource.prototype.path = '/chords/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('ChordResource', ChordResource);

// File : src/app/Theory/Resource/DegreeResource.js
/**
 * Resource : Degree
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var DegreeResource = function DegreeResourceConstructor($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
DegreeResource.prototype = Object.create(ApiResource.prototype);
DegreeResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
DegreeResource.prototype.type = 'degree';

/**
 * Path of the API resource
 * @type {string}
 */
DegreeResource.prototype.path = '/degrees/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('DegreeResource', DegreeResource);

// File : src/app/Theory/Resource/IntervalResource.js
/**
 * Resource : Interval
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var IntervalResource = function IntervalResourceConstructor($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
IntervalResource.prototype = Object.create(ApiResource.prototype);
IntervalResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
IntervalResource.prototype.type = 'interval';

/**
 * Path of the API resource
 * @type {string}
 */
IntervalResource.prototype.path = '/intervals/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('IntervalResource', IntervalResource);

// File : src/app/Theory/Resource/NoteResource.js
/**
 * Resource : Note
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var NoteResource = function NoteResourceConstructor($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
NoteResource.prototype = Object.create(ApiResource.prototype);
NoteResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
NoteResource.prototype.type = 'note';

/**
 * Path of the API resource
 * @type {string}
 */
NoteResource.prototype.path = '/notes/{id}';

/**
 * Display alteration with flat instead of sharp
 * @type {boolean}
 */
NoteResource.prototype.displayFlat = false;

/**
 * Is the displayed name of the Note is flat (true) or sharp (false)
 * @returns {boolean}
 */
NoteResource.prototype.isDisplayFlat = function isDisplayFlat() {
    return this.displayFlat;
};

/**
 * Change the way the Note names are displayed
 * @param   {boolean} newValue
 */
NoteResource.prototype.setDisplayFlat = function setDisplayFlat(newValue) {
    if (newValue !== this.displayFlat) {
        this.displayFlat = newValue;
    }
};

// Register service into Angular JS
angular
    .module('Theory')
    .service('NoteResource', NoteResource);

// File : src/app/Theory/Resource/ScaleResource.js
/**
 * Resource : Scale
 *
 * @param $http
 * @param $q
 * @param ApiService
 * @constructor
 */
var ScaleResource = function ScaleResourceConstructor($http, $q, ApiService) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
ScaleResource.prototype = Object.create(ApiResource.prototype);
ScaleResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
ScaleResource.prototype.type = 'scale';

/**
 * Path of the API resource
 * @type {string}
 */
ScaleResource.prototype.path = '/scales/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('ScaleResource', ScaleResource);

// File : src/app/Theory/routes.js
/**
 * Theory routes
 */
angular
    .module('Theory')
    .config([
        '$routeProvider',
        '$partialProvider',
        'apiResourceRouteProvider',
        function TheoryRoutes($routeProvider, $partialProvider, apiResourceRouteProvider) {
            // Theory summary
            $routeProvider.when('/theory', {
                templateUrl: $partialProvider.getPath('summary.html', 'Theory')
            });

            apiResourceRouteProvider.register('Theory', 'Note',     'theory/notes',     true);
            apiResourceRouteProvider.register('Theory', 'Degree',   'theory/degrees',   true);
            apiResourceRouteProvider.register('Theory', 'Interval', 'theory/intervals', true);
            apiResourceRouteProvider.register('Theory', 'Chord',    'theory/chords',    true);
            apiResourceRouteProvider.register('Theory', 'Scale',    'theory/scales',    true);
        }
    ]);
// File : src/app/Theory/translations.js
/**
 * Theory translations
 * @type {Object}
 */
var theoryTranslations = {};

/**
 * Language = EN
 */
theoryTranslations['en'] = {
    // C
    chord               : 'chord{COUNT, plural, =0{} one{} other{s}}',
    chord_count         : '{ COUNT } chord{COUNT, plural, =0{} one{} other{s}}',

    // I
    interval_ascending  : 'Ascending interval',
    interval_descending : 'Descending interval',
    interval_play       : 'Play interval',
    interval_select     : 'select an interval',

    // N
    note_count          : '{ COUNT } note{COUNT, plural, =0{} one{} other{s}}',

    // S
    semitone_count      : '{ COUNT } semitone{COUNT, plural, =0{} one{} other{s}}'
};



/**
 * Language = FR
 */
theoryTranslations['fr'] = {
    // C
    chord               : 'accord{COUNT, plural, =0{} one{} other{s}}',
    chord_count         : '{ COUNT } accord{COUNT, plural, =0{} one{} other{s}}',

    // I
    interval_ascending  : 'Intervalle ascendant',
    interval_descending : 'Intervalle descendant',
    interval_play       : 'Jouer l\'intervalle',
    interval_select     : 'sélectionner un intervalle',

    // N
    note_count          : '{ COUNT } note{COUNT, plural, =0{} one{} other{s}}',

    // S
    semitone_count      : '{ COUNT } demi-ton{COUNT, plural, =0{} one{} other{s}}'
};
// File : src/app/Tuning/tuning-widget.js
(function () {
    'use strict';

    angular
        .module('GuitarTuning', [])
        .directive('tuningEdit', [
            function () {
                return {
                    restrict: 'E',
                    templateUrl: '',
                    replace: true,
                    scope: {
                        headstock: '=',
                        strings: '='
                    }
                };
            }
        ]);
})();
// File : src/app/User/Controller/ProfileController.js
/**
 *
 * @constructor
 */
var ProfileController = function ProfileControllerContructor() {

};

// Register controller into angular
angular.module('User').controller('ProfileController', [ ProfileController ]);

// File : src/app/User/Controller/SettingsController.js
/**
 *
 * @constructor
 */
var SettingsController = function SettingsControllerContructor() {

};

// Register controller into angular
angular.module('User').controller('SettingsController', [ SettingsController ]);

// File : src/app/User/Directive/MenuDirective.js
/**
 * User menu
 */
angular
    .module('User')
    .directive('userMenu', [
        '$partial',
        function ($partial) {
            return {
                restrict: 'E',
                templateUrl: $partial.getPath('menu.html', 'User'),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : src/app/User/routes.js
/**
 * User routes
 */
angular.module('User').config([
    '$routeProvider',
    '$partialProvider',
    function UserRoutes($routeProvider, $partialProvider) {
        // Users list
        $routeProvider
            .when('/users', {
                templateUrl:  $partialProvider.getPath('list.html', 'User'),
                controller:   'ListViewController',
                controllerAs: 'listViewCtrl'
            });

        // Current User profile
        $routeProvider
            .when('/profile', {
                templateUrl:  $partialProvider.getPath('profile.html', 'User'),
                controller:   'ProfileController',
                controllerAs: 'profileCtrl'
            });

        // Current User settings
        $routeProvider
            .when('/profile/settings', {
                templateUrl:  $partialProvider.getPath('settings.html', 'User'),
                controller:   'SettingsController',
                controllerAs: 'settingsCtrl'
            });
    }
]);
// File : src/app/routes.js
/**
 * Application routes
 * Defines all routes for the Application
 */
angular
    .module('App')
    .config([
        '$routeProvider',
        '$partialProvider',
        function AppConfig($routeProvider, $partialProvider) {
            $routeProvider
                // Page not found
                .when('/page_not_found', {
                    templateUrl: $partialProvider.getPath('Error/page_not_found.html', 'Layout', true)
                })

                // Default Server 5xx errors
                .when('/error_server', {
                    templateUrl: $partialProvider.getPath('Error/server.html', 'Layout', true)
                })

                // Redirect to Page not found
                .otherwise({
                    redirectTo: '/page_not_found'
                })
        }
    ]);
// File : src/app/translations.js
/**
 * Application translations
 * @type {Object}
 */
var appTranslations = {};

/**
 * Language = EN
 */
appTranslations['en'] = {
    'link.instrument':    'my instruments',
    'link.song_book':     'my songbook',
    'link.theory':        'theory',
    'link.musician':      'musicians',
    'link.advertisement': 'advertisement',
    'link.game':          'games',
    'link.forum':         'forum',
    'link.lesson':        'lessons'
};

/**
 * Language = FR
 */
appTranslations['fr'] = {
    'link.instrument':    'mes instruments',
    'link.song_book':     'my songbook',
    'link.theory':        'théorie',
    'link.musician':      'musiciens',
    'link.advertisement': 'annonces',
    'link.game':          'jeux',
    'link.forum':         'forum',
    'link.lesson':        'cours'
};
})();