/**
 * @module gulp/build-images
 */
'use strict';

/**
 * build-images
 */
module.exports = () => {

  const dirs = require('../dirs.js');
  const gulp     = require('gulp');
  const imagemin = require('gulp-imagemin');
  const pngquant = require('imagemin-pngquant');

  return gulp.src(`${dirs.assets.source}/img/**`)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [ { removeViewBox: false } ],
      use:         [ pngquant() ],
    }))
    .pipe(gulp.dest(`${dirs.assets.source}/img/`));

};
