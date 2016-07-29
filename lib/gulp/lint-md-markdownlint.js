/**
 * @module gulp/lint-md-markdownlint
 */
'use strict';

module.exports = () => {

  const dirs          = require('../dirs.js');
  const gulp          = require('gulp');
  const through2      = require('through2');
  const chalk         = require('chalk');
  const markdownlint  = require('markdownlint');

  let lastFile = '';
  //let invalidFiles = 0;
  //let violations = 0;

  /**
   * @param {String} message
   */
  const outputFormatted = (message) => {
    const re = /([^:]+): ([^:]+): (MD\d\d\d) (.*)/i;
    const parts = message.match(re);
    const file = parts[1].replace(`${dirs.markdown}/`, '');
    // left padded line number
    const line = (`    ${parts[2]}`).slice(-4); //eslint-disable-line no-magic-numbers
    const rule = parts[3]; //eslint-disable-line no-magic-numbers
    const text = parts[4]; //eslint-disable-line no-magic-numbers

    if (!lastFile) {
      process.stdout.write('\n');
    }

    if (lastFile !== file) {
      //invalidFiles += 1;
      process.stdout.write(`${chalk.yellow(file)}\n`);
      lastFile = file;
    }

    process.stdout.write(`  ${chalk.gray(line)}: [${chalk.gray(rule)}] ${text}\n`);
  };

  /**
   * markdownlint a file from a stream using markdown lint
   *
   * @param {Object} file chunk from through2
   * @param {String} enc file encoding
   * @param {Function} next
   */
  const lint = (file, enc, next) => {

    /**
     * Callback function for markdownlint() to output results and go to next
     * file
     *
     * @param {Error} err
     * @param {Object} result
     */
    const lintDone = (err, result) => {
      const resultString = (result || '').toString();
      if (resultString) {
        //violations += 1;
        outputFormatted(resultString);
        process.stdout.write('\n');
      }
      next(err, file);
    };

    markdownlint({
      config: require('../../markdownlint.json'),
      files: [ `${dirs.markdown}/${file.relative}` ],
    }, lintDone);

  };

  return gulp.src([
    `${dirs.markdown}/**/*.md`,
    `!${dirs.markdown}/_archive/**/*.md`,
    `!${dirs.markdown}/docs/**/*.md`,
  ], { read: false })
    .pipe(through2.obj(lint));

};
