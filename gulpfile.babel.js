/**
 * gulpfile.babel.js
 *
 * Build tasks for davidosomething.com
 *
 * @author David O'Trakoun <me@davidosomething.com>
 */

'use strict'

import util from 'util';

// =============================================================================
// Requires
// =============================================================================

require('harmonize')();   // metalsmith uses ES6

// -----------------------------------------------------------------------------
// Require: Gulp and node utils
// -----------------------------------------------------------------------------

import { execSync as exec } from 'child_process';
import debug from 'debug'; // DEBUG=gulp gulp to output
import assign from 'lodash.assign';
import omit from 'lodash.omit';
import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import merge from 'merge-stream';

// -----------------------------------------------------------------------------
// Require: CSS
// -----------------------------------------------------------------------------

import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import cssnano from 'cssnano';

// -----------------------------------------------------------------------------
// Require: Static Generation
// -----------------------------------------------------------------------------

import slug from 'slug';
import gulpsmith from 'gulpsmith';
import metalsmithBranch from 'metalsmith-branch';
import metalsmithCollections from 'metalsmith-collections';
import metalsmithIgnore from 'metalsmith-ignore';
import metalsmithLayouts from 'metalsmith-layouts';
import metalsmithMarkdown from 'metalsmith-markdown';
import metalsmithMatters from 'metalsmith-matters';
import metalsmithPaths from 'metalsmith-paths';
import metalsmithPermalinks from 'metalsmith-permalinks';
import metalsmithRegisterHelpers from 'metalsmith-register-helpers';
import metalsmithSnippet from 'metalsmith-snippet';
import metalsmithSummary from 'metalsmith-summary';


// =============================================================================
// Tasks
// =============================================================================


// -----------------------------------------------------------------------------
// Task: Clean
// -----------------------------------------------------------------------------

gulp.task('clean:css', () => {
  return del([
    './public/assets/css/**/*',
  ]);
});


gulp.task('clean:js', () => {
  return del([
    './public/assets/js/**/*',
  ]);
});


gulp.task('clean:assets', () => {
  return del([
    './public/assets/fonts/**/*',
    './public/assets/img/**/*',
  ]);
});


gulp.task('clean:all', () => {
  return del([
    './public/**/*',
  ]);
});


// -----------------------------------------------------------------------------
// Task: CSS
// -----------------------------------------------------------------------------

gulp.task('css', () => {

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

gulp.task('js', () => {

  exec('npm run js', (err, stdout, stderr) => {
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

gulp.task('assets', () => {

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
var metalsmithFormatPost = (files, metalsmith, done) => {
  var log = debug('formatPost');
  Object.keys(files).forEach((file) => {
    var data = files[file];
    data.excerpt = data.excerpt || data.snippet;
    data.section = data.section || 'blog';
    data.slug    = data.slug || slug(data.title);
    data.type    = data.type || 'post';
    data.schema = {
      itemtype: 'https://schema.org/BlogPosting'
    };
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
var metalsmithFormatPage = (files, metalsmith, done) => {
  var log = debug('formatPage');
  Object.keys(files).forEach((file) => {
    var data = files[file];
    data.section = slug(data.paths.root) || 'root';
    data.slug    = data.slug || slug(data.title);
    data.type    = data.type || 'page';
    data.schema = {
      itemtype: 'https://schema.org/WebPage'
    };
    log('formatPage ' + file);
    log('  - section: ' + data.section);
    log('  - type: ' + data.type);
    log('  - slug: ' + data.slug);
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
var metalsmithDebugBranch = (files, metalsmith, done) => {
  var log = debug('debugBranch');
  Object.keys(files).forEach((file) => {
    var relevantInfo = omit(files[file], [
      'stats', 'previous', 'next', 'mode', 'contents'
    ]);
    log( util.inspect(relevantInfo, {
      showHidden: false, depth: null
    }) );
  });
  done();
};

gulp.task('html', () => {

  var data = gulp.src('./md/**')
    .pipe(gulpsmith()

      .use(metalsmithSummary.init())

      .use(metalsmithIgnore('_drafts/*'))

      .use(metalsmithMatters())

      .use(metalsmithCollections({
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
    .use(metalsmithMarkdown())

    // Posts -- note the html file extension due to markdown()
    .use(metalsmithBranch('_posts/*.html')
      .use(metalsmithSnippet({
        maxLength: 250,
      }))
      .use(metalsmithFormatPost)
      .use(metalsmithPermalinks({
        pattern:  'blog/:slug',
        relative: 'off',
      }))
      .use(metalsmithPaths({ property: 'paths' }))
      .use(metalsmithDebugBranch)
    )

    // Pages -- note the blog/ path due to permalinks()
    .use(metalsmithBranch('!blog/**/*.html')
      .use(metalsmithPaths({ property: 'paths' }))
      .use(metalsmithFormatPage)
      .use(metalsmithDebugBranch)
    )

    // Pump into HBS
    .use(metalsmithRegisterHelpers({ directory: 'hbs/helpers' }))
    .use(metalsmithLayouts({
      engine:    'handlebars',
      directory: 'hbs/layouts/',
      partials:  'hbs/partials/',
      default:   'default.hbs',
    }))

    .use(metalsmithSummary.print())
  )
  .pipe(gulp.dest('./public'));

});

// -----------------------------------------------------------------------------
// Task: Watch
// -----------------------------------------------------------------------------

gulp.task('watch', () => {

  var sassWatcher = gulp.watch('./assets/scss/**/*.scss', [ 'css' ]);

});

// -----------------------------------------------------------------------------
// Task: Default
// -----------------------------------------------------------------------------

gulp.task('default', () => {

  gulp.start('js', 'css', 'assets', 'html');

});

