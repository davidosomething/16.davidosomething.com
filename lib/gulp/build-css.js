/**
 * @module gulp/build-css
 */
'use strict';

/**
 * wrapper around gulp task to specify if browserSync is available
 *
 * @param {Object} browserSync instance
 * @return {Function} Gulp task
 */
module.exports = (browserSync) => {

  /**
   * Actual css gulp task
   *
   * @return {Vinyl}
   */
  return () => {

    const dirs       = require('../dirs.js');

    const gulp       = require('gulp');
    const eyeglass   = require('eyeglass');
    const sass       = require('gulp-sass');
    const sourcemaps = require('gulp-sourcemaps');
    const cssnano    = require('gulp-cssnano');

    const SASS_OPTIONS = {
      includePaths: [ `${dirs.css.source}/` ],
    };

    /**
     * onSassError
     *
     * @param {ErrorObject} err
     * @param {Object} result
     */
    const onSassError = (err, result) => {
      sass.logError(err);
      process.exit(1);
    };

    const CSSNANO_OPTIONS = {
      safe: true,
      autoprefixer: { browsers: [ 'last 2 versions' ] },
    };

    let stream = gulp.src(`${dirs.css.source}/*.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass(eyeglass(SASS_OPTIONS)).on('error', onSassError))
      .pipe(cssnano(CSSNANO_OPTIONS))
      .pipe(sourcemaps.write('./', { sourceRoot: '/sources/css/' }))
      .pipe(gulp.dest(`${dirs.css.dist}/`));

    if (browserSync) {
      stream.pipe(browserSync.stream({ match: '**/*.css' }));
    }

    return stream;
  };

};
