const dirs = {};

dirs.lib = './lib';

dirs.templates = './hbs';

dirs.markdown = './md';

dirs.dist = './public';

dirs.assets = {
  source: `./assets`,
  dist:   `${dirs.dist}/assets`,
};

dirs.jspm = `${dirs.assets.source}/jspm`,

dirs.css = {
  source: `${dirs.assets.source}/scss`,
  dist:   `${dirs.assets.dist}/css`,
};

dirs.js = {
  source: `${dirs.assets.source}/js`,
  dist:   `${dirs.assets.dist}/js`,
};

dirs.docs = {
  source: `${dirs.markdown}/docs`,
  dist:   `${dirs.dist}/docs`,
};

module.exports = dirs;
