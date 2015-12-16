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

require('harmonize')();   // metalsmith uses ES6

// -----------------------------------------------------------------------------
// Require: Gulp and node utils
// -----------------------------------------------------------------------------

var util       = require('util');
var exec       = require('child_process').execSync;
var debug      = require('debug'); // DEBUG=gulp gulp to output
var assign     = require('lodash.assign');
var omit       = require('lodash.omit');
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var concat     = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge      = require('merge-stream');

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

var slug        = require('slug');
var gulpsmith   = require('gulpsmith');
var metalsmithPlugins = {
  branch:          require('metalsmith-branch'),
  collections:     require('metalsmith-collections'),
  ignore:          require('metalsmith-ignore'),
  layouts:         require('metalsmith-layouts'),
  markdown:        require('metalsmith-markdown'),
  matters:         require('metalsmith-matters'),
  paths:           require('metalsmith-paths'),
  permalinks:      require('metalsmith-permalinks'),
  registerHelpers: require('metalsmith-register-helpers'),
  snippet:         require('metalsmith-snippet'),
  summary:         require('metalsmith-summary'),
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
    ]));

  var normalizeCss = gulp
    .src('./assets/jspm/github/necolas/normalize.css@3.0.3/normalize.css');

  return merge(normalizeCss, globalSass)
    .pipe(concat('global.css'))
    .pipe(postcss([ cssnano ]))
    .pipe(gulp.dest('./public/assets/css/'));

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

slug.defaults.mode = 'rfc3986';

// @TODO consider metalsmith-each to replace the following

/**
 * formatPost
 *
 * @param {Object} files keyed by filename from metalsmith
 * @param {Object} metalsmith
 * @param {Function} done
 */
metalsmithPlugins.formatPost = function (files, metalsmith, done) {
  var log = debug('formatPost');
  Object.keys(files).forEach(function (file) {
    files[file].excerpt = files[file].excerpt || files[file].snippet;
    files[file].section = files[file].section || 'blog';
    files[file].slug    = files[file].slug || slug(files[file].title);
    files[file].type    = files[file].type || 'post';
    log('formatPost ' + file);
    log('  - section: ' + files[file].section);
    log('  - type: ' + files[file].type);
    log('  - slug: ' + files[file].slug);
  });
  done();
};

/**
 * formatPage
 *
 * @param {Object} files keyed by filename from metalsmith
 * @param {Object} metalsmith
 * @param {Function} done
 */
metalsmithPlugins.formatPage = function (files, metalsmith, done) {
  var log = debug('formatPage');
  Object.keys(files).forEach(function (file) {
    files[file].section = slug(files[file].paths.root) || 'root';
    files[file].slug    = files[file].slug || slug(files[file].title);
    files[file].type    = files[file].type || 'page';
    log('formatPage ' + file);
    log('  - section: ' + files[file].section);
    log('  - type: ' + files[file].type);
    log('  - slug: ' + files[file].slug);
  });
  done();
};

/**
 * debugBranch
 *
 * @param {Object} files keyed by filename from metalsmith
 * @param {Object} metalsmith
 * @param {Function} done
 */
metalsmithPlugins.debugBranch = function (files, metalsmith, done) {
  var log = debug('debugBranch');
  Object.keys(files).forEach(function (file) {
    var relevantInfo = omit(files[file], [
      'stats', 'previous', 'next', 'mode', 'contents'
    ]);
    log( util.inspect(relevantInfo, {
      showHidden: false, depth: null
    }) );
  });
  done();
};

gulp.task('html', function () {

  var data = gulp.src('./md/**')
    .pipe(gulpsmith()

      .use(metalsmithPlugins.summary.init())

      .use(metalsmithPlugins.ignore('_drafts/*'))

      .use(metalsmithPlugins.matters())

      .use(metalsmithPlugins.collections({
        pages: {
          pattern: '!_*/*',
          refer:   false,
        },
        posts: {
          pattern: '_posts/*',
          reverse: true,
          sortBy:  'date',
        },
        latestPost: {
          limit:   1,
          pattern: '_posts/*',
          refer:   false,
          reverse: true,
          sortBy:  'date',
        },
        latestPosts: {
          limit:   10,
          pattern: '_posts/*',
          reverse: true,
          sortBy:  'date',
        }
      }))

    // Read markdown into {{ content }} and change sources to **.html
    .use(metalsmithPlugins.markdown())

    // Posts -- note the html file extension due to markdown()
    .use(metalsmithPlugins.branch('_posts/*.html')
      .use(metalsmithPlugins.snippet({
        maxLength: 250,
      }))
      .use(metalsmithPlugins.formatPost)
      .use(metalsmithPlugins.permalinks({
        pattern:  'blog/:slug',
        relative: 'off',
      }))
      .use(metalsmithPlugins.paths({ property: 'paths' }))
      .use(metalsmithPlugins.debugBranch)
    )

    // Pages -- note the blog/ path due to permalinks()
    .use(metalsmithPlugins.branch('!blog/**/*.html')
      .use(metalsmithPlugins.paths({ property: 'paths' }))
      .use(metalsmithPlugins.formatPage)
      .use(metalsmithPlugins.debugBranch)
    )

    // Pump into HBS
    .use(metalsmithPlugins.registerHelpers({ directory: 'hbs/helpers' }))
    .use(metalsmithPlugins.layouts({
      engine:    'handlebars',
      directory: 'hbs/layouts/',
      partials:  'hbs/partials/',
      default:   'default.hbs',
    }))

    .use(metalsmithPlugins.summary.print())
  )
  .pipe(gulp.dest('./public'));

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

  gulp.start('js', 'css', 'assets', 'html');

});

