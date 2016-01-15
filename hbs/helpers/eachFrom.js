'use strict';

module.exports = (context, count, options) => {
  let ret = '';
  context.slice(count).forEach((elem) => {
    ret += options.fn(elem);
  });
  return ret;
};

