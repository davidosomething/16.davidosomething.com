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
exports.css = () => {
  return del([ `${dirs.css.dist}/**/*` ]);
};

/**
 * Clean js dist dir
 *
 * @return {Promise}
 */
exports.js = () => {
  return del([ `${dirs.js.dist}/**/*` ]);
};

/**
 * Clean assets dist dir
 *
 * @return {Promise}
 */
exports.assets = () => {
  return del([ `${dirs.assets.dist}/**/*` ]);
};

/**
 * Clean docs source and dist dir (docs are fully generated)
 *
 * @return {Promise}
 */
exports.docs = () => {
  return del([
    `${dirs.docs.source}/**/*`,
    `${dirs.docs.dist}/**/*`,
  ]);
};

/**
 * Run all clean tasks
 *
 * @return {Promise}
 */
exports.all = () => {
  return del([ `${dirs.dist}/**/*` ]);
};

