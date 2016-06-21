'use strict';

/**
 * markdownHelper
 *
 * @TODO [].filter options.hash into options
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
  const remark = require('remark');
  const remarkHtml = require('remark-html');
  return remark().use(remarkHtml).process(context);
};

module.exports = markdownHelper;
