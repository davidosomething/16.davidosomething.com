/**
 * @module gulp/copy-static
 */
'use strict';

module.exports = () => {

  const gulp = require('gulp');
  const dirs = require('../dirs.js');

  return gulp.src([ './static/**' ], { dot: true })
    .pipe(gulp.dest(`${dirs.dist}/`));

};

