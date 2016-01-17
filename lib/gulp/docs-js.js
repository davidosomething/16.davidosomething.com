/*eslint-env node*/

'use strict';

module.exports = () => {

  const fs     = require('fs');
  const gulp   = require('gulp');
  const jsdoc  = require('gulp-jsdoc-to-markdown');
  const rename = require('gulp-rename');

  const dirs     = require('../dirs.js');

  return gulp.src(`${dirs.js.source}/**/*.js`, { buffer: false })
    .pipe(jsdoc({ template: fs.readFileSync('./hbs/jsdoc/module.hbs', 'utf8') }))
    .pipe(rename(function (path) {
      path.extname = '.md';
    }))
    .pipe(gulp.dest(`${dirs.docs.source}/jsdoc/`));

};
