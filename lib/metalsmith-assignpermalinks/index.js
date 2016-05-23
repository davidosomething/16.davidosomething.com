/**
 * @module metalsmith-assignpermalinks
 */
'use strict';

/**
 * Metalsmith plugin. Since metalsmith-permalinks uses the filedata.permalink
 * as a boolean to determine whether or not to generate a permalink for the
 * file. This is run after metalsmith-permalinks to set the value of
 * filedata.permalink to the actual permalink url as a string.
 *
 * @param {Object} [options]
 * @param {String} [options.base] base URL (with trailing slash) to which path
 *        is appended
 * @return {Function} metalsmith().use(callback) callback
 */
module.exports = (options) => {
  const log = require('debug')('metalsmith-assign-permalinks');

  options = options || {};
  options.base = options.base || '';

  /**
   * Metalsmith files iterator
   *
   * @param {Object<String.Object>} files
   * @param {Object} metalsmith
   * @param {Function} done
   */
  const assignPermalinks = (files, metalsmith, done) => {

    /**
     * Assign permalink to file object. Modifies file object.
     *
     * @param {String} file key in files
     */
    const assignPermalink = (file) => {
      var data = files[file];
      data.permalink = `${options.base}`;
      if (data.path) {
        data.permalink += `${data.path}/`;
      }

      log(`${file}`);
      log(`    - path:      ${data.path}`);
      log(`    - permalink: ${data.permalink}`);
    };

    Object.keys(files).forEach(assignPermalink);
    done();
  };

  return assignPermalinks;
};

