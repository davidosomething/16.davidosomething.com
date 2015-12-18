/**
 * metalsmith-meta-debugger
 *
 * Console logs the data object attached to the global metalsmith instance.
 */

import util from 'util';
import debug from 'debug';
import omit from 'lodash.omit';

const DEBUG_KEY = 'metalsmith-meta-debugger';

const DEFAULT_KEYS = [ ];
const DEFAULT_DEPTH = 2;

/**
 * metalsmithMetaDebugger
 *
 * @param {Object} [options]
 * @param {String[]} [options.relevantKeys]
 * @return {Function}
 */
export default function metalsmithMetaDebugger(options = {}) {

  options.relevantKeys = options.relevantKeys || DEFAULT_KEYS;
  options.depth = options.depth || DEFAULT_DEPTH;

  var log = debug(DEBUG_KEY);

  /**
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return (files, metalsmith, done) => {
    var relevantInfo = omit(metalsmith.metadata(), options.relevantKeys);
    log( util.inspect(relevantInfo, {
      showHidden: false,
      depth: options.depth,
      colors: true,
    }) );
    done();
  };

}

