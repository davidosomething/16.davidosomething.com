/**
 * @module metalsmith-grouped-page
 */
'use strict';

const log = require('debug')('metalsmith-grouped-page');
const slugify = require('slugify');
const slugifyOptions = require('../slugifyOptions.js');

/**
 * Metalsmith plugin. Group files into a collection and create a new metalsmith
 * file that has the collection in its metadata.
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
 * @param {Function} [options.transform] transformation to apply to groups
 *        before adding to files/metadata objects
 * @return {Function} metalsmith().use(callback) callback
 */
module.exports = (options) => {
  options = options || {};

  // =========================================================================
  // Result
  // =========================================================================

  let groups = {};

  /**
   * Given a groupname, return existing group or create a new group and file
   * object for that group.
   *
   * @param {String} groupName
   * @return {Object} metalsmith file object with group data
   */
  const getGroup = (groupName) => {
    const slug = slugify(groupName, slugifyOptions);
    const path = `__groupedPages/${slug}/index.html`;

    // Return existing group
    if (groups.hasOwnProperty(path)) {
      return groups[path];
    }

    // Initialize group, optionally with options.metadata
    log(`Creating new file for group ${groupName}`);
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


  /**
   * Metalsmith files iterator
   *
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  const groupFiles = (files, metalsmith, done) => {
    const has     = require('lodash.has');
    const get     = require('lodash.get');
    const isArray = require('lodash.isarray');

    /**
     * Given a filepath, put the corresponding file in a group
     *
     * @param {String} file key in files
     * @return {Void}
     */
    const group = (file) => {
      var data = files[file];

      // Check that file belongs in a group
      if (!has(data, options.path)) {
        return;
      }

      // Group by value type
      log(`Grouping files by ${options.path}`);
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

    if (options.transforms && options.transforms.length) {
      /**
       * Apply any transformations to groups, e.g. prefixing path
       * (groups[path]) or adding additional metadata
       *
       * @param {Function} transform
       */
      const applyTransform = (transform) => {
        if (typeof transform !== 'function') {
          return;
        }
        groups = transform(groups, options, metalsmith);
      };
      // Not a map since transforms do not necessarily have to modify the
      // groups, e.g. the metadata transform.
      options.transforms.forEach(applyTransform);
    }

    // Add each grouping as a new file for Metalsmith
    Object.assign(files, groups);

    done();
  };

  return groupFiles;
};

