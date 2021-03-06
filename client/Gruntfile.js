/**
 * Project builder
 */
module.exports = function (grunt) {
    // All upfront config goes in a massive nested object.
    grunt.initConfig({
        libFolder    : 'node_modules',
        distFolder   : 'public/dist',
        clientFolder : '.',

        // Compile SASS
        sass: {
            // Application styles
            app: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= distFolder %>/css/app.css': '<%= clientFolder %>/styles/main.scss'
                }
            }
        },

        // Copy fonts in public directory
        copy: {
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

            images: {
                cwd: '<%= clientFolder %>/images/',
                src: [
                    '**/*'
                ],
                dest: '<%= distFolder %>/images/',
                expand: true
            },

            html: {
                cwd: '<%= clientFolder %>/src/',
                src: [
                    '**/*.html'
                ],
                dest: '<%= distFolder %>/',
                expand: true
            }
        }
    });

    // Load Grunt task runners
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Register our own custom task alias.
    grunt.registerTask('build', ['sass', 'copy']);
};