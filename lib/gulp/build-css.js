/*eslint-env node*/

import dirs from '../dirs.js';

module.exports = (browserSync) => {

  return () => {
    const gulp   = require('gulp');
    const Eyeglass   = require('eyeglass').Eyeglass;
    const sass       = require('gulp-sass');
    const sourcemaps = require('gulp-sourcemaps');
    const cssnano    = require('gulp-cssnano');

    const SASS_OPTIONS = {
      includePaths: `${dirs.css.source}/`,
    };

    const eyeglass = new Eyeglass(SASS_OPTIONS);

    const onSassError = (error) => {
      sass.logError(error);
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
