'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    express: {
      dev: {
        options: {
          script: 'app/server.js',
          port: 8000,
          node_env: 'development'
        }
      }
    },
    mochaTest: {
      all: {
        options: {
          reporter: 'spec',
          require: 'should'
        },
        src: ['test/**/*_test.js']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['app/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'app/assets/stylesheets',
          src: ['*.scss'],
          dest: 'public/assets',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: '<%= sass.dev.files %>'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
        options: {
          livereload: true
        }
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib'],
        options: {
          livereload: true
        }
      },
      express: {
        files:  [ 'app/**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          nospawn: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest']);

  grunt.registerTask('server', ['express:dev', 'watch']);

};
