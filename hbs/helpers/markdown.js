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
  const toRehype = require('remark-rehype');
  const toHtml = require('rehype-stringify');
  const result = remark()
    .use(toRehype)
    .use(toHtml)
    .processSync(context);
  return result.contents;
};

module.exports = markdownHelper;
