/**
 * @module gulp/lint-js-jscs
 */
'use strict';

module.exports = () => {

  const dirs = require('../dirs.js');

  const gulp = require('gulp');
  const jscs = require('gulp-jscs');

  return gulp.src([ 'gulpfile.js', 'lib/**/*.js', `${dirs.js.source}/**/*.js` ])
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));

};
