module.exports = function (grunt) {

    // All upfront config goes in a massive nested object.
    grunt.initConfig({
        distFolder: 'public',

        // Concatenate JS task
        concat: {
            // Common options for all concatenate task
            options: {
                process: function(src, filepath) {
                    return '// File : ' + filepath + '\n' + src;
                }
            },

            // Concatenate libraries
            lib: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/angular-translate/angular-translate.js',
                    'bower_components/messageformat/messageformat.js',
                    'bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
                    'bower_components/angular-loading-bar/build/loading-bar.js',
                    'bower_components/ng-file-upload/ng-file-upload-shim.js',
                    'bower_components/ng-file-upload/ng-file-upload.js',
                    'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
                    'bower_components/AlphaTab/Build/JavaScript/AlphaTab.js',
                    'bower_components/AlphaTab/Build/JavaScript/jquery.alphaTab.js'
                ],
                dest: '<%= distFolder %>/js/lib.js'
            },

            lib_min: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/angular-translate/angular-translate.min.js',
                    'bower_components/messageformat/messageformat.js',
                    'bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.min.js',
                    'bower_components/angular-loading-bar/build/loading-bar.min.js',
                    'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
                    'bower_components/ng-file-upload/ng-file-upload.min.js',
                    'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                    'bower_components/AlphaTab/Build/JavaScript/AlphaTab.min.js',
                    'bower_components/AlphaTab/Build/JavaScript/jquery.alphaTab.js'
                ],
                dest: '<%= distFolder %>/js/lib.min.js'
            },

            // Concatenate app
            app: {
                // Wrap all application into an anonymous auto-callable function using 'use strict' env ( as recommended for angular app)
                options: {
                    banner: '(function() {\n"use strict";\n',
                    footer: '\n})();'
                },
                src: [
                    // Load modules files
                    'app/**/module.js',

                    // Load app root file when all other modules are loaded
                    'app/app.js',

                    // Load src code
                    'app/Utilities/**/*.js',
                    'app/**/*.js',

                    // Load routes
                    'app/**/routes.js'

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

        // Compile LESS files task
        less: {
            options: {
                compress: true,
                yuicompress: true,
                optimization: 2
            },

            app: {
                src: [
                    'less/app/app.less'
                ],
                dest: '<%= distFolder %>/css/app.min.css'
            }
        },

        // Copy fonts in public directory
        copy: {
            glyphicon: {
                src: [
                    'bower_components/bootstrap/fonts/*'
                ],
                dest: '<%= distFolder %>/fonts/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },

            font_awesome: {
                src: [
                    'bower_components/font-awesome/fonts/*'
                ],
                dest: '<%= distFolder %>/fonts/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },

            music_font: {
                src: [
                    'less/fonts/MusicFont/fonts/*'
                ],
                dest: '<%= distFolder %>/fonts/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            }
        },

        // Watcher
        watch: {
            js: {
                files: [
                    'app/**/*.js'
                ],
                tasks: ['concat', 'uglify']
            },

            less: {
                files: [
                    'less/**/*.less'
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