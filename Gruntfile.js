module.exports = function(grunt) {
    // Do grunt-related things in here
    grunt.initConfig({
        // Bower_concat creates a single file out of all the bower_component files that are specified as main files in the bower.json of the project
        bower_concat: {
            all: {
                dest: 'public/bower.js',
                cssDest: 'bower.css',
                // Checks if there is minified version in which case it uses that one
                callback: function(mainFiles, component) {
                    return mainFiles.map(function(filepath) {
                        // Use minified files if available
                        var min = filepath.replace(/\.js$/, '.min.js');
                        return grunt.file.exists(min) ? min : filepath;
                    });
                }

            }
        },
        // Concat is for generating a single file which contains all of the projects js and css files
        concat: {
            options: {
                // Define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // The files to concatenate
                src: ['main.js', 'components/verb_app/verb_app.js', 'components/**/*.js', 'routes/*.js', 'shared/**/*.js'],
                // the location of the resulting JS file
                dest: 'public/build.js'
            }
        },
        less: {
            development: {
                files: {
                    "public/build.css": "assets/styles/main.less"
                }
            }
        },
        // Watch keeps track of changes to the specified files. When there is a change, the task(s) are run
        // We want the concat task to run whenever any js files is changed and we want the less task to run
        // whenever any less file is changed
        watch: {
            scripts: {
                // files to watch
                files: ['**/*.js'],
                tasks: ['concat']
            },
            styles: {
                files: ['assets/styles/*.less'],
                tasks: ['less']
            }
        }
    })

    // This loads the grunt plugins
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // the default task can be run just by typing "grunt" on the command line
    // This runs the task with the same name inside of initConfig
    grunt.registerTask('default', ['bower_concat', 'concat', 'less']);

    // Run grunt build to generate the js build file (which contains all of the project js) and css build file
    grunt.registerTask('build', ['concat', 'less']);
};
