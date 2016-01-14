'use strict';

const siteData = require('../site.js');
const log = require('debug')('assignPermalinks');

/**
 * metalsmithAssignPermalinks
 *
 * @param {Object} [options]
 * @return {Function} metalsmith().use(callback) callback
 */
function metalsmithAssignPermalinks(options) {

  options = options || {};

  /**
   * since metalsmith-permalinks uses the filedata.permalink as a boolean to
   * determine whether or not to generate a permalink for the file. This is run
   * after metalsmith-permalinks to set the value of filedata.permalink to the
   * actual permalink url as a string.
   *
   * @param {Object} files
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function assignPermalinks(files, metalsmith, done) {
    Object.keys(files).forEach((file) => {
      var data = files[file];

      data.permalink = `${siteData.site.url}/${data.path || ''}/`;

      log(`assignPermalinks ${file}`);
      log(`  - path:      ${data.path}`);
      log(`  - permalink: ${data.permalink}`);
    });

    done();
  };
}

module.exports = metalsmithAssignPermalinks;
