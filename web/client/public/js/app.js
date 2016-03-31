(function() {
"use strict";
/* File : src/core/Alert/module.js */ 
/**
 * Alert Module
 * Manages User messages
 */
angular.module('Alert', []);
/* File : src/core/Api/module.js */ 
/**
 * Api Module
 * Manages communication with a REST API server following the JSON API specification
 */
angular
    .module('Api', [
        'Client'
    ])
    .config([
        '$httpProvider',
        function configure($httpProvider) {
            // Register API Error interceptor
            // Set up Http Error interceptor to catch server error response
            $httpProvider.interceptors.push('ApiErrorService');
        }
    ]);
/* File : src/core/Client/module.js */ 
/**
 * Client Module
 */
angular.module('Client', []);
/* File : src/core/Confirm/module.js */ 
/**
 * Confirm Module
 */
angular.module('Confirm', []);
/* File : src/core/Layout/module.js */ 
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
/* File : src/core/Loader/module.js */ 
/**
 * Loader module
 * Manages visual loading progress when XHR
 */
angular
    .module('Loader', [
        'ngAnimate'
    ])
    .config([
        '$httpProvider',
        function configureLoader($httpProvider) {
            // Set up Http interceptor to catch XHR
            $httpProvider.interceptors.push('LoaderInterceptor');
        }
    ]);
/* File : src/core/Utilities/module.js */ 
/**
 * Utilities Module
 */
angular.module('Utilities', []);
/* File : src/core/core.js */ 
/**
 * Application Core
 * Manages low level application components such as API, translations, etc.
 */
angular
    // Initialize Core
    .module('AppCore', [
        // Angular modules
        'ngRoute',
        'ngAnimate',
        'ngSanitize',

        // Libraries modules
        'ngFileUpload',
        'ui.bootstrap',
        'pascalprecht.translate',

        // Configuration of the Application
        'AppConfiguration',

        // Core modules
        'Utilities',
        'Confirm',
        'Api',
        'Client',
        'Layout',
        'Alert'/*,
        'Loader'*/
    ])

    // Configure Core
    .config([
        '$apiProvider',
        'apiConfiguration',
        '$clientProvider',
        'clientConfiguration',
        '$translateProvider',
        function configure($apiProvider, apiConfiguration, $clientProvider, clientConfiguration, $translateProvider) {
            // Configure API
            $apiProvider.configure(apiConfiguration);

            // Configure Client
            $clientProvider.configure(clientConfiguration);

            // Enable pluralization for translator
            $translateProvider.addInterpolation('$translateMessageFormatInterpolation');

            // Set the default lang
            $translateProvider.preferredLanguage('en');

            // Set sanitize strategy for translations
            $translateProvider.useSanitizeValueStrategy('sanitize');
        }
    ]);
/* File : src/core/Alert/Directive/AlertsDirective.js */ 
/**
 * Alerts Directive
 * Renders user messages
 */
var AlertsDirective = function AlertsDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('alerts.html', 'core/Alert'),
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
};

// Set up dependency injection
AlertsDirective.$inject = [ '$client' ];

// Register directive into Angular JS
angular
    .module('Alert')
    .directive('alerts', AlertsDirective);
/* File : src/core/Alert/Service/AlertService.js */ 
/**
 * Alert Service
 * @constructor
 */
var AlertService = function AlertService($timeout) {
    this.$timeout = $timeout;
};

// Set up dependency injection
AlertService.$inject = [ '$timeout' ];

/**
 * List of all current active alerts
 * @param alert
 */
AlertService.prototype.alerts = [];

/**
 * Display duration for the alert which are configured to be auto-hidden
 * @type {number}
 */
AlertService.prototype.displayDuration = 5000;

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
 * @param {array}   [action]
 * @param {array}   [details]
 */
AlertService.prototype.addAlert = function addAlert(type, message, autoHide, action, details) {
    var newAlert = {
        type    : type,
        message : message,
        action  : action ? action : null,
        details : details ? details : null
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

// Register service into Angular JS
angular
    .module('Alert')
    .service('AlertService', AlertService);
/* File : src/core/Api/Controller/FormController.js */ 
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
    .module('Api')
    .controller('FormController', FormController);

/* File : src/core/Api/Controller/ListController.js */ 
/**
 * Base List controller
 * @constructor
 */
var ListController = function ListController($uibModal, $client, resources) {
    this.services = {};

    this.services['$uibModal'] = $uibModal;
    this.services['$client']   = $client;

    this.resources = resources;
};

// Set up dependency injection
ListController.$inject = [ '$uibModal', '$client', 'resources' ];

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
        templateUrl : this.services.$client.getPartial('Modal/confirm.html', 'core/Layout'),
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
    .module('Api')
    .controller('ListController', ListController);

/* File : src/core/Api/Controller/ShowController.js */ 
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
    .module('Api')
    .controller('ShowController', ShowController);

/* File : src/core/Api/Directive/ApiResourceDeleteDirective.js */ 
/**
 * Created by Corum on 03/03/2016.
 */

/* File : src/core/Api/Filter/UploadPathFilter.js */ 
/**
 * Upload Path filter
 */
var UploadPathFilter = function UploadPathFilter($api) {
    return function upload_path(path) {
        return $api.getUpload(path);
    };
};

// Set up dependency injection
UploadPathFilter.$inject = [ '$api' ];

// Register filter into Angular JS
angular
    .module('Api')
    .filter('upload_path', UploadPathFilter);

/* File : src/core/Api/Provider/ApiProvider.js */ 
var ApiProvider = function ApiProvider() {
    this.$get = function Api() {
        var provider = this;

        return {
            /**
             * Allow access to the API configuration at runtime
             */
            config: {
                serverName : provider.serverName,
                basePath   : provider.basePath,
                uploadPath : provider.uploadPath
            },

            /**
             * Get API url for the path
             * @param {String} path
             */
            getUrl: function getUrl(path) {
                return provider.getUrl(path);
            },

            /**
             * Get uploaded file
             * @param {String} path
             */
            getUpload: function getUpload(path) {
                return provider.getUpload(path);
            }
        };
    };
};

// Set up dependency injection
ApiProvider.$inject = [];

/**
 * Protocol used to call the API
 * @var {String}
 */
ApiProvider.prototype.protocol = 'http:';

/**
 * Hostname of the API
 * @var {String}
 */
ApiProvider.prototype.host     = 'localhost';

/**
 * Port number
 * @var {Number}
 */
ApiProvider.prototype.port       = 80;

/**
 * Full server name (generated on provider configuration)
 * @type {String}
 */
ApiProvider.prototype.serverName = null;

/**
 * Base path from the API server root
 * @var {String}
 */
ApiProvider.prototype.basePath   = null;

/**
 * Path to uploads
 * @type {String}
 */
ApiProvider.prototype.uploadPath = null;

/**
 * Configure API
 * @param {Object} configuration
 */
ApiProvider.prototype.configure = function configure(configuration) {
    if (configuration.protocol) {
        // Override default protocol
        this.protocol = configuration.protocol.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    if (configuration.host) {
        // Override default host
        this.host = configuration.host.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    if (configuration.port) {
        // Override default port
        this.port = configuration.port;
    }

    if (configuration.basePath) {
        // Override default base path
        this.basePath = configuration.basePath.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    if (configuration.uploadPath) {
        // Override default upload path
        this.uploadPath = configuration.uploadPath.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    // Generate full server path
    this.generateServerName();
};

/**
 * Generate full path to the API server
 */
ApiProvider.prototype.generateServerName = function generateServerName() {
    var serverName = '';
    if (this.protocol) {
        serverName += this.protocol;
    }

    serverName += '//';

    if (this.host) {
        serverName += this.host;
    } else {
        console.error('$apiProvider : API host can not be empty.')
    }

    if (this.port) {
        serverName += ':' + this.port;
    }

    // Store generated name
    this.serverName = serverName;
};

/**
 * Get API url for the path
 * @param {String} path
 */
ApiProvider.prototype.getUrl = function getUrl(path) {
    if (!this.serverName) {
        // API not configured
        console.error('$apiProvider : You must configure the provider before calling `getUrl`.');
    }

    return (this.serverName + '/' + this.basePath + '/' + path.replace(/^\/+|\/+$/g, ''));
};

/**
 * Get uploaded file
 * @param {String} path
 */
ApiProvider.prototype.getUpload = function getUpload(path) {
    if (!this.serverName) {
        // API not configured
        console.error('$apiProvider : You must configure the provider before calling `getUpload`.');
    }

    return (this.serverName + '/' + this.uploadPath + '/' + path.replace(/^\/+|\/+$/g, ''));
};

// Register provider into Angular JS
angular
    .module('Api')
    .provider('$api', ApiProvider);
/* File : src/core/Api/Provider/ApiResourceRouteProvider.js */ 
/**
 * ApiResource Router
 * Registers CRUD client routes for ApiResources
 *
 * Information about naming rules :
 * - Resource MUST be suffixed with `Resource`
 * - Templates MUST be located in `MY_MODULE/Partial/MY_RESOURCE/`
 * - Templates for `list`, `show`, `new`, `edit` MUST be respectively named : `index.html`, `show.html`, `new.html`, `edit.html`
 *
 * @param {Object} $routeProvider
 * @param {Object} $clientProvider
 * @constructor
 */
var ApiResourceRouteProvider = function ApiResourceRouteProvider($routeProvider, $clientProvider) {
    this.$routeProvider  = $routeProvider;
    this.$clientProvider = $clientProvider;

    // Just return the default $route object
    this.$get = $routeProvider.$get;
};

// Set up dependency injection
ApiResourceRouteProvider.$inject = [ '$routeProvider', '$clientProvider' ];

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
    var listTemplate  = this.$clientProvider.getPartial(this.setPlaceholders(options.list.templateUrl, module, resource), 'app/' + module);
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
        var newTemplate  = this.$clientProvider.getPartial(this.setPlaceholders(options.new.templateUrl, module, resource), 'app/' + module);
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
        var editTemplate  = this.$clientProvider.getPartial(this.setPlaceholders(options.edit.templateUrl, module, resource), 'app/' + module);
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
    var showTemplate  = this.$clientProvider.getPartial(this.setPlaceholders(options.show.templateUrl, module, resource), 'app/' + module);
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
    .module('Api')
    .provider('apiResourceRoute', ApiResourceRouteProvider);

/* File : src/core/Api/Resource/ApiResource.js */ 
/**
 * Base API Resource
 * Manages API server data
 *
 * @param {Object}       $http
 * @param {Object}       $cacheFactory
 * @param {Object}       $q
 * @param {Object}       $api
 * @param {AlertService} AlertService
 * @constructor
 */
var ApiResource = function ApiResource($http, $cacheFactory, $q, $api, AlertService) {
    // Store services
    this.services['$http']         = $http;
    this.services['$cacheFactory'] = $cacheFactory;
    this.services['$q']            = $q;
    this.services['$api']          = $api;
    this.services['AlertService']  = AlertService;

    // Validate required properties
    if (null === this.type) {
        console.error('An ApiResource must have a property `type`.');
    }

    if (null === this.path) {
        console.error('An ApiResource must have a property `path`.');
    }
};

// Set up dependency injection
ApiResource.$inject = [ '$http', '$cacheFactory', '$q', '$api', 'AlertService' ];

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
 * If TRUE, the http cache will be emptied and the next query resent
 * @type {boolean}
 */
ApiResource.prototype.forceReload = false;

/**
 * Initialize an empty Resource Object
 * @returns {Object}
 */
ApiResource.prototype.init = function init() {
    return {
        id            : null,
        type          : this.type,
        attributes    : {},
        relationships : {}
    };
};

/**
 * Check if a Resource has a relationship
 * @param   {object} resource
 * @param   {string} relationshipName
 * @returns {boolean}
 */
ApiResource.prototype.hasRelationship = function hasRelationship(resource, relationshipName) {
    if (angular.isObject(resource.relationships)
        && angular.isObject(resource.relationships[relationshipName])
        && angular.isObject(resource.relationships[relationshipName].data)
        && 0 !== angular.isObject(resource.relationships[relationshipName].data.length)) {

        return true;
    }

    return false;
};

/**
 * Get a relationship of a Resource
 * @param   {object} resource
 * @param   {string} relationshipName
 * @returns {Object|null}
 */
ApiResource.prototype.getRelationship = function getRelationship(resource, relationshipName) {
    var relationship = null;
    if (this.hasRelationship(resource, relationshipName)) {
        relationship = resource.relationships[relationshipName].data;
    }

    return relationship;
};

/**
 * Add a relationship to the Resource
 * @param {Object}  resource
 * @param {String}  relationshipName
 * @param {Object}  relationshipObject
 * @param {Boolean} isCollection
 */
ApiResource.prototype.addRelationship = function addRelationship(resource, relationshipName, relationshipObject, isCollection) {
    // Initialize relationships namespace if not exist
    if (!angular.isObject(resource.relationships)) {
        resource.relationships = {};
    }

    // Initialize relationship if not exist
    if (!this.hasRelationship(resource, relationshipName)) {
        resource.relationships[relationshipName] = {
            data: isCollection ? [] : {}
        };
    }

    // Add relationship
    if (isCollection) {
        // Collection of resource objects
        resource.relationships[relationshipName].data.push(relationshipObject);
    } else {
        // Single resource object
        resource.relationships[relationshipName].data = relationshipObject;
    }
};

/**
 * Remove a relationship from the Resource
 * @param {Object} resource
 * @param {String} relationshipName
 * @param {Object} relationshipObject
 */
ApiResource.prototype.removeRelationship = function removeRelationship(resource, relationshipName, relationshipObject) {
    if (this.hasRelationship(resource, relationshipName)) {
        if (resource.relationships[relationshipName].data instanceof Array) {
            // Collection of resource objects

        } else {
            // Single resource object

        }
    }
};

/**
 * List existing resources filtered by `queryParams`
 * @param   {Object}  [queryParams] - The parameters used to filter the list of elements
 * @returns {promise}               - The list of available resources
 */
ApiResource.prototype.query = function queryResources(queryParams) {
    // Initialize promise
    var deferred = this.services.$q.defer();

    var fullPath = this.getFullPath(queryParams);

    // Build request
    var request = this.getRequest(fullPath);

    if (this.forceReload) {
        var $httpDefaultCache = this.services.$cacheFactory.get('$http');
        $httpDefaultCache.remove(fullPath);
    }

    // Call API
    this.services.$http(request).then(
        // Success callback
        function onServerSuccess(response) {
            // Set default data if empty
            var data = response.data.data ? response.data.data : [];

            this.forceReload = false;

            deferred.resolve(data);
        }.bind(this),

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
    this.services.$http(request)
        .then(
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
                // Invalid cache
                this.forceReload = true;

                // Update Resource data with server response
                angular.copy(response.data.data, resource);

                // Display message to User
                this.services['AlertService'].addAlert('success', 'Entity created', true);

                // Resolve promise
                deferred.resolve(response.data);
            }.bind(this),

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
    // Initialize promise
    var deferred = this.services.$q.defer();

    // Build request
    var request = this.getRequest(this.getFullPath(resource), 'DELETE', resource);

    // Call API
    this.services.$http(request)

        // API results
        .then(
            // Success callback
            function onServerSuccess(response) {
                this.forceReload = true;

                deferred.resolve(response);
            }.bind(this),

            // Error callback
            function onServerError(response) {
                deferred.reject(response);
            }
        );

    return deferred.promise;
};

/**
 * Build API path of the resource
 *
 * @returns {string}
 */
ApiResource.prototype.getFullPath = function buildPath(params) {
    var fullPath = this.services.$api.getUrl(this.path);

    // Extracts params from path (delimited by {})
    var matches = this.path.match(/{([^}]+)}/gi);
    if (matches) {
        // Replace params with resource values
        for (var i = 0; i < matches.length; i++) {
            var resourceProperty = matches[i].replace('{', '').replace('}', '');
            var resourceValue = '';
            if (params && params.hasOwnProperty(resourceProperty) && null != params[resourceProperty]) {
                resourceValue = params[resourceProperty];
            }

            // Inject value into the path
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
    .module('Api')
    .service('ApiResource', ApiResource);

/* File : src/core/Api/Service/ApiErrorService.js */ 
/**
 * API Error Service
 * @constructor
 */
var ApiErrorService = function ApiErrorService($q, $location, AlertService) {
    return {
        response: function onResponseSuccess(responseData) {
            return responseData;
        },

        responseError: function onResponseError(response) {
            switch (response.status) {
                case 401:
                    $location.path('/login');
                    break;
                case 404:
                    $location.path('/404');
                    break;
                // 422 : Unprocessable entity
                case 422:
                    AlertService.addAlert('error', 'Invalid data.', true);
                    break;
                default:
                    $location.path('/error_server');
            }

            return $q.reject(response);
        }
    };
};

// Set up dependency injection
ApiErrorService.$inject = [ '$q', '$location', 'AlertService' ];

// Inject Service into AngularJS
angular
    .module('Api')
    .service('ApiErrorService', ApiErrorService);
/* File : src/core/Client/Filter/AssetPathFilter.js */ 
/**
 * Asset Path filter
 */
var AssetPathFilter = function AssetPathFilter($client) {
    return function asset_path(path) {
        return $client.getAsset(path);
    };
};

// Set up dependency injection
AssetPathFilter.$inject = [ '$client' ];

// Register filter into Angular JS
angular
    .module('Client')
    .filter('asset_path', AssetPathFilter);
/* File : src/core/Client/Filter/PartialPathFilter.js */ 
/**
 * Partial Path filter
 */
var PartialPathFilter = function PartialPathFilter($client) {
    return function partial_path(path, module) {
        return $client.getPartial(path, module);
    };
};

// Set up dependency injection
PartialPathFilter.$inject = [ '$client' ];

// Register filter into Angular JS
angular
    .module('Client')
    .filter('partial_path', PartialPathFilter);
/* File : src/core/Client/Provider/ClientProvider.js */ 
/**
 * Client Provider
 * @constructor
 */
var ClientProvider = function ClientProvider() {
    this.$get = function Client() {
        var provider = this;

        return {
            /**
             * Allow access to the Client configuration at runtime
             */
            config: {
                basePath   : provider.basePath,
                srcDir     : provider.srcDir,
                assetDir   : provider.assetDir,
                partialDir : provider.partialDir
            },

            /**
             * Get Asset URL
             * @param {String} path
             */
            getAsset: function getAsset(path) {
                return provider.getAsset(path);
            },

            /**
             * Get Partial path
             * @param {String} path
             */
            getPartial: function getPartial(path, module) {
                return provider.getPartial(path, module);
            }
        };
    };
};

// Set up dependency injection
ClientProvider.$inject = [];

/**
 * Client sources base path
 * @type {string}
 */
ClientProvider.prototype.basePath   = null;

/**
 * Directory of the client sources
 * @type {string}
 */
ClientProvider.prototype.srcDir     = 'src';

/**
 * Assets directory
 * @type {string}
 */
ClientProvider.prototype.assetDir   = 'public';

/**
 * Partials directory
 * @type {string}
 */
ClientProvider.prototype.partialDir = 'Partial';

/**
 * Configure provider
 * @param {Object} configuration
 */
ClientProvider.prototype.configure = function configure(configuration) {
    if (configuration.basePath) {
        // Override default base path
        this.basePath = configuration.basePath.replace(/\/+$/, ""); // Trim last slashes
    }

    if (configuration.srcDir) {
        // Override default asset directory
        this.srcDir = configuration.srcDir.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    if (configuration.assetDir) {
        // Override default asset directory
        this.assetDir = configuration.assetDir.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }

    if (configuration.partialDir) {
        // Override default partial directory
        this.partialDir = configuration.partialDir.replace(/^\/+|\/+$/g, ''); // Trim trailing slashes
    }
};

/**
 * Get Asset path
 * @param {String} path
 */
ClientProvider.prototype.getAsset = function getAsset(path) {
    return this.basePath + '/' + this.assetDir + '/' + path.replace(/^\/+|\/+$/g, '');
};

/**
 * Get Partial path
 * @param {String} path
 * @param {String} module
 */
ClientProvider.prototype.getPartial = function getPartial(path, module) {
    return this.basePath + '/' + this.srcDir + '/' + module + '/' + this.partialDir + '/' + path.replace(/^\/+|\/+$/g, '');
};

// Register provider into Angular JS
angular
    .module('Client')
    .provider('$client', ClientProvider);
/* File : src/core/Confirm/Directive/ConfirmDirective.js */ 
var ConfirmDirective = function ConfirmDirective($uibModal, $client) {
    this.services = {};
    this.services['$uibModal'] = $uibModal;
    this.services['$client']   = $client;

    return {

    };
};

// Set up dependency injection
ConfirmDirective.$inject = [ '$uibModal', '$client' ];

// Register directive into Angular JS
angular
    .module('Confirm')
    .directive('confirm', ConfirmDirective);
/* File : src/core/Confirm/Service/ConfirmService.js */ 
/**
 * Confirm Service
 * @constructor
 */
var ConfirmService = function ConfirmService($uibModal, $client) {
    this.services = {};
    this.services['$uibModal'] = $uibModal;
    this.services['$client']   = $client;
};

// Set up dependency injection
ConfirmService.$inject = [];

ConfirmService.prototype.confirm = function confirm() {
    var modalInstance = this.services.$uibModal.open({
        templateUrl : this.services.$client.getPartial('Modal/confirm.html', 'core/Layout'),
        controller  : 'ConfirmModalController',
        windowClass : 'modal-danger'
    });
};

// Register service into Angular JS
angular
    .module('Confirm')
    .service('ConfirmService', ConfirmService);
/* File : src/core/Layout/Controller/Modal/ConfirmModalController.js */ 
/**
 * Confirm Modal controller
 * @constructor
 */
var ConfirmModalController = function ConfirmModalController($uibModalInstance) {
    this.instance = $uibModalInstance;
};

// Set up dependency injection
ConfirmModalController.$inject = [ '$uibModalInstance' ];

// Register controller into Angular JS
angular
    .module('Layout')
    .controller('ConfirmModalController', ConfirmModalController);

/* File : src/core/Layout/Directive/Field/ScoreFieldDirective.js */ 
/**
 * Score Field
 */
angular
    .module('Layout')
    .directive('scoreField', [
        '$client',
        function ScoreFieldDirective($client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('Field/score-field.html', 'core/Layout'),
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
/* File : src/core/Layout/Directive/FlagDirective.js */ 
/**
 * Widget to display a flag field
 * @constructor
 */
var FlagDirective = function FlagDirective($client) {
    return {
        restrict: 'E',
        template: '<a class="flag flag-{{ flagCtrl.type }}" role="button" href="" data-ng-transclude="" data-ng-click="flagCtrl.toggle()" data-ng-class="{ on: flagCtrl.value }"></a>',
        replace: true,
        transclude: true,
        scope: {
            /**
             * Flag value
             */
            value: '=',
            type: '@?'
        },
        controllerAs: 'flagCtrl',
        bindToController: true,
        controller: function LayoutListFormatterController () {
            this.value = false;

            this.type = 'default';

            /**
             * Switch display format of the list
             * @param format
             */
            this.toggle = function toggle() {
                this.value = !this.value;
            };
        }
    };
};

// Set up dependency injection
FlagDirective.$inject = [  ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('uiFlag', FlagDirective);

/* File : src/core/Layout/Directive/Header/HeaderButtonDirective.js */ 
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
/* File : src/core/Layout/Directive/Header/HeaderButtonsDirective.js */ 
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
/* File : src/core/Layout/Directive/Header/HeaderDirective.js */ 
/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('uiHeader', [
        '$client',
        function HeaderDirective($client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('Header/navbar.html', 'core/Layout'),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
/* File : src/core/Layout/Directive/ListFormatterDirective.js */ 
/**
 * Widget to change how lists are displayed
 */
var LayoutListFormatterDirective = function LayoutListFormatterDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('list-formatter.html', 'core/Layout'),
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
LayoutListFormatterDirective.$inject = [ '$client' ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutListFormatter', LayoutListFormatterDirective);

/* File : src/core/Layout/Directive/ListSorterDirective.js */ 
/**
 * Widget to sort lists
 */
var LayoutListSorterDirective = function LayoutListSorterDirectiveConstructor($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('list-sorter.html', 'core/Layout'),
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
LayoutListSorterDirective.$inject = [ '$client' ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutListSorter', LayoutListSorterDirective);

/* File : src/core/Layout/Directive/Page/PageDirective.js */ 
/**
 * Represents a page of the application
 * @constructor
 */
var LayoutPageDirective = function LayoutPageDirective() {
    return {
        restrict: 'E',
        template: '<div class="container-fluid" data-ng-transclude=""></div>',
        replace: true,
        transclude: true
    };
};

// Set up dependency injection
LayoutPageDirective.$inject = [];

// Register directive into Angular JS
angular
    .module('Layout')
    .directive('layoutPage', LayoutPageDirective);
/* File : src/core/Layout/Directive/Page/PageTitleDirective.js */ 
/**
 * Represents the title of a Page
 * @constructor
 */
var LayoutPageTitleDirective = function LayoutPageTitleDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('Page/title.html', 'core/Layout'),
        replace: true,
        transclude: true,
        scope: {
            /**
             * If true, the title is hidden with the `sr-only` class
             */
            hideTitle: '@'
        }
    };
};

// Set up dependency injection
LayoutPageTitleDirective.$inject = [ '$client' ];

// Register directive into ANgular JS
angular
    .module('Layout')
    .directive('layoutPageTitle', LayoutPageTitleDirective);
/* File : src/core/Layout/Directive/ScrollableDirective.js */ 
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

/* File : src/core/Layout/Directive/Sidebar/SidebarDirective.js */ 
/**
 * Sidebar of the application
 */
var LayoutSidebarDirective = function LayoutSidebarDirectiveConstructor($location, $client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('Sidebar/sidebar.html', 'core/Layout'),
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
LayoutSidebarDirective.$inject = [ '$location', '$client' ];

// Register directive into AngularJS
angular
    .module('Layout')
    .directive('layoutSidebar', LayoutSidebarDirective);
/* File : src/core/Layout/Directive/Sidebar/SidebarItemDirective.js */ 
/**
 * Represents a link in the sidebar
 */
var LayoutSidebarItemDirective = function LayoutSidebarItemDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('Sidebar/sidebar-item.html', 'core/Layout'),
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
LayoutSidebarItemDirective.$inject = [ '$client' ];

// Register into AngularJS
angular
    .module('Layout')
    .directive('layoutSidebarItem', LayoutSidebarItemDirective);
/* File : src/core/Layout/translations.js */ 
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
/* File : src/core/Loader/Interceptor/LoaderInterceptor.js */ 
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
/* File : src/core/Loader/Provider/LoaderProvider.js */ 
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
/* File : src/core/Utilities/Service/SoundService.js */ 
/**
 * Sound Service
 * @returns {SoundService}
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
/* File : src/app/Advertisement/module.js */ 
/**
 * Advertisement Module
 */
angular.module('Advertisement', []);
/* File : src/app/Badge/module.js */ 
/**
 * Badge Module
 */
angular.module('Badge', []);
/* File : src/app/Forum/module.js */ 
/**
 * Forum Module
 */
angular.module('Forum', []);
/* File : src/app/Game/module.js */ 
/**
 * Game Module
 */
angular.module('Game', []);
/* File : src/app/GuitarNeck/module.js */ 
/**
 * Guitar Neck
 */
angular
    .module('GuitarNeck', []);
/* File : src/app/Instrument/module.js */ 
/**
 * Instrument Module
 */
angular
    .module('Instrument', [
        'Utilities',
        'Tuning'
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


/* File : src/app/Lesson/module.js */ 
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
/* File : src/app/SheetMusic/module.js */ 
/**
 * SHeet Music renderer
 */
angular.module('SheetMusic', []);
/* File : src/app/SongBook/module.js */ 
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
/* File : src/app/Theory/module.js */ 
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
/* File : src/app/Tuning/module.js */ 
/**
 * Tuning module
 */
angular
    .module('Tuning', [])
    .config([
        '$translateProvider',
        function configureTuning($translateProvider) {
            // Inject translations
            for (var lang in tuningTranslations) {
                if (tuningTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, tuningTranslations[lang]);
                }
            }
        }
    ]);
/* File : src/app/User/module.js */ 
/**
 * User Module
 */
angular.module('User', []);
/* File : src/app/app.js */ 
/**
 * Application Root
 * Initializes needed modules in the Angular application
 */
angular
    // Initialize Application
    .module('App', [
        // Load Configuration
        'AppConfiguration',

        // Load Core features
        'AppCore',

        // Load modules
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
    ])

    // Configure Application
    .config([
        '$translateProvider',
        function configure($translateProvider) {
            // Inject translations
            for (var lang in appTranslations) {
                if (appTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, appTranslations[lang]);
                }
            }
        }
    ]);
/* File : src/app/Advertisement/routes.js */ 
/**
 * Advertisement routes
 */
angular.module('Advertisement').config([
    '$routeProvider',
    function AdvertisementRoutes($routeProvider) {

    }
]);
/* File : src/app/Badge/routes.js */ 
/**
 * Badge routes
 */
angular.module('Badge').config([
    '$routeProvider',
    function BadgeRoutes($routeProvider) {

    }
]);
/* File : src/app/Forum/routes.js */ 
/**
 * Forum routes
 */
angular.module('Forum').config([
    '$routeProvider',
    function ForumRoutes($routeProvider) {

    }
]);
/* File : src/app/Game/Controller/GameListController.js */ 
/**
 * List controller for Games
 * @constructor
 */
var GameListController = function GameListController($uibModal, resources) {
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

/* File : src/app/Game/Resource/GameResource.js */ 
/**
 * Game Resource
 * @constructor
 */
var GameResource = function GameResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
GameResource.prototype = Object.create(ApiResource.prototype);
GameResource.prototype.constructor = GameResource;

// Set up dependency injection
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

/* File : src/app/Game/routes.js */ 
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
/* File : src/app/GuitarNeck/Controller/GuitarNeckController.js */ 
var GuitarNeckController = function GuitarNeckController() {

};

GuitarNeckController.prototype.height = 300;

// Inject controller into Angular
angular
    .module('GuitarNeck')
    .controller('GuitarNeckController', GuitarNeckController);

/* File : src/app/GuitarNeck/Controller/Layer/AbstractLayerController.js */ 
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

/* File : src/app/GuitarNeck/Controller/Layer/FretLayerController.js */ 
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

/* File : src/app/GuitarNeck/Controller/Layer/NoteLayerController.js */ 
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

/* File : src/app/GuitarNeck/Controller/Layer/StringLayerController.js */ 
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

/* File : src/app/GuitarNeck/Directive/GuitarNeckDirective.js */ 
angular
    .module('GuitarNeck')
    .directive('guitarNeckWidget', [
        '$client',
        function ($client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('GuitarNeck.html', 'app/GuitarNeck'),
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

/* File : src/app/GuitarNeck/Directive/Layer/FretLayerDirective.js */ 
angular
    .module('GuitarNeck')
    .directive('fretLayer', [
        '$window',
        '$client',
        function FretLayerDirective($window, $client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('Layer/FretLayer.html', 'app/GuitarNeck'),
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
/* File : src/app/GuitarNeck/Directive/Layer/NoteLayerDirective.js */ 
angular
    .module('GuitarNeck')
    .directive('noteLayer', [
        '$window',
        '$client',
        function NoteLayerDirective($window, $client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('Layer/NoteLayer.html', 'app/GuitarNeck'),
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

/* File : src/app/GuitarNeck/Directive/Layer/StringLayerDirective.js */ 
angular
    .module('GuitarNeck')
    .directive('stringLayer', [
        '$window',
        '$client',
        function StringLayerDirective($window, $client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('Layer/StringLayer.html', 'app/GuitarNeck'),
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

/* File : src/app/Instrument/Controller/InstrumentFormController.js */ 
/**
 * Form controller for Instruments
 * @constructor
 */
var InstrumentFormController = function InstrumentFormController(resource, InstrumentResource, instrumentTypes, InstrumentTemplateResource, InstrumentSpecificationResource) {
    FormController.apply(this, arguments);

    this.instrumentTypes       = instrumentTypes;
    this.templateResource      = InstrumentTemplateResource;
    this.specificationResource = InstrumentSpecificationResource;

    // Initialize empty relationships
    if (!this.apiResource.hasRelationship(this.resource, 'instrumentType')) {
        this.setType(this.instrumentTypes[0]);
    }

    if (!this.apiResource.hasRelationship(this.resource, 'specification')) {
        this.apiResource.addRelationship(this.resource, 'specification', this.specificationResource.init());
    }
};

// Extends FormController
InstrumentFormController.prototype             = Object.create(FormController.prototype);
InstrumentFormController.prototype.constructor = InstrumentFormController;

// Set up dependency injection
InstrumentFormController.$inject = [
    'resource',
    'InstrumentResource',
    'instrumentTypes',
    'InstrumentTemplateResource',
    'InstrumentSpecificationResource'
];

/**
 * List of Templates for the current InstrumentType
 * @type {Array}
 */
InstrumentFormController.prototype.templates = [];

/**
 * Selected Template
 * @type {Object}
 */
InstrumentFormController.prototype.selectedTemplate = null;

/**
 * Select the type of the Instrument
 * @param {Object} type
 */
InstrumentFormController.prototype.setType = function setType(type) {
    this.apiResource.addRelationship(this.resource, 'instrumentType', type);

    // Load templates for this type
    this.loadTemplates(type);
};

/**
 * Load the list of available Templates for the selected Type
 * @param {Object} type
 */
InstrumentFormController.prototype.loadTemplates = function loadTemplates(type) {
    this.templates = this.templateResource
        .get({ type: type.id })
        .then(function onSuccess(result) {
            this.templates = result;
        }.bind(this));
};

/**
 * Select a template for the Instrument
 * @param {Object} template
 */
InstrumentFormController.prototype.selectTemplate = function selectTemplate(template) {
    this.selectedTemplate = template;

    // Use the Template name as default name
    if (!this.resource.attributes.name) {
        this.resource.attributes.name = template.attributes.name;
    }

    if (!this.apiResource.hasRelationship(this.resource, 'specification')) {
        // Initialize object
        this.apiResource.addRelationship(this.resource, 'specification', {});
    }

    var specification = this.apiResource.getRelationship(this.resource, 'specification');

    // Fill instrument specification with template
    for (var attr in template.attributes) {
        if ('name' !== attr && template.attributes.hasOwnProperty(attr)) {
            specification.attributes[attr] = template.attributes[attr];
        }
    }
};

// Register controller into Angular JS
angular
    .module('Instrument')
    .controller('InstrumentFormController', InstrumentFormController);

/* File : src/app/Instrument/Controller/InstrumentListController.js */ 
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

/* File : src/app/Instrument/Controller/InstrumentShowController.js */ 
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
 * Current displayed Resource
 * @type {Object}
 */
InstrumentShowController.prototype.resource = null;

// Register controller into angular
angular
    .module('Instrument')
    .controller('InstrumentShowController', InstrumentShowController);

/* File : src/app/Instrument/Directive/InstrumentMenuDirective.js */ 
/**
 * Instrument menu
 * Used to select the current instrument, and if relevant the tuning (e.g. for Guitar or Bass)
 */
var InstrumentMenuDirective = function InstrumentMenuDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('Instrument/menu.html', 'app/Instrument'),
        replace: true
    };
};

// Set up dependency injection
InstrumentMenuDirective.$inject = [ '$client' ];

// Register directive into AngularJS
angular
    .module('Instrument')
    .directive('instrumentMenu', InstrumentMenuDirective);
/* File : src/app/Instrument/Directive/SpecificationFormDirective.js */ 
/**
 * Specification Form
 */
var SpecificationFormDirective = function SpecificationFormDirective($client) {
    return {
        restrict: 'E',
        template: /*$client.getPartial('Instrument/menu.html', 'app/Instrument')*/ '<div></div>',
        replace: true,
        scope: {
            type          : '=',
            specification : '='
        },
        bindToController: true,
        controllerAs: 'specificationFormCtrl',
        controller: [
            function SpecificationFormController() {

            }
        ]
    };
};

// Set up dependency injection
SpecificationFormDirective.$inject = [ '$client' ];

// Register directive into AngularJS
angular
    .module('Instrument')
    .directive('instrumentSpecificationForm', SpecificationFormDirective);
/* File : src/app/Instrument/Resource/InstrumentResource.js */ 
/**
 * Instrument Resource
 * @constructor
 */
var InstrumentResource = function InstrumentResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentResource.prototype = Object.create(ApiResource.prototype);

// Set up dependency injection
InstrumentResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentResource.prototype.type = 'instruments';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentResource.prototype.path = '/instruments/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentResource', InstrumentResource);

/* File : src/app/Instrument/Resource/InstrumentSpecificationResource.js */ 
/**
 * Instrument Specification Resource
 * @constructor
 */
var InstrumentSpecificationResource = function InstrumentSpecificationResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentSpecificationResource.prototype = Object.create(ApiResource.prototype);
InstrumentSpecificationResource.prototype.constructor = InstrumentSpecificationResource;

// Set up dependency injection
InstrumentSpecificationResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentSpecificationResource.prototype.type = 'instrument_specifications';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentSpecificationResource.prototype.path = '/instrument/{instrument}/specification/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentSpecificationResource', InstrumentSpecificationResource);

/* File : src/app/Instrument/Resource/InstrumentTemplateResource.js */ 
/**
 * Instrument Template Resource
 * @constructor
 */
var InstrumentTemplateResource = function InstrumentTemplateResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentTemplateResource.prototype = Object.create(ApiResource.prototype);
InstrumentTemplateResource.prototype.constructor = InstrumentTemplateResource;

// Set up dependency injection
InstrumentTemplateResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentTemplateResource.prototype.type = 'instrument_templates';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentTemplateResource.prototype.path = '/instrument_types/{type}/templates/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentTemplateResource', InstrumentTemplateResource);

/* File : src/app/Instrument/Resource/InstrumentTypeResource.js */ 
/**
 * Instrument Type Resource
 * @constructor
 */
var InstrumentTypeResource = function InstrumentTypeResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
InstrumentTypeResource.prototype = Object.create(ApiResource.prototype);
InstrumentTypeResource.prototype.constructor = InstrumentTypeResource;

// Set up dependency injection
InstrumentTypeResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
InstrumentTypeResource.prototype.type = 'instrument_types';

/**
 * Path of the API resource
 * @type {string}
 */
InstrumentTypeResource.prototype.path = '/instrument_types/{id}';

// Register service into Angular JS
angular
    .module('Instrument')
    .service('InstrumentTypeResource', InstrumentTypeResource);

/* File : src/app/Instrument/routes.js */ 
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
                },
                edit: {
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
/* File : src/app/Instrument/translations.js */ 
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
/* File : src/app/Lesson/Controller/LessonFormController.js */ 
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

/* File : src/app/Lesson/Controller/LessonListController.js */ 
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

/* File : src/app/Lesson/Resource/LessonResource.js */ 
/**
 * Resource : Lesson
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var LessonResource = function LessonResource($http, $q, $api) {
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
LessonResource.prototype.type = 'lessons';

/**
 * Path of the API resource
 * @type {string}
 */
LessonResource.prototype.path = '/lessons/{id}';

// Register service into Angular JS
angular
    .module('Lesson')
    .service('LessonResource', LessonResource);

/* File : src/app/Lesson/routes.js */ 
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
/* File : src/app/Lesson/translations.js */ 
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
/* File : src/app/SheetMusic/Controller/SheetMusicController.js */ 
/**
 * Controller constructor
 * @constructor
 */
var SheetMusicController = function SheetMusicController() {

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

/* File : src/app/SheetMusic/Directive/ChordSheetDirective.js */ 
/**
 * Display Chord score
 */
var ChordSheetDirective = function ChordSheetDirective($timeout) {
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
/* File : src/app/SheetMusic/Directive/SheetMusicDirective.js */ 
(function () {
    'use strict';

    angular.module('SheetMusic')
        .directive('sheetMusic', [
            '$timeout',
            '$client',
            function ($timeout, $client) {
                return {
                    restrict: 'E',
                    templateUrl: $client.getPartial('sheet-music.html', 'app/SheetMusic'),
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
/* File : src/app/SongBook/Controller/SongFormController.js */ 
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

/* File : src/app/SongBook/Controller/SongListController.js */ 
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

/* File : src/app/SongBook/Controller/SongShowController.js */ 
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

/* File : src/app/SongBook/Resource/SongResource.js */ 
/**
 * Song Resource
 * @constructor
 */
var SongResource = function SongResource() {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
SongResource.prototype = Object.create(ApiResource.prototype);
SongResource.prototype.constructor = SongResource;

// Set up dependency injection
SongResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
SongResource.prototype.type = 'songs';

/**
 * Path of the API resource
 * @type {string}
 */
SongResource.prototype.path = '/songs/{id}';

// Register service into Angular JS
angular
    .module('SongBook')
    .service('SongResource', SongResource);

/* File : src/app/SongBook/routes.js */ 
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
/* File : src/app/SongBook/translations.js */ 
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
/* File : src/app/Theory/Controller/Chord/ChordListController.js */ 
/**
 * List controller for Chords
 * @constructor
 */
var ChordListController = function ChordListController($uibModal, entities) {
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

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('ChordListController', ChordListController);

/* File : src/app/Theory/Controller/Chord/ChordShowController.js */ 
/**
 * Show controller for Songs
 * @constructor
 */
var ChordShowController = function ChordShowController(resource, notes) {
    ShowController.apply(this, arguments);

    this.notes = notes;
};

// Extends ShowController
ChordShowController.prototype = Object.create(ShowController.prototype);

// Set up dependency injection
ChordShowController.$inject = ShowController.$inject;

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('ChordShowController', ChordShowController);

/* File : src/app/Theory/Controller/DegreeListController.js */ 
/**
 * List controller for Degrees
 * @constructor
 */
var DegreeListController = function DegreeListController($uibModal, resources) {
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

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('DegreeListController', DegreeListController);

/* File : src/app/Theory/Controller/IntervalListController.js */ 
/**
 * List controller for Intervals
 * @constructor
 */
var IntervalListController = function IntervalListController($uibModal, resources) {
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

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('IntervalListController', IntervalListController);

/* File : src/app/Theory/Controller/Note/NoteListController.js */ 
/**
 * List controller for Notes
 * @constructor
 */
var NoteListController = function NoteListController($uibModal, resources) {
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

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('NoteListController', NoteListController);

/* File : src/app/Theory/Controller/Note/NoteMenuController.js */ 
/**
 * Menu controller for Notes
 * @constructor
 */
var NoteMenuController = function NoteMenuController(NoteResource) {
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

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('NoteMenuController', NoteMenuController);

/* File : src/app/Theory/Controller/ScaleListController.js */ 
/**
 * List controller for Scales
 * @constructor
 */
var ScaleListController = function ScaleListController($uibModal, resources) {
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

// Register controller into Angular JS
angular
    .module('Theory')
    .controller('ScaleListController', ScaleListController);

/* File : src/app/Theory/Directive/Interval/IntervalPlayerDirective.js */ 
/**
 * Interval player directive
 * @returns {Object}
 * @constructor
 */
var IntervalPlayerDirective = function IntervalPlayerDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('Interval/player.html', 'app/Theory'),
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
IntervalPlayerDirective.$inject = [ '$client' ];

// Register directive into angular
angular
    .module('Theory')
    .directive('intervalPlayer', IntervalPlayerDirective);
/* File : src/app/Theory/Directive/Note/NoteDisplaySwitchDirective.js */ 
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
/* File : src/app/Theory/Directive/Note/NoteMenuDirective.js */ 
/**
 * Note menu directive
 * @param   {Object} $client
 * @returns {Object}
 * @constructor
 */
var NoteMenuDirective = function NoteMenuDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('Note/menu.html', 'app/Theory'),
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
NoteMenuDirective.$inject = [ '$client' ];

// Register directive into Angular JS
angular
    .module('Theory')
    .directive('noteMenu', NoteMenuDirective);
/* File : src/app/Theory/Directive/Scale/ScaleRepresentationDirective.js */ 
angular
    .module('Theory')
    .directive('scaleRepresentation', [
        '$client',
        'NoteResource',
        function ScaleRepresentationDirective($client, NoteResource) {
            return {
                restrict: 'E',
                templateUrl: $client.getPath('Scale/representation.html', 'app/Theory'),
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
/* File : src/app/Theory/Filter/NoteNameFilter.js */ 
/**
 * Note Name filter
 * @constructor
 */
var NoteNameFilter = function NoteNameFilter(NoteResource) {
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
};

// Set up dependency injection
NoteNameFilter.$inject = [ 'NoteResource' ];

// Register filter into Angular JS
angular
    .module('Theory')
    .filter('note_name', NoteNameFilter);
/* File : src/app/Theory/Resource/ChordResource.js */ 
/**
 * Resource : Chord
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var ChordResource = function ChordResource($http, $q, $api) {
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
ChordResource.prototype.type = 'chords';

/**
 * Path of the API resource
 * @type {string}
 */
ChordResource.prototype.path = '/chords/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('ChordResource', ChordResource);

/* File : src/app/Theory/Resource/DegreeResource.js */ 
/**
 * Resource : Degree
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var DegreeResource = function DegreeResource($http, $q, $api) {
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
DegreeResource.prototype.type = 'degrees';

/**
 * Path of the API resource
 * @type {string}
 */
DegreeResource.prototype.path = '/degrees/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('DegreeResource', DegreeResource);

/* File : src/app/Theory/Resource/IntervalResource.js */ 
/**
 * Resource : Interval
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var IntervalResource = function IntervalResource($http, $q, $api) {
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
IntervalResource.prototype.type = 'intervals';

/**
 * Path of the API resource
 * @type {string}
 */
IntervalResource.prototype.path = '/intervals/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('IntervalResource', IntervalResource);

/* File : src/app/Theory/Resource/NoteResource.js */ 
/**
 * Resource : Note
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var NoteResource = function NoteResource($http, $q, $api) {
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
NoteResource.prototype.type = 'notes';

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

/* File : src/app/Theory/Resource/ScaleResource.js */ 
/**
 * Resource : Scale
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var ScaleResource = function ScaleResource($http, $q, $api) {
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
ScaleResource.prototype.type = 'scales';

/**
 * Path of the API resource
 * @type {string}
 */
ScaleResource.prototype.path = '/scales/{id}';

// Register service into Angular JS
angular
    .module('Theory')
    .service('ScaleResource', ScaleResource);

/* File : src/app/Theory/routes.js */ 
/**
 * Theory routes
 */
angular
    .module('Theory')
    .config([
        '$routeProvider',
        '$clientProvider',
        'apiResourceRouteProvider',
        function TheoryRoutes($routeProvider, $clientProvider, apiResourceRouteProvider) {
            // Theory summary
            $routeProvider.when('/theory', {
                templateUrl: $clientProvider.getPartial('summary.html', 'app/Theory')
            });

            apiResourceRouteProvider.register('Theory', 'Note',     'theory/notes',     true);
            apiResourceRouteProvider.register('Theory', 'Degree',   'theory/degrees',   true);
            apiResourceRouteProvider.register('Theory', 'Interval', 'theory/intervals', true);
            apiResourceRouteProvider.register('Theory', 'Chord',    'theory/chords',    true);
            apiResourceRouteProvider.register('Theory', 'Scale',    'theory/scales',    true);
        }
    ]);
/* File : src/app/Theory/translations.js */ 
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
/* File : src/app/Tuning/Controller/TuningWidgetController.js */ 
/**
 * Tuning Widget Controller
 * @constructor
 */
var TuningWidgetController = function TuningWidgetController(NoteResource) {
    // WIP : set data (will be automatically set by directive)
    this.headstock = 'top-bottom';
    this.strings   = 6;

    // Load Notes
    this.notes = NoteResource.query().then(function onSuccess(result) {
        this.notes = result;

        return result;
    }.bind(this));
};

// Set up dependency injection
TuningWidgetController.$inject = [ 'NoteResource' ];

/**
 * Nb strings of the Instrument
 * @type {number}
 */
TuningWidgetController.prototype.strings = 6;

/**
 * Headstock format (top-bottom or in-line)
 * @type {string}
 */
TuningWidgetController.prototype.headstock = 'top-bottom';

/**
 * Is left handed ?
 * @type {boolean}
 */
TuningWidgetController.prototype.leftHanded = false;

/**
 * Current Tuning
 * @type {Object}
 */
TuningWidgetController.prototype.tuning = null;

TuningWidgetController.prototype.tuningPegSize = 36;

/**
 * Position of the Tuning pegs regarding to the Headstock format
 * Array are ordered from the lowest string to the higher one
 * @type {Object}
 */
TuningWidgetController.prototype.tuningPegs = {
    'in-line': [
        { x: 100, y: 690, clockwise: true },
        { x: 145, y: 580, clockwise: true },
        { x: 170, y: 470, clockwise: true },

        { x: 195, y: 360, clockwise: true },
        { x: 225, y: 250, clockwise: true },
        { x: 250, y: 140, clockwise: true }
    ],

    'top-bottom': [
        // Left
        { x: 85,  y: 580, clockwise: true },
        { x: 105, y: 400, clockwise: true },
        { x: 100, y: 220, clockwise: true },

        // Right
        { x: 295, y: 175, clockwise: false },
        { x: 290, y: 355, clockwise: false },
        { x: 315, y: 535, clockwise: false }
    ]
};

/**
 * Redraw widget
 * @param canvas
 */
TuningWidgetController.prototype.draw = function draw(canvas) {
    // Get 2D context of the canvas
    var context = canvas.getContext('2d');
    if (null !== context) {
        // Calculate Height of the Canvas from it's width (ratio=2.15)
        canvas.height = canvas.width * 2.15;

        // Reset translation
        context.translate(0,0);

        // Set scale (original drawing scale : w=400 / h=860)
        context.scale(canvas.width / 400, canvas.height /860);

        this.drawHeadstock(context);
        this.drawNut(context);
        this.drawStrings(context);
    }
};

/**
 * Draw : Headstock
 * @param context
 */
TuningWidgetController.prototype.drawHeadstock = function drawHeadstock(context) {
    // w=400 / h=860
    // ratio = 2.15
    // Start headstock
    context.beginPath();

    // Bottom line
    context.moveTo(100, 850);
    context.lineTo(300, 850);

    switch (this.headstock) {
        case 'top-bottom':
            context.bezierCurveTo(300, 850, 275, 745, 395, 590);
            context.bezierCurveTo(415, 500, 310, 440, 380, 5);
            context.bezierCurveTo(195, -30, 5,   125, 10,  150);
            context.bezierCurveTo(75,  270, 5,   625, 5,   625);
            context.bezierCurveTo(100, 730, 100, 850, 100, 850);

            break;

        case 'in-line':
            context.bezierCurveTo(300, 775, 385, 700, 385, 700);
            context.bezierCurveTo(315, 435, 355, 265, 365, 20);
            context.bezierCurveTo(365, 20,  355, -5,  340, 10);
            context.bezierCurveTo(275, 65,  275, 75,  205, 65);
            context.lineTo(15, 755);
            context.bezierCurveTo(100, 795, 100, 850, 100, 850);

            break;
    }

    // Finish headstock
    context.closePath();

    context.fillStyle = 'rgba(0, 0, 0, 0.25)';
    context.fill();
};

/**
 * Draw : Nut
 * @param context
 */
TuningWidgetController.prototype.drawNut = function drawNut(context) {
    // Set Nut color
    context.fillStyle = '#777';

    // Set shadow
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur    = 10;
    context.shadowColor   = "black";

    context.beginPath();

    // Draw Nut
    context.rect(98, 836, 200, 18);

    context.closePath();

    context.fillStyle = '#555';
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = '#666';
    context.stroke();
};

/**
 *
 * @param {number} string - current string
 * @returns {{x: number, y: number}}
 */
TuningWidgetController.prototype.getTuningPegPosition = function getTuningPegPosition(context, string) {
    var x = 0;
    var y = 0;
    var clockwise = true;

    switch (this.headstock) {
        case 'top-bottom':
            break;

        // TOP    : x=205 y=65
        // BOTTOM : x=15  y=755
        // HEIGHT : h=690
        // Tuning caps must be on A(260, 65) B(70, 755)
        case 'in-line':
            var h = 690;
            var start = 65;
            var b = { x: 260, y: start };
            var a = { x: 70,  y: start + h };

            // TODO : check if the size of the tuning peg is not bigger than interval
            var interval = h / this.strings;
            var currentInterval = (interval  * string) + ( interval / 2);

            var delta = Math.round(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));

            x = a.x + (( currentInterval * (b.x - a.x) ) / delta);
            y = a.y + (( currentInterval * (b.y - a.y) ) / delta);

            break;
    }

    x = this.fixPosition(x);
    y = this.fixPosition(y);

    return { x: x, y: y, clockwise: clockwise };
};

TuningWidgetController.prototype.fixPosition = function fixPosition(pos) {
    var pos = Math.round(pos);
    if (0 === pos % 2) {
        pos += 1;
    }

    return pos;
};

/**
 * Draw : Strings + Tuning pegs
 * @param context
 */
TuningWidgetController.prototype.drawStrings = function drawStrings(context) {
    // Tuning peg base circle = 38
    // Tuning peg hexagon     = 30
    // Tuning peg cap         = 16
    var drawTuningPeg = function drawTuningPeg(context, tuningPegPosition) {
        // Set Tuning Pegs color
        context.fillStyle = 'rgba(255, 255, 255, 0.25)';

        // Set shadow
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur    = 10;
        context.shadowColor   = "black";

        // Draw first circle
        context.beginPath();
        context.arc(tuningPegPosition.x, tuningPegPosition.y, 38, 0, 2 * Math.PI, false);
        context.closePath();

        context.fillStyle = '#777';
        context.fill();

        // Draw hexagon
        context.beginPath();
        var radius = 30;
        var a = (Math.PI * 2) / 6;
        context.moveTo(radius + tuningPegPosition.x, tuningPegPosition.y);
        for (var i = 1; i < 6; i++) {
            context.lineTo((radius * Math.cos(a*i)) + tuningPegPosition.x, (radius * Math.sin(a*i)) + tuningPegPosition.y);
        }
        context.closePath();

        context.fillStyle = '#777';
        context.fill();

        context.lineWidth = 1;
        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        context.stroke();
    };

    var drawString = function drawString(context, startX, stringNum, stringWidth, tuningPegPosition) {
        // Set shadow
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur    = 5;
        context.shadowColor   = "black";

        context.beginPath();
        // Start from nut
        context.moveTo(startX, 860);

        // Go vertically to the top of the nut
        context.lineTo(startX, 860 - 24);

        // Draw a line from the top of the nut to the tuning peg
        var tuningPegX = tuningPegPosition.clockwise ? (tuningPegPosition.x + 16 - stringWidth) : (tuningPegPosition.x - 16 + stringWidth);

        context.lineTo(tuningPegX, tuningPegPosition.y);

        context.lineWidth = stringWidth;
        context.strokeStyle = '#bbb';

        context.stroke();
    };

    var drawTuningPegCap = function drawTuningPegCap(context, tuningPegPosition) {
        // Set Tuning Pegs color
        context.fillStyle = 'rgba(255, 255, 255, 0.25)';

        // Set shadow
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur    = 10;
        context.shadowColor   = "black";

        // Draw second circle
        context.beginPath();
        context.arc(tuningPegPosition.x, tuningPegPosition.y, 16, 0, 2 * Math.PI, false);
        context.closePath();

        var gradient = context.createRadialGradient(tuningPegPosition.x, tuningPegPosition.y, 3, tuningPegPosition.x, tuningPegPosition.y, 17);
        gradient.addColorStop(0, "#aaa");
        gradient.addColorStop(1, "#666");

        // Fill with gradient
        context.fillStyle = gradient;

        context.fill();

        context.lineWidth = 1;
        context.strokeStyle = '#333';
        context.stroke();
    };

    // Draw each string (from the lowest to the highest)
    // 1. Draw base of the tuning pegs
    for (var s = 0; s < this.strings; s++) {
        var position = this.getTuningPegPosition(context, s);
        drawTuningPeg(context, position);
    }

    // 2. Draw strings
    var intervalWidth = Math.round(200 / this.strings);
    var startX = 100 + (intervalWidth / 2);
    for (var s = 0; s < this.strings; s++) {
        var stringWidth = (this.strings + 1) - s;
        var position = this.getTuningPegPosition(context, s);
        drawString(context, startX, s, stringWidth, position);
        startX += intervalWidth;
    }

    // 3. Draw cap of the tuning pegs
    for (var s = 0; s < this.strings; s++) {
        var position = this.getTuningPegPosition(context, s);
        drawTuningPegCap(context, position);
    }
};

// Register controller into Angular JS
angular
    .module('Tuning')
    .controller('TuningWidgetController', TuningWidgetController);
/* File : src/app/Tuning/Directive/TuningWidgetDirective.js */ 
/**
 * Tuning Widget (Choose and Edit widgets)
 * @param   {Object} $client
 * @returns {Object}
 * @constructor
 */
var TuningWidgetDirective = function TuningWidgetDirective($client) {
    return {
        restrict: 'E',
        templateUrl: $client.getPartial('widget.html', 'app/Tuning'),
        replace: true,
        scope: {
            strings   : '=',
            headstock : '=',
            leftHanded: '=',
            tuning    : '=?'
        },
        bindToController: true,
        controllerAs: 'tuningWidgetCtrl',
        controller: 'TuningWidgetController',
        link: function link(scope, element, attrs, tuningWidgetCtrl) {
            var init = true;

            var canvas = element.find('canvas').get(0);

            tuningWidgetCtrl.draw(canvas);

            // Watch Headstock change
            scope.$watch(function () {
                return tuningWidgetCtrl.headstock;
            }, function (newValue, oldValue) {
                if (!init && newValue != oldValue) {
                    tuningWidgetCtrl.draw(canvas);
                }
            });

            // Watch Strings change
            scope.$watch(function () {
                return tuningWidgetCtrl.strings;
            }, function (newValue, oldValue) {
                if (!init && newValue != oldValue) {
                    tuningWidgetCtrl.draw(canvas);
                }
            });

            element.on('resize', function () {
                tuningWidgetCtrl.draw(canvas);
            });

            init = false;
        }/*,
        compile: function compile() {
            return {
                pre: function preLink(scope, element, attrs, tuningWidgetCtrl) {
                    tuningWidgetCtrl.dropdownOptions = {
                        setHeight: (element.height() - 70) + 'px'
                    };
                }
            }
        }*/
    };
};

// Set up dependency injection
TuningWidgetDirective.$inject = [ '$client' ];

// Inject directive into Angular JS
angular
    .module('Tuning')
    .directive('tuningWidget', TuningWidgetDirective);
/* File : src/app/Tuning/Resource/TuningResource.js */ 
/**
 * Resource : Tuning
 *
 * @param $http
 * @param $q
 * @param $api
 * @constructor
 */
var TuningResource = function TuningResource($http, $q, $api) {
    // Call parent constructor
    ApiResource.apply(this, arguments);
};

// Extends ApiResource
TuningResource.prototype = Object.create(ApiResource.prototype);
TuningResource.$inject = ApiResource.$inject;

/**
 * Type of the Resource
 * @type {string}
 */
TuningResource.prototype.type = 'tuning';

/**
 * Path of the API resource
 * @type {string}
 */
TuningResource.prototype.path = '/tunings/{id}';

// Register service into Angular JS
angular
    .module('Tuning')
    .service('TuningResource', TuningResource);

/* File : src/app/Tuning/translations.js */ 
/**
 * Tuning translations
 * @type {Object}
 */
var tuningTranslations = {};

/**
 * Language = EN
 */
tuningTranslations['en'] = {
    // T
    tuning_select     : 'select a tuning'
};

/**
 * Language = FR
 */
tuningTranslations['fr'] = {
    // T
    tuning_select     : 'sélectionner un accordage'
};
/* File : src/app/User/Controller/ProfileController.js */ 
/**
 * Profile Controller
 * @constructor
 */
var ProfileController = function ProfileController() {

};

// Set up dependency injection
ProfileController.$inject = [];

// Register controller into Angular JS
angular
    .module('User')
    .controller('ProfileController', ProfileController);

/* File : src/app/User/Controller/SettingsController.js */ 
/**
 * Settings Controller
 * @constructor
 */
var SettingsController = function SettingsController() {

};

// Set up dependency injection
SettingsController.$inject = [];

// Register controller into Angular JS
angular
    .module('User')
    .controller('SettingsController', SettingsController);

/* File : src/app/User/Directive/MenuDirective.js */ 
/**
 * User menu
 */
angular
    .module('User')
    .directive('userMenu', [
        '$client',
        function ($client) {
            return {
                restrict: 'E',
                templateUrl: $client.getPartial('menu.html', 'app/User'),
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
/* File : src/app/User/routes.js */ 
/**
 * User routes
 */
angular.module('User').config([
    '$routeProvider',
    '$clientProvider',
    function UserRoutes($routeProvider, $clientProvider) {
        // Users list
        $routeProvider
            .when('/users', {
                templateUrl:  $clientProvider.getPartial('list.html', 'app/User'),
                controller:   'ListViewController',
                controllerAs: 'listViewCtrl'
            });

        // Current User profile
        $routeProvider
            .when('/profile', {
                templateUrl:  $clientProvider.getPartial('profile.html', 'app/User'),
                controller:   'ProfileController',
                controllerAs: 'profileCtrl'
            });

        // Current User settings
        $routeProvider
            .when('/profile/settings', {
                templateUrl:  $clientProvider.getPartial('settings.html', 'app/User'),
                controller:   'SettingsController',
                controllerAs: 'settingsCtrl'
            });
    }
]);
/* File : src/app/routes.js */ 
/**
 * Application routes
 * Defines all routes for the Application
 */
angular
    .module('App')
    .config([
        '$routeProvider',
        '$clientProvider',
        function AppConfig($routeProvider, $clientProvider) {
            $routeProvider
                // Page not found
                .when('/page_not_found', {
                    templateUrl: $clientProvider.getPartial('Error/page_not_found.html', 'core/Layout', true)
                })

                // Default Server 5xx errors
                .when('/error_server', {
                    templateUrl: $clientProvider.getPartial('Error/server.html', 'core/Layout', true)
                })

                // Redirect to Page not found
                .otherwise({
                    redirectTo: '/page_not_found'
                })
        }
    ]);
/* File : src/app/translations.js */ 
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
/* File : src/parameters.js */ 
/**
 * Defines parameters of the Application
 */
angular
    .module('AppConfiguration', [])

    // Configure API access
    .constant('apiConfiguration', {
        basePath   : 'MusicTools/web/app_dev.php',
        uploadPath : 'MusicTools/web'
    })

    // Configure Client
    .constant('clientConfiguration', {
        basePath: '/MusicTools/web/client'
    });
})();