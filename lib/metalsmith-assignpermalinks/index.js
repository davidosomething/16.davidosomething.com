'use strict';

module.exports = function metalsmithAssignPermalinks(options) {

  const debug = require('debug');

  options = options || {};

  let siteData = options.siteData;

  /**
   * assignPermalink since metalsmith-permalinks uses the filedata.permalink as
   * a boolean to determine whether or not to generate a permalink for the
   * file. This is run after metalsmith-permalinks to set the value of
   * filedata.permalink to the actual permalink url as a string.
   *
   * @param {Object} files
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function assignPermalink(files, metalsmith, done) {
    var log = debug('assignPermalink');
    Object.keys(files).forEach((file) => {
      var data = files[file];

      data.permalink = `${siteData.site.url}/${data.path || ''}/`;

      log(`assignPermalink ${file}`);
      log(`  - path:      ${data.path}`);
      log(`  - permalink: ${data.permalink}`);
    });

    done();
  };
};
