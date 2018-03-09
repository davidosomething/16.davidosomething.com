'use strict';

const slugFunction = require('slug');
slugFunction.defaults.modes['dkoslug'] = {
  replacement:  '-',
  symbols:      true,
  remove:       /[.]/g,
  lower:        true,
  charmap:      slugFunction.charmap,
  multicharmap: slugFunction.multicharmap,
};
slugFunction.defaults.mode = 'dkoslug';


module.exports = (str, pattern) => {
  return slugFunction(str);
};

