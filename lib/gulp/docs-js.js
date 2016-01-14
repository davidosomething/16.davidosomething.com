/*eslint-env node*/

module.exports = () => {

  const dirs  = require('../dirs.js');
  const gulp  = require('gulp');
  const esdoc = require('gulp-esdoc');

  const ESDOC_OPTIONS = {
    destination:      `${dirs.dist}/docs/esdoc/`,
  };

  return gulp.src([ `${dirs.js.source}/` ])
    .pipe(esdoc(ESDOC_OPTIONS));

};
