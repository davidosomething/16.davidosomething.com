const dirs = {};
dirs.dist = './public/';
dirs.templates = {
  source: `./hbs`,
};
dirs.markdown = {
  source: `./md`,
};
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

export default dirs;
