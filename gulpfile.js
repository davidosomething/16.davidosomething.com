/**
 * Build tasks for davidosomething.com
 *
 * @author David O'Trakoun <me@davidosomething.com>
 */

/*eslint-env node*/

'use strict';

const dirs = require('./lib/dirs.js');

// =============================================================================
// Global requires
// =============================================================================

const gulp = require('gulp');

// -----------------------------------------------------------------------------
// Optional: BrowserSync
// -----------------------------------------------------------------------------

const optional = require('optional');
const BrowserSync = optional('browser-sync');
const browserSync = BrowserSync ? BrowserSync.create() : null;

// =============================================================================
// Tasks
// =============================================================================

// -----------------------------------------------------------------------------
// Task: CSS
// -----------------------------------------------------------------------------

gulp.task('clean:css', require('./lib/gulp/clean.js').css);
gulp.task('lint:css',  require('./lib/gulp/lint-css.js'));
gulp.task('docs:css',  require('./lib/gulp/docs-css.js'));
gulp.task('css',       require('./lib/gulp/build-css.js')(browserSync));

// -----------------------------------------------------------------------------
// Task: JS
// -----------------------------------------------------------------------------

gulp.task('clean:js', require('./lib/gulp/clean.js').js);
gulp.task('lint:js:eslint',  require('./lib/gulp/lint-js-eslint.js'));
gulp.task('lint:js:jscs',  require('./lib/gulp/lint-js-jscs.js'));
gulp.task('lint:js', [ 'lint:js:eslint', 'lint:js:jscs' ]);
gulp.task('docs:js',  require('./lib/gulp/docs-js.js'));
gulp.task('js',       require('./lib/gulp/build-js.js'));

// -----------------------------------------------------------------------------
// Task: Assets
// -----------------------------------------------------------------------------

gulp.task('clean:assets', require('./lib/gulp/clean.js').assets);

// Note this task modifies the source images in place -- that is, they are
// overwritten by compressed versions.
// This is not part of the normal build, just used to optimize images.
// @TODO process only new files
gulp.task('images', require('./lib/gulp/build-images.js'));

// Copy from assets from source to dist
gulp.task('assets', require('./lib/gulp/copy-assets.js'));

// -----------------------------------------------------------------------------
// Task: Static
// -----------------------------------------------------------------------------

gulp.task('static', require('./lib/gulp/copy-static.js'));

// -----------------------------------------------------------------------------
// Task: HTML
// -----------------------------------------------------------------------------

gulp.task('lint:md', require('./lib/gulp/lint-md.js'));
gulp.task('build:html', require('./lib/gulp/build-html.js'));
gulp.task('html', [ 'docs' ], require('./lib/gulp/build-html.js'));

// -----------------------------------------------------------------------------
// Task: Watch and Sync, or just serve
// -----------------------------------------------------------------------------

/**
 * Start a browserSync server
 */
gulp.task('serve', function serve() {

  browserSync.init({
    open: false,
    server: {
      baseDir: './public',
    },
  });

});


/**
 * Start a browserSync server and watch for changes
 */
gulp.task('sync', [ 'serve' ], function sync() {

  gulp.watch(`${dirs.css.source}/**/*.scss`, [ 'css' ]);
  gulp.watch([
    `${dirs.markdown}/**/*.md`,
    `${dirs.templates}/**/*.hbs`,
  ], [ 'html' ]);

});

// -----------------------------------------------------------------------------
// Task: Lint multitask
// -----------------------------------------------------------------------------

gulp.task('lint', [
  'lint:css',
  'lint:js',
  'lint:md',
]);

gulp.task('ci:lint', [
  'lint:css',
  'lint:js',
]);


// -----------------------------------------------------------------------------
// Task: Docs multitask
// -----------------------------------------------------------------------------

gulp.task('clean:docs', require('./lib/gulp/clean.js').docs);

gulp.task('docs', [
  'docs:css',
  'docs:js',
]);

// -----------------------------------------------------------------------------
// Task: Default
// -----------------------------------------------------------------------------

gulp.task('clean', require('./lib/gulp/clean.js').all);

gulp.task('default', [
  'static',
  'js',
  'css',
  'assets',
  'docs',
  'html',
]);

