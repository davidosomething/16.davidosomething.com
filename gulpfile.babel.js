/**
 * gulpfile.babel.js
 *
 * Build tasks for davidosomething.com
 *
 * @author David O'Trakoun <me@davidosomething.com>
 */

/*eslint-disable no-console*/

'use strict';

// =============================================================================
// Requires
// =============================================================================

//require('harmonize')(['harmony-generators']); // for metalsmith on old node

// -----------------------------------------------------------------------------
// Require: Gulp and node utils
// -----------------------------------------------------------------------------

import util from 'util';
import debug from 'debug'; // DEBUG=gulp gulp to output
import { exec } from 'child_process';
import omit from 'lodash.omit';
import gulp from 'gulp';
import concat from 'gulp-concat';
import merge from 'merge-stream';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';

// -----------------------------------------------------------------------------
// Require: CSS
// -----------------------------------------------------------------------------

import sassLint from 'gulp-sass-lint';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// -----------------------------------------------------------------------------
// Require: JS
// -----------------------------------------------------------------------------

import eslint from 'gulp-eslint';

// -----------------------------------------------------------------------------
// Require: Static Generation
// -----------------------------------------------------------------------------

// import mdast from 'gulp-mdast';
// import mdastLint from 'mdast-lint';
import slug from 'slug';
import gulpsmith from 'gulpsmith';
import metalsmithBranch from 'metalsmith-branch';
import metalsmithCollections from 'metalsmith-collections';
import metalsmithDefine from 'metalsmith-define';
import metalsmithIgnore from 'metalsmith-ignore';
import metalsmithLayouts from 'metalsmith-layouts';
import metalsmithMarkdown from 'metalsmith-markdown';
import metalsmithMatters from 'metalsmith-matters';
import metalsmithPaths from 'metalsmith-paths';
import metalsmithPermalinks from 'metalsmith-permalinks';
import metalsmithRegisterHelpers from 'metalsmith-register-helpers';
import metalsmithSnippet from 'metalsmith-snippet';


// =============================================================================
// Config
// =============================================================================

var dirs = {};
dirs.dist = './public/';
dirs.assets = {
  source: `./assets`,
  dist:   `${dirs.dist}/assets`,
};
dirs.jspm = `${dirs.assets.source}/jspm`,
dirs.css = {
  source: `${dirs.assets.source}/scss`,
  dist:   `${dirs.assets.dist}/css`,
};
dirs.js = {
  source: `${dirs.assets.source}/js`,
  dist:   `${dirs.assets.dist}/js`,
};


// =============================================================================
// Tasks
// =============================================================================


// -----------------------------------------------------------------------------
// Task: Clean
// -----------------------------------------------------------------------------

gulp.task('clean:css', () => {
  return del([
    `${dirs.css.dist}/**/*`,
  ]);
});


gulp.task('clean:js', () => {
  return del([
    `${dirs.js.dist}/**/*`,
  ]);
});


gulp.task('clean:assets', () => {
  return del([
    `${dirs.assets.dist}/fonts/**/*`,
    `${dirs.assets.dist}/img/**/*`,
  ]);
});


gulp.task('clean:all', () => {
  return del([
    `${dirs.dist}/**/*`,
  ]);
});


// -----------------------------------------------------------------------------
// Task: CSS
// -----------------------------------------------------------------------------

gulp.task('lint:css', () => {
  return gulp.src(`${dirs.css.source}/**/*.scss`)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});


gulp.task('css', () => {

  var globalSass = gulp.src(`${dirs.css.source}/global.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())

    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ]))
    .pipe(sourcemaps.write());

  var vendor = gulp.src([
    `${dirs.jspm}/github/necolas/normalize.css@3.0.3/normalize.css`,
  ]);

  return merge(vendor, globalSass)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat('global.css'))
    .pipe(sourcemaps.write())

    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss([ cssnano ]))
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(`${dirs.css.dist}/`));

});

// -----------------------------------------------------------------------------
// Task: JS
// -----------------------------------------------------------------------------

gulp.task('lint:js', () => {

  return gulp.src([ 'gulpfile.babel.js', `${dirs.js.source}/**/*.js` ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});

gulp.task('js', (cb) => {

  exec('npm run js', (err) => {
    return cb(err);
  });

});

// -----------------------------------------------------------------------------
// Task: Assets
// -----------------------------------------------------------------------------

gulp.task('assets', () => {

  return gulp.src('./assets/{fonts,img}/**')
    .pipe(gulp.dest(`${dirs.assets.dist}/`));

});

// -----------------------------------------------------------------------------
// Task: HTML
// -----------------------------------------------------------------------------

slug.defaults.mode = 'rfc3986';


// gulp.task('lint:md', () => {
//
//   return gulp.src([ 'README.md', 'md#<{(||)}>#*.md' ])
//     .pipe(mdast({ use: mdastLint }))
//
// });


/**
 * getDatePublished
 *
 * @param {Object} data
 * @return {Date}
 */
var getDatePublished = function (data) {
  return data.datePublished || new Date();
};


/**
 * getDateModified
 *
 * @param {Object} data
 * @return {Date}
 */
var getDateModified = function (data) {
  if (data.dateModified) {
    return data.dateModified;
  }

  return getDatePublished(data);
};


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
    data.excerpt        = data.excerpt || data.snippet;
    data.section        = data.section || 'blog';
    data.slug           = data.slug || slug(data.title);
    data.type           = data.type || 'post';
    data.image          = data.image || metalsmith.metadata().avatarUrl;
    data.datePublished  = getDatePublished(data);
    data.dateModified   = getDateModified(data);
    data.schema = {
      itemtype: 'https://schema.org/BlogPosting',
    };
    log(`formatPost ${file}`);
    log(`  - section: ${files[file].section}`);
    log(`  - type: ${files[file].type}`);
    log(`  - slug: ${files[file].slug}`);
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
    data.section        = slug(data.paths.root) || 'root';
    data.slug           = data.slug || slug(data.title);
    data.type           = data.type || 'page';
    data.image          = data.image || metalsmith.metadata().avatarUrl;
    data.datePublished  = getDatePublished(data);
    data.dateModified   = getDateModified(data);
    data.schema = {
      itemtype: 'https://schema.org/WebPage',
    };
    log(`formatPage ${file}`);
    log(`  - section: ${data.section}`);
    log(`  - type: ${data.type}`);
    log(`  - slug: ${data.slug}`);
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
      'stats',
      'previous',
      'next',
      'mode',
      'contents',
    ]);
    log( util.inspect(relevantInfo, {
      showHidden: false,
      depth: null,
    }) );
  });
  done();
};

gulp.task('html', () => {

  return gulp.src('./md/**')
    .pipe(gulpsmith()

      .use(metalsmithIgnore('_drafts/*'))

      .use(metalsmithDefine({
        avatarUrl: '/assets/img/avatar.png',
        buildDate: new Date(),
      }))

      .use(metalsmithMatters())

      .use(metalsmithCollections({
        pages: {
          pattern: '!_*/*',
          refer:   false,
        },
        posts: {
          pattern: '_posts/*',
          reverse: true,
          sortBy:  'datePublished',
        },
        latestPost: {
          limit:   1,
          pattern: '_posts/*',
          refer:   false,
          reverse: true,
          sortBy:  'datePublished',
        },
        latestPosts: {
          limit:   10,
          pattern: '_posts/*',
          reverse: true,
          sortBy:  'datePublished',
        },
      }))

    // Read markdown into {{ content }} and change sources to **.html
    .use(metalsmithMarkdown())

    // Posts -- note the html file extension due to markdown()
    .use(metalsmithBranch('_posts/*.html')
      .use(metalsmithSnippet({
        maxLength: 500,
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
      'default':   'default.hbs',
    }))
  )
  .pipe(gulp.dest('./public'));

});

// -----------------------------------------------------------------------------
// Task: Watch
// -----------------------------------------------------------------------------

gulp.task('watch', () => {

  return gulp.watch(`${dirs.css.source}/**/*.scss`, [ 'css' ]);

});

// -----------------------------------------------------------------------------
// Task: Default
// -----------------------------------------------------------------------------

gulp.task('default', [ 'js', 'css', 'assets', 'html' ]);

