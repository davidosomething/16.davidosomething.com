'use strict';

module.exports = () => {

  const gulp = require('gulp');
  const dirs = require('../dirs.js');

  return gulp.src('./static/**')
    .pipe(gulp.dest(`${dirs.dist}/`));

};

