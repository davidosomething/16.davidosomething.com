/**
 * @module gulp/lint-js-eslint
 */
'use strict';

module.exports = () => {

  const dirs = require('../dirs.js');

  const gulp   = require('gulp');
  const eslint = require('gulp-eslint');

  return gulp.src([ 'gulpfile.js', 'lib/**/*.js', `${dirs.js.source}/**/*.js` ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

};
