'use strict';

const log = require('debug')('metalsmith-assign-permalinks');

/**
 * metalsmithAssignPermalinks
 *
 * @param {Object} [options]
 * @param {String} [options.base] base URL (with trailing slash) to which path is appended
 * @return {Function} metalsmith().use(callback) callback
 */
function metalsmithAssignPermalinks(options) {

  options = options || {};
  options.base = options.base || '';

  /**
   * since metalsmith-permalinks uses the filedata.permalink as a boolean to
   * determine whether or not to generate a permalink for the file. This is run
   * after metalsmith-permalinks to set the value of filedata.permalink to the
   * actual permalink url as a string.
   *
   * @param {Object<String.Object>} files
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function assignPermalinks(files, metalsmith, done) {
    /**
     * @param {String} file key in files
     */
    const assignPermalink = (file) => {
      var data = files[file];
      data.permalink = `${options.base}${data.path}/`;

      log(`${file}`);
      log(`    - path:      ${data.path}`);
      log(`    - permalink: ${data.permalink}`);
    };

    Object.keys(files).forEach(assignPermalink);
    done();
  };
}

module.exports = metalsmithAssignPermalinks;
