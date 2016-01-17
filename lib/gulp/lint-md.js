/*eslint-env node*/

'use strict';

module.exports = (cb) => {

  const dirs = require('../dirs.js');

  const fs         = require('fs');
  const path       = require('path');
  const rr         = require('recursive-readdir');
  const remark     = require('remark');
  const remarkLint = require('remark-lint');

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

  const lintFile = (filename) => {
    fs.readFile(filename, (err, data) => {
      if (err) throw err;

      remark
        .use(remarkLint, rules)
        .process(data.toString(), (err, processedFile, res) => {
          processedFile.messages.forEach((violation) => {
            process.stdout.write(`${filename}:${violation.name} ${violation.message} [${violation.ruleId}]\n`);
          });
        });

    });
  };

  rr(`${dirs.markdown}`, [ ignorePaths ], (err, filenames) => {
    filenames.forEach(lintFile);
    cb(err);
  });

};
