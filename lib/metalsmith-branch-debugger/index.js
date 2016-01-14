/**
 * metalsmith-branch-debugger
 *
 * Console log the data object attached to a metalsmith file object.
 */

'use strict';

/**
 * metalsmithBranchDebugger
 *
 * @param {Object} [options]
 * @param {String[]} [options.relevantKeys]
 * @param {String} [options.suffix]
 * @return {Function} metalsmith().use(callback) callback
 */
module.exports = function metalsmithBranchDebugger(options) {

  const util  = require('util');
  const debug = require('debug');
  const omit  = require('lodash.omit');

  const DEBUG_KEY = 'metalsmith-branch-debugger';

  const DEFAULT_KEYS = [
    'stats',
    'previous',
    'next',
    'mode',
    'contents',
  ];

  const DEFAULT_DEPTH = 1;

  options = options || {};
  options.relevantKeys = options.relevantKeys || DEFAULT_KEYS;
  options.depth = options.depth || DEFAULT_DEPTH;

  let debugKey = DEBUG_KEY;
  if (options.suffix) {
    debugKey = debugKey + '-' + options.suffix;
  }

  const log = debug(debugKey);

  /**
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function branchDebugger(files, metalsmith, done) {
    Object.keys(files).forEach((file) => {
      const relevantInfo = omit(files[file], options.relevantKeys);
      log( util.inspect(relevantInfo, {
        showHidden: false,
        depth:      options.depth,
        colors:     true,
      }) );
    });
    done();
  };

};

