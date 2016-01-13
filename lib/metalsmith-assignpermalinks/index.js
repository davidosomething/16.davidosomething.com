const debug = require('debug');

module.exports = function metalsmithAssignPermalinks(options) {
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
    let log = debug('assignPermalink');
    Object.keys(files).forEach((file) => {
      var data = files[file];

      files[file].permalink = `${siteData.site.url}/${data.path || ''}/`;

      log(`assignPermalink ${file}`);
      log(`  - path:      ${files[file].path}`);
      log(`  - permalink: ${files[file].permalink}`);
    });

    done();
  };
};
