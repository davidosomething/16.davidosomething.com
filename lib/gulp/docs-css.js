/*eslint-env node*/

import dirs     from '../dirs.js';
import siteData from '../site.js';

module.exports = () => {

  const gulp    = require('gulp');
  const sassdoc = require('sassdoc');

  const SASSDOC_OPTIONS = {
    dest:             `${dirs.dist}/docs/sassdoc`,
    basePath:         'https://github.com/davidosomething/16.davidosomething.com/tree/master/assets/scss',
    shortcutIcon:     `${dirs.dist}/favicon.ico`,
    googleAnalytics:  siteData.gaId,
    descriptionPath:  './README.md',
  };

  return gulp.src([ `${dirs.css.source}/global.scss` ])
    .pipe(sassdoc(SASSDOC_OPTIONS));

};
