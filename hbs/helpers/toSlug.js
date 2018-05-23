const slugify = require('slugify');
const slugifyOptions = require('../../lib/slugifyOptions.js');
module.exports = (str, pattern) => slugify(str, slugifyOptions);
