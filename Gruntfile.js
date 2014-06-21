module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * opm-theme v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n\n',
    // Task configuration.
    clean: {
      dist: ['dist']
    },
    less: {
      dev: {
        options: {
          strictMath: true,
          sourceMap: true,
        },
        files: {
          'dist/<%= pkg.name %>.css': '<%= pkg.name %>.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min',
        },
        files: {
          'dist/<%= pkg.name %>.min.css': 'dist/<%= pkg.name %>.css',
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      full: {
        src: 'dist/<%= pkg.name %>.css',
        dest: 'dist/<%= pkg.name %>.css',
      },
      min: {
        src: 'dist/<%= pkg.name %>.min.css',
        dest: 'dist/<%= pkg.name %>.min.css',
      }
    }
  });
  // This plugin provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  // Tasks
  grunt.registerTask('dist', ['clean', 'less', 'concat']);
}
