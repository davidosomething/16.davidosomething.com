'use strict';

module.exports = (browserSync) => {

  const dirs       = require('../dirs.js');

  const gulp       = require('gulp');
  const Eyeglass   = require('eyeglass').Eyeglass;
  const sass       = require('gulp-sass');
  const sourcemaps = require('gulp-sourcemaps');
  const cssnano    = require('gulp-cssnano');

  /**
   * @return {Function}
   */
  return () => {

    const SASS_OPTIONS = {
      includePaths: [ `${dirs.css.source}/` ],
    };

    const eyeglass = new Eyeglass(SASS_OPTIONS);

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
      .pipe(sass(eyeglass.sassOptions()).on('error', onSassError))
      .pipe(cssnano(CSSNANO_OPTIONS))
      .pipe(sourcemaps.write('./', { sourceRoot: '/sources/css/' }))
      .pipe(gulp.dest(`${dirs.css.dist}/`));

    if (browserSync) {
      stream.pipe(browserSync.stream({ match: '**/*.css' }));
    }

    return stream;
  };

};
