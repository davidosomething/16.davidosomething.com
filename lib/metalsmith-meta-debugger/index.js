/**
 * metalsmith-meta-debugger
 *
 * Console logs the data object attached to the global metalsmith instance.
 */

'use strict';

/**
 * metalsmithMetaDebugger
 *
 * @param {Object} [options]
 * @param {String[]} [options.relevantKeys]
 * @return {Function} metalsmith().use(callback) callback
 */
module.exports = function metalsmithMetaDebugger(options) {

  const util  = require('util');
  const debug = require('debug');
  const omit  = require('lodash.omit');

  const DEBUG_KEY = 'metalsmith-meta-debugger';

  const DEFAULT_KEYS = [ ];
  const DEFAULT_DEPTH = 2;

  options = options || {};
  options.relevantKeys = options.relevantKeys || DEFAULT_KEYS;
  options.depth = options.depth || DEFAULT_DEPTH;

  const log = debug(DEBUG_KEY);

  /**
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function metaDebugger(files, metalsmith, done) {
    const relevantInfo = omit(metalsmith.metadata(), options.relevantKeys);
    log( util.inspect(relevantInfo, {
      showHidden: false,
      depth:      options.depth,
      colors:     true,
    }) );
    done();
  };

};

