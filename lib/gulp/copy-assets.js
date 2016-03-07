/**
 * @module gulp/copy-assets
 */
'use strict';

module.exports = () => {

  const gulp = require('gulp');
  const dirs = require('../dirs.js');

  return gulp.src(dirs.assets.source + '/{fonts,img}/**')
    .pipe(gulp.dest(`${dirs.assets.dist}/`));

};

