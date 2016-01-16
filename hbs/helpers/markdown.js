'use strict';

/**
 * markdownHelper
 *
 * @TODO [].filter options.hash into marked options
 * @param {Object} context
 * @param {Object} options
 * @return {String}
 * @example
 * var changelog = {      // context is changelog object
 *   date: '2015-01-01',
 *   log:  '# abc'
 * };
 *
 * {{#changelog}}
 *   {{#markdown}}
 *      # heading
 *   {{/markdown}}
 * {{/changelog}}
 */
const markdownHelper = function (context, options) {
  const marked = require('marked');
  return marked(context);
};

module.exports = markdownHelper;
