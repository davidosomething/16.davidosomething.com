/**
 * @module gulp/lint-css
 */
'use strict';

module.exports = () => {

  const dirs = require('../dirs.js');

  const gulp      = require('gulp');
  const sassLint  = require('gulp-sass-lint');

  const SASSLINT_OPTIONS = {};

  return gulp.src([
    `${dirs.css.source}/**/*.scss`,
    `!${dirs.css.source}/vendor/**/*.scss`,
  ])
    .pipe(sassLint(SASSLINT_OPTIONS))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());

};
