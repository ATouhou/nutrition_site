module.exports = function(grunt) {
    // Do grunt-related things in here
    grunt.initConfig({
        bower_concat: {
            all: {
                dest: 'bower.js',
                cssDest: 'bower.css',
                callback: function(mainFiles, component) {
                    return mainFiles.map(function(filepath) {
                        // Use minified files if available
                        var min = filepath.replace(/\.js$/, '.min.js');
                        return grunt.file.exists(min) ? min : filepath;
                    });
                }

            }
        }
    })

    // This loads the grunt plugin
    grunt.loadNpmTasks('grunt-bower-concat');

    // the default task can be run just by typing "grunt" on the command line
    // This runs the task with the same name inside of initConfig
    grunt.registerTask('default', ['bower_concat']);
};
