'use strict';

module.exports = (cb) => {

  const dirs = require('../dirs.js');

  const fs         = require('fs');
  const path       = require('path');
  const rr         = require('recursive-readdir');
  const remark     = require('remark');
  const remarkLint = require('remark-lint');


  /**
   * ignorePaths
   *
   * @param {String} file filename
   * @param {Object} stats from path object
   */
  const ignorePaths = (file, stats) => {
    let isArchive = stats.isDirectory() && path.basename(file) == '_archive';
    let isJSDoc = stats.isDirectory() && path.basename(file) == 'docs';
    return isArchive || isJSDoc;
  };


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


  /**
   * lintFile
   *
   * @param {String} filename
   */
  const lintFile = (filename) => {

    /**
     * @param {Object} violation
     */
    const outputViolation = (violation) => {
      process.stdout.write(`${filename}:${violation.name} ${violation.message} [${violation.ruleId}]\n`);
    };

    /**
     * @param {ErrorObject} err
     * @param {Object} processedFile
     * @param {Object} res result
     */
    const processFile = (err, processedFile, res) => {
      processedFile.messages.forEach(outputViolation);
    };

    /**
     * @param {ErrorObject} err
     * @param {Object} data
     */
    const lintFile = (err, data) => {
      if (err) throw err;
      remark.use(remarkLint, rules).process(data.toString(), processFile);
    };

    fs.readFile(filename, lintFile);
  };


  /**
   * @param {ErrorObject} err
   * @param {String[]} filenames
   */
  const lintFiles = (err, filenames) => {
    filenames.forEach(lintFile);
    cb(err);
  };


  rr(`${dirs.markdown}`, [ ignorePaths ], lintFiles);

};
