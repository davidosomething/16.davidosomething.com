/*eslint-env node*/

import dirs from '../dirs.js';

module.exports = () => {

  const gulp   = require('gulp');
  const eslint = require('gulp-eslint');

  return gulp.src([ 'gulpfile.babel.js', `${dirs.js.source}/**/*.js` ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

};
