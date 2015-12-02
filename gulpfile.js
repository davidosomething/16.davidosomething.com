'use strict';

var gulp        = require('gulp');
var exec        = require('child_process').execSync;
var sourcemaps  = require('gulp-sourcemaps');

// =============================================================================
// Require: CSS
// =============================================================================
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');
var cssnano      = require('cssnano');

// =============================================================================
// Require: Stream manip
// =============================================================================
var merge  = require('merge-stream');
var concat = require('gulp-concat');

// =============================================================================
// Task: CSS
// =============================================================================

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
    .pipe(gulp.dest('./assets/css/'))
    ;

});

// =============================================================================
// Task: JS
// =============================================================================
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

// =============================================================================
// Task: Default
// =============================================================================

gulp.task('default', function () {

  gulp.start('css');

});
