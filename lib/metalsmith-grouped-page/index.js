/**
 * metalsmith-grouped-page
 */

'use strict';

const log = require('debug')('metalsmith-grouped-page');

/**
 * metalsmithGroupedPage
 *
 * @param {Object} options
 * @param {String} options.path stringified deep path to the group key. See
 *        docs for lodash.get
 * @param {String} [options.metakey] key under which the grouped files are
 *        added as metalsmith.metadata().groupedPages.metakey = alphabetized
 *        array of groupedPages (so [0] is tag starting with "a")
 * @param {Object} [options.metadata] additional metadata to add to the grouped
 *        page in initialization of the group (you can use transform to do this
 *        too)
 * @param {Function} [options.slugFunction] function to slugify the group name
 * @param {Function} [options.transform] transformation to apply to groups
 *        before adding to files/metadata objects
 * @return {Function} metalsmith().use(callback) callback
 */
module.exports = (options) => {
  options = options || {};

  // =========================================================================
  // Option parsing and defaults
  // =========================================================================

  let slugFunction;
  if (options.slugFunction) {
    slugFunction = options.slugFunction;
  }
  else {
    slugFunction = require('slug');
    slugFunction.defaults.modes['dkoslug'] = {
      replacement:  '-',
      symbols:      true,
      remove:       /[.]/g,
      lower:        true,
      charmap:      slugFunction.charmap,
      multicharmap: slugFunction.multicharmap,
    };
    slugFunction.defaults.mode = 'dkoslug';
  }

  // =========================================================================
  // Result
  // =========================================================================

  let groups = {};

  /**
   * getGroup
   *
   * @param {String} groupName
   * @return {Object} metalsmith file object with group data
   */
  const getGroup = (groupName) => {
    const slug = slugFunction(groupName);
    const path = `__groupedPages/${slug}/index.html`;

    // Return existing group
    if (groups.hasOwnProperty(path)) {
      return groups[path];
    }

    // Initialize group, optionally with options.metadata
    let group = groups[path] = Object.assign({
      title: groupName,
      contents: '',
      groupedPage: {
        slug:  slug,
        name:  groupName,
        files: [],
      },
    }, options.metadata || {});
    return group;
  };


  // =========================================================================
  // Groupers
  // =========================================================================

  /**
   * Put file into group given the name of the group
   *
   * @param {Object} files metalsmith files object
   * @param {Object} file current file to put into a group
   * @param {String} value
   * @example
   *
   * ```
   * tags: abc, def not implemented
   * ```
   */
  const groupByString = (files, file, value) => {
    log(`Adding ${file} to group ${value}`);
    getGroup(value).groupedPage.files.push(files[file]);
  };

  /**
   * Put file into groups given an array of groups file should go into
   *
   * @param {Object} files metalsmith files object
   * @param {Object} file current file to put into a group
   * @param {String[]} values to group file by
   * @example
   *
   * ```
   * tags:
   *    - sometag
   *    - anothertag
   * ```
   */
  const groupByArray = (files, file, values) => {
    /**
     * groupByValue
     *
     * @param {String} value e.g. tag to group file by
     */
    const groupByValue = (value) => {
      groupByString(files, file, value);
    };
    values.forEach(groupByValue);
  };

  // =========================================================================
  // Metalsmith iterator
  // =========================================================================

  /**
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function groupFiles(files, metalsmith, done) {
    const has     = require('lodash.has');
    const get     = require('lodash.get');
    const isArray = require('lodash.isarray');

    /**
     * @param {String} file key in files
     */
    const group = (file) => {
      var data = files[file];

      // Check that file belongs in a group
      if (!has(data, options.path)) {
        return;
      }

      // Group by value type
      const values = get(data, options.path);
      if (typeof values === 'string') {
        return groupByString(files, file, values);
      }
      else if (isArray(values)) {
        return groupByArray(files, file, values);
      }
    };

    // Group existing files by path and groupMethod. Populates `groups`
    Object.keys(files).forEach(group);

    // Apply any transformations to groups, e.g. prefixing path (groups[path])
    // or adding additional metadata
    groups = options.transform ? options.transform(groups) : groups;

    // Provide groups globally via metadata
    if (typeof options.metakey === 'string') {
      let metadata = metalsmith.metadata();
      metadata.groupedPages = metadata.groupedPages || {};

      // Sort object by tag slug so widget list is alphabetized
      const sortBy = require('lodash.sortby');
      metadata.groupedPages[options.metakey] = sortBy(groups, (o) => {
        return o.groupedPage.slug;
      });
    }

    // Add each grouping as a new file for Metalsmith
    Object.assign(files, groups);

    done();
  };
};

