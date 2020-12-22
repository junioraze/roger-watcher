/*global module:false*/
module.exports = (grunt) => {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner:
      '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
    replace: {
      compile: {
        src: 'src/*.html',
        dest: 'dist/',
        replacements: [
          {
            from: /<!-- @dev-css [\s\S]*? dev-css@ -->/gim,
            to: '<link rel="stylesheet" type="text/css" href="css/all.css"/>',
          },
          {
            from: /<!-- @dev-js [\s\S]*? dev-js@ -->/gim,
            to: '<script src="js/jquery.js"></script><script src="js/all.js"></script>',
          },
          {
            from: /<!-- @dev-jsbowser [\s\S]*? dev-jsbowser@ -->/gim,
            to: `<script src="js/jquery.js"></script>
            <script src="js/jspdf.min.js"/>
            <script src="js/html2canvas.js"/>
            <script src="js/allbowserjr.js">
            </script><script type="module" src="js/bowserjr.js">
            </script><script type="module" src="js/ajv.js">
            </script><script type="module" src="js/schema_parser.js"></script>`,
          },
        ],
      },
    },
    cssmin: {
      combine: {
        files: {
          'dist/css/all.css': ['src/css/normalize.css', 'src/css/style.css'],
        },
      },
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
      },
      dist: {
        files: {
          'dist/js/all.js': [
            'src/js/rules.js',
            'src/js/metadata.js',
            'src/js/script.js',
            'src/js/eventos.js',
            'src/js/tagueamentoBowser.js',
          ],
          'dist/js/allbowserjr.js': [
            // 'src/js/ajv.min.js',
            'src/js/scriptsBowser.js',
            'src/js/eventos.js',
            'src/js/ludwig.js',
            'src/js/tagueamentoBowser.js'
          ],
          'dist/js/devtools.js': 'src/js/devtools.js',
          'dist/js/jspdf.min.js':'src/js/jspdf.min.js',
          'dist/js/bowserjr.js': 'src/js/bowserjr.js',
          'dist/js/ajv.js': 'src/js/ajv.js',
          'dist/js/ajv.min.js': 'src/js/ajv.min.js',
          'dist/js/schema_parser.js': 'src/js/schema_parser.js',
          'dist/js/bowserContentScript.js':'src/js/bowserContentScript.js',
          'dist/js/background.js':'src/js/background.js',
        },
      },
    },
    jshint: {
      options: grunt.file.readJSON('jshint.json'),
      gruntfile: {
        src: 'Gruntfile.js',
      },
      js: {
        src: ['src/js/script.js', 'src/js/eventos.js', 'src/js/tagueamento.js'],
      },
    },
    copy: {
      compile: {
        files: [
          {
            cwd: 'src/',
            expand: true,
            src: ['manifest.json', 'icons/*', 'img/*', 'js/jquery.js', 'devtools.html'],
            dest: 'dist/',
          },
        ],
      },
    },
    clean: ['dist'],
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task.
  grunt.registerTask('html', ['replace']);
  grunt.registerTask('css', ['cssmin']);
  grunt.registerTask('js', ['concat', 'jshint']);
  grunt.registerTask('default', ['clean', 'html', 'css', 'js', 'copy']);
};
