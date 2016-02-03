module.exports = (str, pattern) => {
  const helperMoment = require('helper-moment');
  return helperMoment(str, pattern);
};

