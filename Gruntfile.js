'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    express: {
      dev: {
        options: {
          script: './app/server.js'
        }
      },
      prod: {
        options: {
          script: './app/server.js',
          node_env: 'production'
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
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile', 'mochaTest']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'mochaTest']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochaTest']
      },
      express: {
        files:  [ 'app/**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-express-server');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest']);

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('server', [ 'express:dev', 'watch' ]);

};
