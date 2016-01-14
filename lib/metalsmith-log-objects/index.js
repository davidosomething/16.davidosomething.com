'use strict';

/**
 * metalsmithLogObjects
 *
 * @param {Object} [options]
 * @param {String} [options.objects]
 * @param {String[]} [options.excludeKeys]
 * @param {String} [options.suffix]
 * @return {Function} metalsmith().use(callback) callback
 */
module.exports = function metalsmithLogObjects(options) {

  const util  = require('util');
  const debug = require('debug');
  const omit  = require('lodash.omit');

  const DEBUG_KEY = 'metalsmith-log-objects';
  let debugKey = DEBUG_KEY;
  if (options.suffix) {
    debugKey = debugKey + '-' + options.suffix;
  }
  const log = debug(debugKey);

  options = options || {};
  let objects = options.objects || 'files';

  const DEFAULTS = {
    files: {
      depth: 1,
      excludeKeys: [
        'stats',
        'previous',
        'next',
        'mode',
        'contents',
      ],
    },
    meta: {
      depth: 3,
      excludeKeys: [],
    },
  };

  let excludeKeys = options.excludeKeys || DEFAULTS[objects].excludeKeys;
  let depth = options.depth || DEFAULTS[objects].depth;

  /**
   * @param {Object} relevantInfo
   */
  function logObject(relevantInfo) {
    log( util.inspect(relevantInfo, {
      showHidden: false,
      depth:      depth,
      colors:     true,
    }) );
  }

  /**
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith instance
   * @param {Function} done
   */
  return function logObjects(files, metalsmith, done) {
    if (objects === 'files') {
      Object.keys(files).forEach((file) => {
        let relevantInfo = omit(files[file], excludeKeys);
        logObject(relevantInfo);
      });
    }
    else {
      let relevantInfo = omit(metalsmith.metadata(), excludeKeys);
      logObject(relevantInfo);
    }

    done();
  };
};

