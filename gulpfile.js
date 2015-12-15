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

var gulp       = require('gulp');
var exec       = require('child_process').execSync;
var sourcemaps = require('gulp-sourcemaps');
var merge      = require('merge-stream');
var concat     = require('gulp-concat');
var assign     = require('lodash.assign');
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
  markdown:   require('metalsmith-markdown'),
  layouts:    require('metalsmith-layouts'),
  permalinks: require('metalsmith-permalinks'),
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
    .pipe(gulp.dest('./assets/css/'))
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
// Task: Generate
// -----------------------------------------------------------------------------

gulp.task('generate', function () {

  var posts = gulp.src('./posts/md/podcasts-i-listen-to.md');

  var extendWithFrontmatter = function (file) {
    assign(file, file.frontMatter);
    delete file.frontMatter;
  };

  var postData = posts.pipe(frontmatter()).on('data', extendWithFrontmatter);

  return postData
    .pipe(
        gulpsmith()
          .use(metalsmithPlugins.permalinks(':title'))
          .use(metalsmithPlugins.markdown())
          .use(metalsmithPlugins.layouts({
            engine:   'handlebars',
            default:  'post.hbs',
          }))
    )
    .pipe(gulp.dest("./public"))
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

  gulp.start('css', 'watch');

});

