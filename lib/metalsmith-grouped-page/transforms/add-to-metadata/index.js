'use strict';

/**
 * addToMetadata - transform for metalsmith-grouped-page that adds the grouped
 * pages to metalsmith.metadata() sorted by slug
 *
 * @param {Object} options passed to addToMetadata
 * @param {String} options.metakey added as metalsmith.metadata.groupedPages.KEY
 * @param {(Function[], Object[], String[])} [options.sort] see lodash.orderby
 * @param {String[]} [options.order] see lodash.orderby
 * @return {Function} transform function (doesn't do anything to groups in this
 *         case)
 */
const addToMetadata = (options) => {
  const orderBy = require('lodash.orderby');

  /**
   * bySlug - default sort is by slug
   *
   * @param {Object} group current file object
   * @return {String} slug
   */
  const bySlug = (group) => {
    return group.groupedPage.slug;
  };

  const sort = options.sort ? options.sort : [ bySlug ];

  const order = options.order ? options.order : [ 'asc' ];

  /**
   * gptAddToMetadata transform
   *
   * @param {Object.<String, Object>} groups, key filename, value file object
   * @param {Object} gpOptions options passed to metalsmith-grouped-pages
   * @param {Object} metalsmith instance
   * @return {Object} groups (untouched)
   */
  return (groups, gpOptions, metalsmith) => {
    if (typeof options.metakey !== 'string') {
      process.stderr.write('A metakey must be provided the addToMetadata transform in order to add the data to metalsmith.metadata()\n');
      return groups;
    }

    let metadata = metalsmith.metadata();
    metadata.groupedPages = metadata.groupedPages || {};
    metadata.groupedPages[options.metakey] = orderBy(groups, sort, order);
    return groups;
  };
};

module.exports = addToMetadata;
