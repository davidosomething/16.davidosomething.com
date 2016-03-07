/**
 * @module gulp/lint-md
 */
'use strict';

module.exports = () => {

  const dirs   = require('../dirs.js');
  const gulp   = require('gulp');
  const mdlint = require('gulp-remark-lint-dko');

  /**
   * @enum
   * @type {Object}
   */
  const rules = {
    'definition-case': false,
    'emphasis-marker': '_',
    'first-heading-level': false,
    'heading-increment': false,
    'list-item-indent': 'space',
    'list-item-bullet-indent': false,
    'list-item-spacing': false,
    'maximum-heading-length': false,
    'maximum-line-length': false,
    'no-consecutive-blank-lines': false,
    'no-heading-punctuation': false,
    'no-html': false,
    'no-shortcut-reference-link': false,
    'ordered-list-marker-value': 'one',
    'strong-marker': '*',
    'table-cell-padding': false,
    'table-pipe-alignment': false,
  };

  return gulp.src([
    `${dirs.markdown}/**/*.md`,
    `!${dirs.markdown}/_archive/**/*.md`,
    `!${dirs.markdown}/docs/**/*.md`,
  ])
    .pipe(mdlint({ rules: rules }))
    .pipe(mdlint.report());

};
