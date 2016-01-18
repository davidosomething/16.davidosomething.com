const dirs = require('../dirs.js');

const del = require('del');

/**
 * css
 */
exports.css = () => {
  return del([ `${dirs.css.dist}/**/*` ]);
};

/**
 * js
 */
exports.js = () => {
  return del([ `${dirs.js.dist}/**/*` ]);
};

/**
 * assets
 */
exports.assets = () => {
  return del([ `${dirs.assets.dist}/**/*` ]);
};

/**
 * docs
 */
exports.docs = () => {
  return del([ `${dirs.docs.dist}/**/*` ]);
};

/**
 * all
 */
exports.all = () => {
  return del([ `${dirs.dist}/**/*` ]);
};
