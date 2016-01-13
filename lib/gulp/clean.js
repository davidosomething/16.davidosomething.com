const dirs = require('../dirs.js');

const del = require('del');

exports.css = () => {
  return del([ `${dirs.css.dist}/**/*` ]);
};

exports.js = () => {
  return del([ `${dirs.js.dist}/**/*` ]);
};

exports.assets = () => {
  return del([ `${dirs.assets.dist}/**/*` ]);
};

exports.docs = () => {
  return del([ `${dirs.docs}/**/*` ]);
};

exports.all = () => {
  return del([ `${dirs.dist}/**/*` ]);
};
