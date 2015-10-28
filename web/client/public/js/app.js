(function() {
"use strict";
// File : app/Advertisement/module.js
/**
 * Advertisement Module
 */
angular.module('Advertisement', []);
// File : app/Badge/module.js
/**
 * Badge Module
 */
angular.module('Badge', []);
// File : app/Form/module.js
/**
 * Form Module
 */
angular.module('Form', []);
// File : app/Forum/module.js
/**
 * Forum Module
 */
angular.module('Forum', []);
// File : app/Game/module.js
/**
 * Game Module
 */
angular.module('Game', []);
// File : app/Instrument/module.js
/**
 * Instrument Module
 */
angular.module('Instrument', []);
// File : app/Layout/module.js
/**
 * Layout Module
 * Contains all the tools for building the Layout of the application (header, sidebar, etc.)
 */
angular.module('Layout', []);
// File : app/Lesson/module.js
/**
 * Lesson Module
 */
angular.module('Lesson', []);
// File : app/SongBook/module.js
/**
 * SongBook Module
 */
angular.module('SongBook', []);
// File : app/Theory/module.js
/**
 * Theory Module
 */
angular.module('Theory', []);
// File : app/Tuning/module.js
/**
 * Tuning module
 */
angular.module('Tuning', []);
// File : app/User/module.js
/**
 * User Module
 */
angular.module('User', []);
// File : app/app.js
/**
 * Workspace Application Root
 * Initializes needed modules in the Angular application
 */
angular.module('MusicTools', [
    'ngRoute',
    'ngAnimate',

    'ui.bootstrap',
    /*'ui.scrollable',*/

    // Core features
    'Layout',
    'Form',

    // Modules
    'Advertisement',
    'Badge',
    'Forum',
    'Game',
    'Instrument',
    'Lesson',
    'SongBook',
    'Theory',
    'Tuning',
    'User'

    /*'Note',
    'Guitar',
    'GuitarNeck',
    'SheetMusic'*/
]);
// File : app/Advertisement/routes.js
/**
 * Advertisement routes
 */
angular.module('Advertisement').config([
    '$routeProvider',
    function AdvertisementRoutes($routeProvider) {

    }
]);
// File : app/Badge/routes.js
/**
 * Badge routes
 */
angular.module('Badge').config([
    '$routeProvider',
    function BadgeRoutes($routeProvider) {

    }
]);
// File : app/Forum/routes.js
/**
 * Forum routes
 */
angular.module('Forum').config([
    '$routeProvider',
    function ForumRoutes($routeProvider) {

    }
]);
// File : app/Game/routes.js
/**
 * Game routes
 */
angular.module('Game').config([
    '$routeProvider',
    function GameRoutes($routeProvider) {

    }
]);
// File : app/Instrument/routes.js
/**
 * Instrument routes
 */
angular.module('Instrument').config([
    '$routeProvider',
    function InstrumentRoutes($routeProvider) {

    }
]);
// File : app/Lesson/routes.js
/**
 * Lesson routes
 */
angular.module('Lesson').config([
    '$routeProvider',
    function LessonRoutes($routeProvider) {

    }
]);
// File : app/SongBook/routes.js
/**
 * SongBook routes
 */
angular.module('SongBook').config([
    '$routeProvider',
    function SongBookRoutes($routeProvider) {

    }
]);
// File : app/Theory/routes.js
/**
 * Theory routes
 */
angular.module('Theory').config([
    '$routeProvider',
    function TheoryRoutes($routeProvider) {

    }
]);
// File : app/User/routes.js
/**
 * User routes
 */
angular.module('User').config([
    '$routeProvider',
    function UserRoutes($routeProvider) {

    }
]);
// File : app/routes.js
/**
 * Workspace Application routes
 * Defines all routes for the Application
 */
angular.module('MusicTools').config([
    '$routeProvider',
    function MusicToolsConfig($routeProvider) {

    }
]);
// File : app/Instrument/Directive/HeaderMenuDirective.js
/**
 * Instrument menu
 * Used to select the current instrument, and if relevant the tuning (e.g. for Guitar or Bass)
 */
angular
    .module('Instrument')
    .directive('instrumentHeaderMenu', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Instrument/Partial/header-menu.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Instrument/Service/GuitarService.js
(function () {
    'use strict';

    /**
     * Guitar Service
     * @constructor
     */
    var GuitarService = function () {

    };

    GuitarService.prototype = {
        /**
         * Current selected guitar
         * @var {Object} current
         */
        current: null,

        /**
         * Get the current selected Guitar
         * @returns {Object}
         */
        getCurrent: function getCurrent() {
            return this.current;
        },

        /**
         * Set the current selected Guitar
         * @param {Object} guitar
         */
        setCurrent: function (guitar) {
            this.current = guitar;
        },

        /**
         * List all Guitars of the current User
         * @returns {Array}
         */
        list: function list() {
            return [];
        }
    };

    // Inject controller object into Angular
    angular
        .module('Instrument')
        .factory('GuitarService', GuitarService);
})();
// File : app/Layout/Directive/HeaderDirective.js
/**
 * Header of the application
 */
angular
    .module('Layout')
    .directive('layoutHeader', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/header.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Layout/Directive/SidebarDirective.js
/**
 * Sidebar of the application
 */
angular
    .module('Layout')
    .directive('layoutSidebar', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/sidebar.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Layout/Directive/SidebarItemDirective.js
/**
 * Sidebar of the application
 */
angular
    .module('Layout')
    .directive('layoutSidebarItem', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/Layout/Partial/sidebar-item.html',
                replace: true,
                scope: {
                    icon  : '@',
                    label : '@',
                    url   : '@'
                },
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
// File : app/Tuning/tuning-widget.js
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
// File : app/User/Directive/HeaderMenuDirective.js
/**
 * User menu
 */
angular
    .module('User')
    .directive('userHeaderMenu', [
        function () {
            return {
                restrict: 'E',
                templateUrl: '../app/User/Partial/header-menu.html',
                replace: true,
                scope: {},
                link: function (scope, element, attrs) {

                }
            };
        }
    ]);
})();