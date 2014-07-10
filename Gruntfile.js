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
      dist: ['dist','report']
    },
    copy: {
      fonts: {
        expand: 'true',
        cwd: 'res/',
        filter: 'isFile',
        src: '**',
        dest: 'dist/'
      }
    },
    less: {
      dev: {
        options: {
          strictMath: true,
          sourceMap: false,
        },
        files: {
          'dist/css/<%= pkg.name %>.css': '<%= pkg.name %>.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min',
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css',
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      full: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.css',
      },
      min: {
        src: 'dist/css/<%= pkg.name %>.min.css',
        dest: 'dist/css/<%= pkg.name %>.min.css',
      }
    },
    csslint: {
      options: {
        csslintrc: './.csslintrc',
        formatters: [
          {id: 'lint-xml', dest: 'report/lint.xml'},
          {id: 'checkstyle-xml', dest: 'report/checkstyle.xml'}
        ]
      },
      src: 'dist/css/<%= pkg.name %>.css'
    }
  });
  // This plugin provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  // Tasks
  grunt.registerTask('default', ['clean', 'copy','less', 'concat']);
  grunt.registerTask('test', ['clean', 'less', 'concat', 'csslint']);
}
