module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        curly: true,
        latedef: 'nofunc',
        laxcomma: false,
        globals: {
          jQuery: true,
          browser: true,
          XO: true
        },
        newcap: true,
        maxcomplexity: 25,
        strict: true,
        evil: true

      },

      all: ['xo.ads.gpt.js', 'xo.metadata.js', 'xo.content.metadata.js']
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= pkg.version %> updated: <%= grunt.template.today("yyyy-mm-dd") %>*/\n',
        sourceMap: false
      },
      build: {
        src: 'xo.ads.gpt.js',
        dest: 'build/javascripts/xo.ads.gpt.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  // Default task(s).
   grunt.registerTask('default', ['uglify','jshint']);

};