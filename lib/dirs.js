/**
 * @module lib/dirs
 */
'use strict';

/**
 * @typedef {Object} BuildDirs
 * @property {String} source
 * @property {String} dist
 */

/**
 * Root relative paths for dirs
 * @constant
 * @type {Object}
 */
const dirs = {};

/**
 * Lib dir
 * @constant
 * @type {String}
 */
dirs.lib = './lib';

/**
 * Templates dir
 * @constant
 * @type {String}
 */
dirs.templates = './hbs';

/**
 * Markdown dir
 * @constant
 * @type {String}
 */
dirs.markdown = './md';

/**
 * Public dir, where the site gets built to
 * @constant
 * @type {String}
 */
dirs.dist = './public';

/**
 * Assets dir
 * @constant
 * @type {BuildDirs}
 */
dirs.assets = {
  source: './assets',
  dist:   `${dirs.dist}/assets`,
};

/**
 * JSPM dir
 * @constant
 * @type {String}
 */
dirs.jspm = `${dirs.assets.source}/jspm`,

/**
 * CSS dir
 * @constant
 * @type {BuildDirs}
 */
dirs.css = {
  source: `${dirs.assets.source}/scss`,
  dist:   `${dirs.assets.dist}/css`,
};

/**
 * JS dir for site js
 * @constant
 * @type {BuildDirs}
 */
dirs.js = {
  source: `${dirs.assets.source}/js`,
  dist:   `${dirs.assets.dist}/js`,
};

module.exports = dirs;
