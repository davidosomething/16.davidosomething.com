/**
 * @module metalsmith-grouped-page/transforms/tag
 */
'use strict';

/**
 * tagPageDefaults - transform for metalsmith-grouped-page that sets some
 * defaults like using 'tag.hbs' for the layout template of the grouped pages
 *
 * @param {Object.<String, Object>} groups key filename, value file object
 * @return {Object} groups given default properties for a tag page
 */
const tagPageDefaults = (groups) => {
  let transformedGroups = {};

  /**
   * Modifies grouped page file objects
   *
   * @param {Object} group metalsmith file object for the grouped page
   */
  const transformTagGroupedPage = (group) => {
    let transformed = transformedGroups[group] = groups[group];
    transformed.title  = `Tag: ${transformed.groupedPage.name}`;
    transformed.slug   = transformed.groupedPage.slug;
    transformed.layout = 'tag.hbs';
  };

  Object.keys(groups).forEach(transformTagGroupedPage);
  return transformedGroups;
};

module.exports = tagPageDefaults;
