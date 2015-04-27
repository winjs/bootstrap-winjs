module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        force: true
      },
      all: ['dist/']
    },

    fileExists: {
      css: ['dist/css/bootstrap-winjs.css']
    },

    sass: {
      options: {
        outputStyle: 'nested',
        sourceMap: true,
        precision: 5
      },
      dist: {
        files: {
            'dist/css/bootstrap-winjs.css': 'src/scss/bootstrap-winjs.scss',
            'dist/css/bootstrap-winjs-dark.css': 'src/scss/bootstrap-winjs-dark.scss'
        }
      }
    },

    // Copy doc files
    copy: {
      assets: {
        files: [
        {
          expand: true,
          cwd: 'src/fonts/',
          src: '*',
          dest: 'dist/fonts/'
        },
        {
          expand: true,
          cwd: 'src/images/',
          src: '*',
          dest: 'dist/images/'
        }
        ]
      },
      doc: {
        files: [
        {
          expand: true,
          cwd: 'src/js/',
          src: 'app.js',
          dest: 'dist/js/'
        },
        {
          expand: true,
          cwd: 'node_modules/jquery/dist/',
          src: 'jquery.min.js',
          dest: 'dist/js/vendor/'
        },
        {
          expand: true,
          cwd: 'node_modules/html5shiv/dist/',
          src: 'html5shiv.min.js',
          dest: 'dist/js/vendor/'
        },
        {
          expand: true,
          cwd: 'node_modules/respond.js/dest/',
          src: 'respond.min.js',
          dest: 'dist/js/vendor/'
        },
        {
          expand: true,
          cwd: 'node_modules/bootstrap-sass/assets/javascripts/',
          src: 'bootstrap.min.js',
          dest: 'dist/js/vendor/'
        }
        ]
      }
    },

    // Build the main HTML file of the style guide
    assemble: {
      options: {
        partials: ['src/doc/partials/**/*.hbs'],
        layout: ['src/doc/layouts/default.hbs'],
        flatten: true,

        // Set the version number
        version: '<%= pkg.version %>',

        // Name of the project
        name: '<%= pkg.name %>',
      },
      pages: {
        src: ['src/doc/*.hbs'],
        dest: './dist/'
      }
    },

    watch: {
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      },

      doc: {
        files: ['src/doc/**/*', 'src/js/*.js'],
        tasks: ['assemble', 'copy:doc']
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: './dist/'
        }
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-file-exists');

  grunt.registerTask('default', ['clean', 'sass', 'assemble', 'copy', 'fileExists']);
  grunt.registerTask('server', ['connect', 'watch']);

}
