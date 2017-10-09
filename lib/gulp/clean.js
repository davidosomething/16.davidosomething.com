/**
 * @module gulp/clean
 */
'use strict';

const dirs = require('../dirs.js');

const del = require('del');

/**
 * Clean css dist dir
 *
 * @return {Promise}
 */
exports.css = () => del([ `${dirs.css.dist}/**/*` ]);

/**
 * Clean js dist dir
 *
 * @return {Promise}
 */
exports.js = () => del([ `${dirs.js.dist}/**/*` ]);

/**
 * Clean assets dist dir
 *
 * @return {Promise}
 */
exports.assets = () => del([ `${dirs.assets.dist}/**/*` ]);

/**
 * Run all clean tasks
 *
 * @return {Promise}
 */
exports.all = () => del([ `${dirs.dist}/**/*` ]);
