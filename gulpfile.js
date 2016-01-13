/**
 * gulpfile.babel.js
 *
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
gulp.task('lint:css', require('./lib/gulp/lint-css.js'));
gulp.task('docs:css', [ 'static' ], require('./lib/gulp/docs-css.js'));
gulp.task('css', require('./lib/gulp/build-css.js')(browserSync));

// -----------------------------------------------------------------------------
// Task: JS
// -----------------------------------------------------------------------------

gulp.task('clean:js', require('./lib/gulp/clean.js').js);
gulp.task('lint:js', require('./lib/gulp/lint-js.js'));
gulp.task('docs:js', require('./lib/gulp/docs-js.js'));
gulp.task('js', require('./lib/gulp/build-js.js'));

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
gulp.task('assets', () => {

  return gulp.src(dirs.assets.source + '/{fonts,img}/**')
    .pipe(gulp.dest(`${dirs.assets.dist}/`));

});

// -----------------------------------------------------------------------------
// Task: Static
// -----------------------------------------------------------------------------

gulp.task('static', () => {

  return gulp.src('./static/**')
    .pipe(gulp.dest(`${dirs.dist}/`));

});

// -----------------------------------------------------------------------------
// Task: HTML
// -----------------------------------------------------------------------------

gulp.task('lint:md', (cb) => {

  cb();

});

gulp.task('html', require('./lib/gulp/build-html.js'));

// -----------------------------------------------------------------------------
// Task: Watch and Sync, or just serve
// -----------------------------------------------------------------------------

gulp.task('serve', () => {

  browserSync.init({
    open: false,
    server: {
      baseDir: './public',
    },
  });

});


gulp.task('sync', [ 'serve' ], () => {

  gulp.watch(`${dirs.css.source}/**/*.scss`, [ 'css' ]);
  gulp.watch(`${dirs.markdown.source}/**/*.md`, [ 'html' ]);
  gulp.watch(`${dirs.templates.source}/**/*.hbs`, [ 'html' ]);

});

// -----------------------------------------------------------------------------
// Task: Lint multitask
// -----------------------------------------------------------------------------

gulp.task('lint', [
  'lint:css',
  'lint:js',
  'lint:md',
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
  'html',
]);

