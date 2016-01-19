module.exports = () => {

  const dirs = require('../dirs.js');

  const gulp      = require('gulp');
  const sassLint  = require('gulp-sass-lint');

  const SASSLINT_OPTIONS = {};
  if (process.env.CI && process.env.TRAVIS_BRANCH === 'master') {
    SASSLINT_OPTIONS.options = {
      'formatter':    'html',
      'output-file':  `${dirs.dist}/docs/sasslint/index.html`,
    };
  }

  return gulp.src([
    `${dirs.css.source}/**/*.scss`,
    `!${dirs.css.source}/vendor/**/*.scss`,
  ])
    .pipe(sassLint(SASSLINT_OPTIONS))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());

};
