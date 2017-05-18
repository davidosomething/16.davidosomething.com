/**
 * This module is specific to my site. It sets default metadata for each file.
 * @module metalsmith-set-file-defaults
 */
'use strict';

const siteData      = require('../site.js');
const util          = require('util');
const debug         = require('debug');
const defaultsDeep  = require('lodash.defaultsdeep');
const slug          = require('slug');

slug.defaults.modes['dkoslug'] = {
  replacement:  '-',
  symbols:      true,
  remove:       /[.]/g,
  lower:        true,
  charmap:      slug.charmap,
  multicharmap: slug.multicharmap,
};
slug.defaults.mode = 'dkoslug';


/**
 * Default widgets for each file type
 * @constant
 * @type {Object}
 */
const DEFAULT_WIDGETS = {
  page: {
    aboutMe:  true,
    allPosts: true,
  },
  post: {
    sharePost: true,
    aboutMe:   true,
    allPosts:  true,
  },
};

/**
 * Add default metadata to pages
 *
 * @param {Object} data metalsmith file data
 * @return {Object} extended data (modified data object)
 */
const setPageDefaults = (data) => {
  const defaultData = {
    slug:          slug(data.title),
    section:       'root',
    type:          'page',
    image:         siteData.avatarUrl,
    datePublished: siteData.buildDate,
    dateModified:  siteData.buildDate,
    og: {
      type: 'page',
    },
    schema: {
      itemtype: 'https://schema.org/WebPage',
    },
  };

  var result = defaultsDeep(data, defaultData);
  result.widgets = data.widgets || DEFAULT_WIDGETS.page;
  return result;
};


/**
 * Add default metadata to blog posts
 *
 * @param {Object} data metalsmith file data
 * @return {Object} extended data (modified data object)
 */
const setPostDefaults = (data) => {
  const defaultData = {
    layout:        'post.hbs',
    description:   data.subheader || '',
    excerpt:       data.snippet,
    section:       'blog',
    slug:          slug(data.title),
    type:          'post',
    image:         siteData.avatarUrl,
    datePublished: siteData.buildDate,
    dateModified:  siteData.buildDate,
    og: {
      type: 'article',
    },
    schema: {
      itemtype: 'https://schema.org/BlogPosting',
    },
  };

  var result = defaultsDeep(data, defaultData);
  result.widgets = result.widgets || DEFAULT_WIDGETS.post;
  return result;
};


/**
 * Hash of settings for each filetype to set defaults for
 *
 * @constant
 * @type {Object}
 */
const filetypes = {
  page: {
    logSuffix: 'formatPage',
    callback: setPageDefaults,
  },
  post: {
    logSuffix: 'formatPost',
    callback: setPostDefaults,
  },
};


/**
 * Metalsmith plugin
 *
 * @param {Object} [options]
 * @return {Function} metalsmith().use(callback) callback
 */
module.exports = (options) => {
  options = options || {};

  /**
   * Metalsmith files iterator
   *
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  const setFileDefaults = (files, metalsmith, done) => {

    /**
     * Modifies the metalsmith file object
     *
     * @param {String} file key in files
     */
    const setDefaults = (file) => {
      const filetype = filetypes[options.type];
      const log = debug(filetype.logSuffix);
      const assignDefaults = filetype.callback;

      var data = files[file];
      data = assignDefaults(data);

      log(`${filetype} ${file}`);
      log(`  - slug:    ${data.slug}`);
      log(`  - section: ${data.section}`);
      log(`  - type:    ${data.type}`);
      log(`  - widgets: ${util.inspect(data.widgets)}`);
    };

    Object.keys(files).forEach(setDefaults);
    done();
  };

  return setFileDefaults;
};

