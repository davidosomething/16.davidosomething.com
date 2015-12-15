/**
 * gulpfile.js
 *
 * Build tasks for davidosomething.com
 *
 * @author David O'Trakoun <me@davidosomething.com>
 */

'use strict';


// =============================================================================
// Requires
// =============================================================================

require('harmonize')(); // metalsmith uses ES6

// -----------------------------------------------------------------------------
// Require: Gulp and node utils
// -----------------------------------------------------------------------------

var exec       = require('child_process').execSync;
var assign     = require('lodash.assign');
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var concat     = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge      = require('merge-stream');
var through    = require('through2');

// -----------------------------------------------------------------------------
// Require: CSS
// -----------------------------------------------------------------------------

var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');
var cssnano      = require('cssnano');


// -----------------------------------------------------------------------------
// Require: Static Generation
// -----------------------------------------------------------------------------

var gulpsmith   = require('gulpsmith');
var frontmatter = require('gulp-front-matter');
var metalsmithPlugins = {
  branch:       require('metalsmith-branch'),
  collections:  require('metalsmith-collections'),
  markdown:     require('metalsmith-markdown'),
  layouts:      require('metalsmith-layouts'),
  permalinks:   require('metalsmith-permalinks'),
};


// =============================================================================
// Tasks
// =============================================================================

// -----------------------------------------------------------------------------
// Task: CSS
// -----------------------------------------------------------------------------

gulp.task('css', function () {

  var globalSass = gulp
    .src('./assets/scss/global.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions']
      }),
    ]))
    ;

  var normalizeCss = gulp
    .src('./assets/jspm/github/necolas/normalize.css@3.0.3/normalize.css')
    ;

  return merge(normalizeCss, globalSass)
    .pipe(concat('global.css'))
    .pipe(postcss([ cssnano ]))
    .pipe(gulp.dest('./public/assets/css/'))
    ;

});

// -----------------------------------------------------------------------------
// Task: JS
// -----------------------------------------------------------------------------

gulp.task('js', function () {
  exec('npm run js', function (err, stdout, stderr) {
    if (err) {
      throw err;
    }
    else {
      console.log('Build complete!');
    }
  });
});


// -----------------------------------------------------------------------------
// Task: Assets
// -----------------------------------------------------------------------------

gulp.task('assets', function () {
  gulp.src('./assets/{fonts,img}/**')
    .pipe(gulp.dest('./public/assets/'));
});


// -----------------------------------------------------------------------------
// Task: HTML
// -----------------------------------------------------------------------------

gulp.task('html', function () {
  var extendWithFrontmatter = function (file) {
    assign(file, file.frontMatter);
    delete file.frontMatter;
  };

  var md = gulp.src('./md/**');
  var data = md.pipe(frontmatter()).on('data', extendWithFrontmatter);

  // Generate
  data
    .pipe(
      gulpsmith()
        .use(metalsmithPlugins.markdown()) // files are html now
        .use(metalsmithPlugins.collections({
          pages: {
            pattern: 'pages/**',
          },
          posts: {
            pattern: 'posts/**',
          }
        }))
        .use(metalsmithPlugins.branch('posts/**')
          .use(metalsmithPlugins.permalinks('blog/:title'))
        )
        .use(metalsmithPlugins.branch('pages/**')
        )
        .use(metalsmithPlugins.layouts({
          engine:    'handlebars',
          directory: 'hbs/pages/',
          partials:  'hbs/partials/',
          default:   'post.hbs',
        }))
    )
    .pipe(gulp.dest('./public'))
    ;

});

// -----------------------------------------------------------------------------
// Task: Watch
// -----------------------------------------------------------------------------

gulp.task('watch', function () {
  var sassWatcher = gulp.watch('./assets/scss/**/*.scss', [ 'css' ]);
});

// -----------------------------------------------------------------------------
// Task: Default
// -----------------------------------------------------------------------------

gulp.task('default', function () {

  gulp.start('js', 'css', 'assets', 'html', 'watch');

});

