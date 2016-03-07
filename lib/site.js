/**
 * @module lib/site
 */
'use strict';

const pkg = require('../package.json');

/**
 * @typedef {Object} MetaTag
 * @property {String} [name] for regular meta tags
 * @property {String} [property] for facebook tags
 * @property {string} content
 */

/**
 * Site config and api ids (all public data). This is also added to
 * `metalsmith.metadata().siteData`
 *
 * @constant
 * @type {Object}
 */
const siteConfig = {
  /** @member {String} avatarUrl - path to my avatar */
  avatarUrl: '/assets/img/avatar.png',

  /** @member {String} buildDate - dynamic date of current build */
  buildDate: new Date(),

  /** @member {String} fbAppId - facebook app ID for shareIntents */
  fbAppId:   '285126294854913',

  /** @member {String} gaId - google analytics site ID */
  gaId:      'UA-9710641-1',

  /** @member {String} pkg - package.json object */
  pkg:       pkg,

  /**
   * @namespace
   * @member {Object} site - meta data for site
   */
  site: {

    /** @member {String} url - Site base URL */
    url:          pkg.homepage,

    /** @member {String} title - Site title */
    title:        'davidosomething.com',

    /** @member {String} description - Site meta description */
    description:  'Web developer; super handsome. This is my personal website.',

    /** @member {String} rss - RSS feed path */
    rss:          '/rss.xml',

    /**
     * @namespace
     * @member {MetaTag[]} meta - more metadata that gets mapped to meta tags
     */
    meta: [
      { name: 'author', content: pkg.author.name },
      { name: 'google-site-verification', content: 'CUF_b2uUr3xngYZU_Assv-CXFtDTzQjFdoh3_S35FDQ' },
      { name: 'msvalidate.01',            content: 'DB32AB8ADBD71157CA9F135EAD9EFE23' },
      { name: 'p:domain_verify',          content: '87f3b7851e149ff74531fdb012c62bf3' },
      { property: 'fb:app_id', content: '285126294854913' },
      { property: 'fb:admins', content: '16109547' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@davidosomething' },
    ],

  },
};

module.exports = siteConfig;
