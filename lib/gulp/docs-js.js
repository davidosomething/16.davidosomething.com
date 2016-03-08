/**
 * @module gulp/docs-js
 */
'use strict';

/**
 * gulp task for JavaScript documentation
 *
 * @return {Vinyl}
 */
module.exports = () => {

  const fs     = require('fs');
  const gulp   = require('gulp');
  const jsdoc  = require('gulp-jsdoc-to-markdown');
  const rename = require('gulp-rename');

  const dirs     = require('../dirs.js');

  const JSDOC_OPTIONS = {
    template: fs.readFileSync('./hbs/jsdoc/module.hbs', 'utf8'),
  };

  /**
   * renameToMarkdown
   *
   * @param {Object} path
   * @param {String} path.extname
   */
  const renameToMarkdown = (path) => {
    path.extname = '.md';
  };

  return gulp.src(
    [
      '{lib,assets/js}/**/*.js',
      '*.js',
      '!config.js',
    ],
    {
      buffer: false,
    }
  )
    .pipe(jsdoc(JSDOC_OPTIONS))
    .pipe(rename(renameToMarkdown))
    .pipe(gulp.dest(`${dirs.docs.source}/jsdoc/`));

};

