/**
 * metalsmith-branch-debugger
 *
 * Console log the data object attached to a metalsmith file object.
 */

import util from 'util';
import debug from 'debug';
import omit from 'lodash.omit';

const DEBUG_KEY = 'metalsmith-branch-debugger';

const DEFAULT_KEYS = [
  'stats',
  'previous',
  'next',
  'mode',
  'contents',
];

const DEFAULT_DEPTH = 1;

/**
 * metalsmithBranchDebugger
 *
 * @param {Object} [options]
 * @param {String[]} [options.relevantKeys]
 * @param {String} [options.suffix]
 * @return {Function}
 */
export default function metalsmithBranchDebugger(options = {}) {

  options.relevantKeys = options.relevantKeys || DEFAULT_KEYS;
  options.depth = options.depth || DEFAULT_DEPTH;

  var debugKey = DEBUG_KEY;
  if (options.suffix) {
    debugKey = debugKey + '-' + options.suffix;
  }

  var log = debug(debugKey);

  /**
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return (files, metalsmith, done) => {
    Object.keys(files).forEach((file) => {
      var relevantInfo = omit(files[file], options.relevantKeys);
      log( util.inspect(relevantInfo, {
        showHidden: false,
        depth: options.depth,
        colors: true,
      }) );
    });
    done();
  };

}

