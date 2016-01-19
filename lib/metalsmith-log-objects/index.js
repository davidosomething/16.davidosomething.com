'use strict';

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

const DEBUG_KEY = 'metalsmith-log-objects';

const util  = require('util');
const omit  = require('lodash.omit');
const debug = require('debug');

/**
 * metalsmithLogObjects
 *
 * @param {Object} [options]
 * @param {String} [options.objects]
 * @param {String[]} [options.excludeKeys]
 * @param {String} [options.suffix]
 * @return {Function} metalsmith().use(callback) callback
 */
function metalsmithLogObjects(options) {

  options = options || {};
  let debugKey = DEBUG_KEY + (options.suffix ? `-${options.suffix}` : '');
  let objects = options.objects || 'files';
  let excludeKeys = options.excludeKeys || DEFAULTS[objects].excludeKeys;
  let depth = options.depth || DEFAULTS[objects].depth;

  const log = debug(debugKey);

  /**
   * @param {String} thing
   * @param {Object} relevantInfo
   */
  function logObject(thing, relevantInfo) {
    log( `${thing}\n` + util.inspect(relevantInfo, {
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
      /**
       * @param {String} file key in files
       */
      const logFileObject = (file) => {
        logObject( file, omit(files[file], excludeKeys) );
      };

      Object.keys(files).forEach(logFileObject);
    }
    else {
      logObject( 'meta', omit(metalsmith.metadata(), excludeKeys) );
    }

    done();
  };
}

module.exports = metalsmithLogObjects;
