'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodemon: {
      dev: {
        options: {
          file: 'app/server.js',
          watchedExtensions: ['js'],
          watchedFolders: ['app'],
          delayTime: 1,
          env: {
            PORT: '8000'
          },
          cwd: __dirname
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
        tasks: ['jshint:gruntfile', 'mochaTest'],
        options: {
          livereload: true
        }
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'mochaTest'],
        options: {
          livereload: true
        }
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochaTest'],
        options: {
          livereload: true
        }
      }
    },
    concurrent: {
      target: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest']);

  grunt.registerTask('server', ['concurrent:target']);

};
