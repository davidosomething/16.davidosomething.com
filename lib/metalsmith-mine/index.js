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
 * metalsmithFormatPage
 *
 * @param {Object} [options]
 * @return {Function} metalsmith().use(callback) callback
 */
exports.metalsmithFormatPage = function metalsmithFormatPage(options) {
  /**
   * formatPage
   *
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function formatPage(files, metalsmith, done) {
    const log = debug('formatPage');
    Object.keys(files).forEach((file) => {
      var data = files[file];

      var defaultData = {
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

      files[file] = defaultsDeep(data, defaultData);
      files[file].widgets = files[file].widgets || DEFAULT_WIDGETS.page;

      log(`formatPage ${file}`);
      log(`  - slug:      ${files[file].slug}`);
      log(`  - section:   ${files[file].section}`);
      log(`  - type:      ${files[file].type}`);
      log(`  - widgets:   ${util.inspect(files[file].widgets)}`);
    });

    done();
  };
};


/**
 * metalsmithFormatPost
 *
 * @param {Object} [options]
 * @return {Function} metalsmith().use(callback) callback
 */
exports.metalsmithFormatPost = function metalsmithFormatPost(options) {
  /**
   * formatPost
   *
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function formatPost(files, metalsmith, done) {
    var log = debug('formatPost');
    Object.keys(files).forEach((file) => {
      var data = files[file];

      var defaultData = {
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

      files[file] = defaultsDeep(data, defaultData);
      files[file].widgets = files[file].widgets || DEFAULT_WIDGETS.post;

      log(`formatPost ${file}`);
      log(`  - slug:      ${files[file].slug}`);
      log(`  - section:   ${files[file].section}`);
      log(`  - type:      ${files[file].type}`);
    });

    done();
  };
};


/**
 * metalsmithFormatJsdoc
 *
 * @param {Object} [options]
 * @return {Function} metalsmith().use(callback) callback
 */
exports.metalsmithFormatJsdoc = function metalsmithFormatJsdoc(options) {
  /**
   * formatJsdoc
   *
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function formatJsdoc(files, metalsmith, done) {
    const log   = debug('formatJsdoc');

      console.log(files);
    Object.keys(files).forEach((file) => {
      var data = files[file];

      var defaultData = {
        slug: data.title ? slug(data.title) : 'UNTITLED',
      };

      files[file] = defaultsDeep(data, defaultData);
      files[file].widgets = files[file].widgets || DEFAULT_WIDGETS.jsdoc;

      log(`formatJsdoc ${file}`);
      log(`  - slug:    ${files[file].slug}`);
      log(`  - section: ${files[file].section}`);
      log(`  - type:    ${files[file].type}`);
    });

    done();
  };
};

