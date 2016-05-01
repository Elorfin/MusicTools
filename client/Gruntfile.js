/**
 * Project builder
 */
module.exports = function (grunt) {
    // All upfront config goes in a massive nested object.
    grunt.initConfig({
        libFolder    : 'bower_components',
        distFolder   : 'public/dist',
        clientFolder : '.',

        // Compile LESS files task
        less: {
            options: {
                compress: true,
                yuicompress: true
            },

            // Application styles
            app: {
                src: [
                    '<%= clientFolder %>/back/styles/app.less'
                ],
                dest: '<%= distFolder %>/css/theme.min.css'
            }
        },

        // Concatenate files
        concat: {
            // Common options for all concatenate task
            options: {
                process: function(src, filepath) {
                    return '/* File : ' + filepath + ' */ \n' + src;
                }
            },

            // Concatenate CSS
            css: {
                src: [
                    // Loading bar
                    /*'<%= libFolder %>/angular-loading-bar/build/loading-bar.css',*/
                    // AlphaTab
                    /*'<%= libFolder %>/AlphaTab/Build/JavaScript/AlphaTab.css',*/
                    // Application styles
                    '<%= distFolder %>/css/theme.min.css'
                ],
                dest: '<%= distFolder %>/css/app.min.css'
            },

            // Concatenate JS libraries
            lib: {
                src: [
                    '<%= libFolder %>/jquery/dist/jquery.js',
                    '<%= libFolder %>/angular/angular.js',
                    '<%= libFolder %>/angular-route/angular-route.js',
                    '<%= libFolder %>/angular-animate/angular-animate.js',
                    '<%= libFolder %>/angular-sanitize/angular-sanitize.js',
                    '<%= libFolder %>/angular-bootstrap/ui-bootstrap-tpls.js',
                    '<%= libFolder %>/angular-translate/angular-translate.js',
                    '<%= libFolder %>/messageformat/messageformat.js',
                    '<%= libFolder %>/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
                    '<%= libFolder %>/angular-loading-bar/build/loading-bar.js',
                    '<%= libFolder %>/tinymce-dist/tinymce.js',
                    '<%= libFolder %>/angular-ui-tinymce/src/tinymce.js',
                    '<%= libFolder %>/ng-file-upload/ng-file-upload-shim.js',
                    '<%= libFolder %>/ng-file-upload/ng-file-upload.js',
                    '<%= libFolder %>/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
                    '<%= libFolder %>/AlphaTab/Build/JavaScript/AlphaTab.js',
                    '<%= libFolder %>/AlphaTab/Build/JavaScript/jquery.alphaTab.js'
                ],
                dest: '<%= distFolder %>/js/lib.js'
            },

            lib_min: {
                src: [
                    '<%= libFolder %>/jquery/dist/jquery.min.js',
                    '<%= libFolder %>/angular/angular.min.js',
                    '<%= libFolder %>/angular-route/angular-route.min.js',
                    '<%= libFolder %>/angular-animate/angular-animate.min.js',
                    '<%= libFolder %>/angular-sanitize/angular-sanitize.min.js',
                    '<%= libFolder %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    '<%= libFolder %>/angular-translate/angular-translate.min.js',
                    '<%= libFolder %>/messageformat/messageformat.js',
                    '<%= libFolder %>/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.min.js',
                    '<%= libFolder %>/angular-loading-bar/build/loading-bar.min.js',
                    '<%= libFolder %>/tinymce-dist/tinymce.min.js',
                    '<%= libFolder %>/angular-ui-tinymce/src/tinymce.js',
                    '<%= libFolder %>/ng-file-upload/ng-file-upload-shim.min.js',
                    '<%= libFolder %>/ng-file-upload/ng-file-upload.min.js',
                    '<%= libFolder %>/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                    '<%= libFolder %>/AlphaTab/Build/JavaScript/AlphaTab.min.js',
                    '<%= libFolder %>/AlphaTab/Build/JavaScript/jquery.alphaTab.js'
                ],
                dest: '<%= distFolder %>/js/lib.min.js'
            },

            // Concatenate JS Application
            app: {
                // Wrap all application into an anonymous auto-callable function using 'use strict' env ( as recommended for angular app)
                options: {
                    banner: '(function() {\n"use strict";\n',
                    footer: '\n})();'
                },
                src: [
                    // Load core
                    '<%= clientFolder %>/back/core/**/module.js',
                    '<%= clientFolder %>/back/core/core.js',
                    '<%= clientFolder %>/back/core/**/*.js',

                    // Load app
                    '<%= clientFolder %>/back/app/**/module.js',
                    '<%= clientFolder %>/back/app/app.js',
                    '<%= clientFolder %>/back/app/**/*.js',

                    // Load configuration
                    '<%= clientFolder %>/back/parameters.js',

                    // Load routes
                    '<%= clientFolder %>/back/**/routes.js'
                ],
                dest: '<%= distFolder %>/js/app.js'
            }
        },

        // Uglify JS task
        uglify: {
            // Uglify app
            app: {
                src: [
                    '<%= distFolder %>/js/app.js'
                ],
                dest: '<%= distFolder %>/js/app.min.js'
            }
        },

        // Copy fonts in public directory
        copy: {
            glyphicon: {
                src: [
                    '<%= libFolder %>/bootstrap/fonts/*'
                ],
                dest: '<%= distFolder %>/fonts/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },

            font_awesome: {
                src: [
                    '<%= libFolder %>/font-awesome/fonts/*'
                ],
                dest: '<%= distFolder %>/fonts/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },

            music_font: {
                src: [
                    '<%= clientFolder %>/styles/music-font/fonts/*'
                ],
                dest: '<%= distFolder %>/fonts/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },

            tiny_mce: {
                cwd: '<%= libFolder %>/tinymce-dist/',
                src: [
                    'plugins/**/*',
                    'skins/**/*',
                    'themes/**/*'
                ],
                dest: '<%= distFolder %>/js/',
                expand: true
            },

            images: {
                cwd: '<%= clientFolder %>/images/',
                src: [
                    '**/*'
                ],
                dest: '<%= distFolder %>/images/',
                expand: true
            },

            html: {
                cwd: '<%= clientFolder %>/back/',
                src: [
                    '**/Partial/**/*'
                ],
                dest: '<%= distFolder %>/html/',
                expand: true
            }
        },

        // Watcher
        watch: {
            js: {
                files: [
                    '<%= clientFolder %>/back/**/*.js'
                ],
                tasks: ['concat', 'uglify']
            },

            html: {
                files: [
                    '<%= clientFolder %>/back/**/*.html',
                    '<%= clientFolder %>/images/*'
                ],
                tasks: ['copy']
            },

            less: {
                files: [
                    '<%= clientFolder %>/styles/**/*.less'
                ],
                tasks: [ 'less' ]
            }
        }
    });

    // Load Grunt task runners
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register our own custom task alias.
    grunt.registerTask('build', ['copy', 'concat', 'uglify', 'less']);
};