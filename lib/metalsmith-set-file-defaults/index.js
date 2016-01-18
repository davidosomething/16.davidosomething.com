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


const DEFAULT_WIDGETS = {
  page: {
    aboutMe:  true,
    allPosts: true,
  },
  jsdoc: {
    jsdocMeta: true,
    jsdocModules: true,
  },
  post: {
    sharePost: true,
    aboutMe:   true,
    allPosts:  true,
  },
};


/**
 * metalsmithSetFileDefaults
 *
 * @param {Object} [options]
 * @return {Function} metalsmith().use(callback) callback
 */
module.exports = (options) => {
  options = options || {};

  /**
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function setFileDefaults(files, metalsmith, done) {

    /**
     * @param {Object} data current data
     * @return {Object} extended data
     */
    const setJsdocDefaults = (data) => {
      const defaultData = {
        slug: data.title ? slug(data.title) : 'UNTITLED',
      };

      var result = defaultsDeep(data, defaultData);
      result.widgets = data.widgets || DEFAULT_WIDGETS.jsdoc;
      return result;
    };


    /**
     * @param {Object} data current data
     * @return {Object} extended data
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
     * @param {Object} data current data
     * @return {Object} extended data
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


    const filetypes = {
      jsdoc: {
        logSuffix: 'formatJsdoc',
        callback: setJsdocDefaults,
      },
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
};

