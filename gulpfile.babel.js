/**
 * gulpfile.babel.js
 *
 * Build tasks for davidosomething.com
 *
 * @author David O'Trakoun <me@davidosomething.com>
 */

/*eslint-env node*/
/*eslint-disable no-console*/

'use strict';

// =============================================================================
// Config
// =============================================================================

//import packageJson  from './package.json';
import dirs         from './lib/dirs.js';
import siteData     from './lib/site.js';

// =============================================================================
// Requires
// =============================================================================

// -----------------------------------------------------------------------------
// Node
// -----------------------------------------------------------------------------

const exec = require('child_process').exec;

// -----------------------------------------------------------------------------
// Vendor
// -----------------------------------------------------------------------------

const debug        = require('debug'); // DEBUG      = gulp gulp to output
const defaultsDeep = require('lodash.defaultsdeep');
const del          = require('del');

// -----------------------------------------------------------------------------
// Require: Gulp generics
// -----------------------------------------------------------------------------

const gulp       = require('gulp');
const concat     = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

// -----------------------------------------------------------------------------
// Require: BrowserSync
// -----------------------------------------------------------------------------

const browserSync = require('browser-sync').create();

// -----------------------------------------------------------------------------
// Require: Images
// -----------------------------------------------------------------------------

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

// -----------------------------------------------------------------------------
// Require: CSS
// -----------------------------------------------------------------------------

const sassLint     = require('gulp-sass-lint');
const sassdoc      = require('sassdoc');
const sass         = require('gulp-sass');
const cssnano      = require('gulp-cssnano');

// -----------------------------------------------------------------------------
// Require: JS
// -----------------------------------------------------------------------------

const eslint = require('gulp-eslint');

// -----------------------------------------------------------------------------
// Require: Static Generation
// -----------------------------------------------------------------------------

// const mdast = require('gulp-mdast');
// const mdastLint = require('mdast-lint');
const slug = require('slug');

const hljs = require('highlight.js');

const metalsmith = require('metalsmith');

const metalsmithBranch         = require('metalsmith-branch');
const metalsmithBranchDebugger = require('./lib/metalsmith-branch-debugger');
const metalsmithCollections    = require('metalsmith-collections');
const metalsmithFeed           = require('metalsmith-feed');
const metalsmithIgnore         = require('metalsmith-ignore');
const metalsmithLayouts        = require('metalsmith-layouts');
const metalsmithMarkdown       = require('metalsmith-markdown');
const metalsmithMetaDebugger   = require('./lib/metalsmith-meta-debugger');
const metalsmithPermalinks     = require('metalsmith-permalinks');
const metalsmithSitemap        = require('metalsmith-sitemap');
const metalsmithSnippet        = require('metalsmith-snippet');
const metalsmithWidow          = require('metalsmith-widow');

const hbsHelperMoment = require('./hbs/helpers/moment.js');
const hbsUriEncode    = require('./hbs/helpers/uriencode.js');


// =============================================================================
// Tasks
// =============================================================================


// -----------------------------------------------------------------------------
// Task: Clean
// -----------------------------------------------------------------------------

gulp.task('clean:css', () => {
  return del([
    `${dirs.css.dist}/**/*`,
  ]);
});


gulp.task('clean:js', () => {
  return del([
    `${dirs.js.dist}/**/*`,
  ]);
});


gulp.task('clean:assets', () => {
  return del([
    `${dirs.assets.dist}/**/*`,
  ]);
});


gulp.task('clean', () => {
  return del([
    `${dirs.dist}/**/*`,
  ]);
});


// -----------------------------------------------------------------------------
// Task: CSS
// -----------------------------------------------------------------------------

gulp.task('lint:css', () => {
  return gulp.src([ `${dirs.css.source}/**/*.scss`, `!${dirs.css.source}/vendor/**/*.scss` ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});


gulp.task('css', () => {

  const SASSDOC_OPTIONS = {
    dest:             `${dirs.dist}/docs/sassdoc`,
    basePath:         'https://github.com/davidosomething/16.davidosomething.com/tree/master/assets/scss',
    shortcutIcon:     `${dirs.dist}/favicon.ico`,
    googleAnalytics:  siteData.gaId,
    descriptionPath:  './README.md',
  };

  const CSSNANO_OPTIONS = {
    safe: true,
    autoprefixer: { browsers: [ 'last 2 versions' ] },
  };

  return gulp.src([
    `${dirs.jspm}/github/necolas/normalize.css@3.0.3/normalize.css`,
    `${dirs.css.source}/global.scss`,
  ])
    .pipe(sassdoc(SASSDOC_OPTIONS)) // sassdoc() while stream is still SCSS
    .pipe(sourcemaps.init())
    .pipe(concat('global.css'))
    .pipe(sass({ includePaths: `${dirs.css.source}/` }).on('error', sass.logError))
    .pipe(cssnano(CSSNANO_OPTIONS))
    .pipe(sourcemaps.write('./', { sourceRoot: '/sources/css/' }))
    .pipe(gulp.dest(`${dirs.css.dist}/`))
    .pipe(browserSync.stream({ match: '**/*.css' }));

});

// -----------------------------------------------------------------------------
// Task: JS
// -----------------------------------------------------------------------------

gulp.task('lint:js', () => {

  return gulp.src([ 'gulpfile.babel.js', `${dirs.js.source}/**/*.js` ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});

gulp.task('js', (cb) => {

  exec('npm run bundle', (err) => {
    return cb(err);
  });

});

// -----------------------------------------------------------------------------
// Task: Assets
// -----------------------------------------------------------------------------

// Note this task modifies the source images in place -- that is, they are
// overwritten by compressed versions.
// This is not part of the normal build, just used to optimize images.
// @TODO process only new files
gulp.task('images', () => {

  return gulp.src(dirs.assets.source + '/img/**')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [ { removeViewBox: false } ],
      use:         [ pngquant() ],
    }))
    .pipe(gulp.dest(`${dirs.assets.source}/img/`));

});

// Copy from assets from source to dist
gulp.task('assets', () => {

  return gulp.src(dirs.assets.source + '/{fonts,img}/**')
    .pipe(gulp.dest(`${dirs.assets.dist}/`));

});


// -----------------------------------------------------------------------------
// Task: Static
// -----------------------------------------------------------------------------

gulp.task('static', () => {

  return gulp.src('./static/**')
    .pipe(gulp.dest(`${dirs.dist}/`));

});


// -----------------------------------------------------------------------------
// Task: HTML
// -----------------------------------------------------------------------------

slug.defaults.modes['dkoslug'] = {
  replacement:  '-',
  symbols:      true,
  remove:       /[.]/g,
  lower:        true,
  charmap:      slug.charmap,
  multicharmap: slug.multicharmap,
};
slug.defaults.mode = 'dkoslug';

gulp.task('lint:md', (cb) => {

  cb();

});

/**
 * formatPost
 *
 * @param {Object} files keyed by filename from metalsmith
 * @param {Object} metalsmith
 * @param {Function} done
 */
var metalsmithFormatPost = (files, metalsmith, done) => {
  var log = debug('formatPost');
  Object.keys(files).forEach((file) => {
    var data = files[file];

    var defaultData = {
      layout:        'post.hbs',
      description:   data.subheader || '',
      excerpt:       data.snippet,
      section:       'blog',
      slug:          slug(data.title),
      type:          'post',
      image:         siteData.avatarUrl,
      datePublished: siteData.buildDate,
      dateModified:  siteData.buildDate,
      og: {
        type: 'article',
      },
      schema: {
        itemtype: 'https://schema.org/BlogPosting',
      },
      widgets: {
        sharePost:    true,
        aboutMe:      true,
        allPosts:     false,
        latestPosts:  true,
      },
    };

    files[file] = defaultsDeep(data, defaultData);

    log(`formatPost ${file}`);
    log(`  - slug:      ${files[file].slug}`);
    log(`  - section:   ${files[file].section}`);
    log(`  - type:      ${files[file].type}`);
  });

  done();
};


/**
 * metalsmithAssignPermalink required since metalsmith-permalinks uses the
 * filedata.permalink as a boolean to determine whether or not to generate
 * a permalink for the file. This is run after metalsmith-permalinks to set
 * the value of filedata.permalink to the actual permalink url as a string.
 *
 * @param {Object} files
 * @param {Object} metalsmith
 * @param {Function} done
 */
var metalsmithAssignPermalink = (files, metalsmith, done) => {
  var log = debug('assignPermalink');
  Object.keys(files).forEach((file) => {
    var data = files[file];

    files[file].permalink = `${siteData.site.url}/${data.path || ''}/`;

    log(`assignPermalink ${file}`);
    log(`  - path:      ${files[file].path}`);
    log(`  - permalink: ${files[file].permalink}`);
  });

  done();
};


/**
 * formatPage
 *
 * @param {Object} files keyed by filename from metalsmith
 * @param {Object} metalsmith
 * @param {Function} done
 */
var metalsmithFormatPage = (files, metalsmith, done) => {
  var log = debug('formatPage');
  Object.keys(files).forEach((file) => {
    var data = files[file];

    var defaultData = {
      slug:          slug(data.title),
      section:       'root',
      type:          'page',
      image:         siteData.avatarUrl,
      datePublished: siteData.buildDate,
      dateModified:  siteData.buildDate,
      og: {
        type: 'page',
      },
      schema: {
        itemtype: 'https://schema.org/WebPage',
      },
      widgets: {
        sharePost:   false,
        aboutMe:     true,
        allPosts:    true,
        latestPosts: false,
      },
    };

    files[file] = defaultsDeep(data, defaultData);

    log(`formatPage ${file}`);
    log(`  - slug:    ${files[file].slug}`);
    log(`  - section: ${files[file].section}`);
    log(`  - type:    ${files[file].type}`);
  });

  done();
};


gulp.task('html', (cb) => {

  metalsmith(__dirname)
    .metadata(siteData)
    .source('./md/')
    .use(metalsmithIgnore([
      '!**/*.md',
      '_archive/**',
      '_drafts/**',
    ]))

    // metadata here is attached to metalsmith instance

    // Read markdown into {{ content }} and change sources to **.html
    // metadata added here is attached to the main post object
    .use(metalsmithMarkdown({
      gfm:    true,
      tables: true,

      /**
       * marked doesn't add this to parsed code blocks since it doesn't assume
       * highlighting is for highlight.js
       * @see {@link https://github.com/chjj/marked/pull/418}
       */
      langPrefix: 'hljs ',

      // This options key gets passed to marked (whereas the parent object is
      // the options key for the metalsmith-marked plugin)
      highlight: function  (code, lang) {
        return hljs.highlightAuto(code).value;
      },
    }))

    // Posts -- note the html file extension due to markdown()
    .use(metalsmithBranch('_posts/*.html')
      .use(metalsmithSnippet({
        maxLength: 500,
      }))
      .use(metalsmithFormatPost)
      .use(metalsmithBranchDebugger({ suffix: 'posts' }))
    )

    // Pages -- note the blog/ path due to permalinks()
    .use(metalsmithBranch('!blog/**/*.html')
      .use(metalsmithFormatPage)
      .use(metalsmithBranchDebugger({ suffix: 'pages' }))
    )

    .use(metalsmithPermalinks({
      pattern:  'blog/:slug',
      relative: 'off',
      linksets: [
        {
          match: { type: 'post' },
          pattern:  'blog/:slug',
          relative: 'off',
        },
        {
          match: { type: 'page' },
          pattern:  ':title',
          relative: 'off',
        },
      ],
    }))
    .use(metalsmithAssignPermalink)

    .use(metalsmithBranchDebugger({ suffix: 'all' }))

    // metadata attached to collections is attached to the metalsmith global
    // metadata().collections.INSTANCE.metadata, not to each file's metadata
    .use(metalsmithCollections({
      pages: {
        pattern: '!blog/**',
        refer:   false,
      },
      posts: {
        pattern: 'blog/**',
        reverse: true,
        sortBy:  'datePublished',
      },
      latestPost: {
        limit:   1,
        pattern: 'blog/**',
        refer:   false,
        reverse: true,
        sortBy:  'datePublished',
      },
      latestPosts: {
        limit:   10,
        pattern: 'blog/**',
        reverse: true,
        sortBy:  'datePublished',
      },
    }))

    .use(metalsmithMetaDebugger())

    // Pump into HBS
    // helpers is undocumented, but provided by consolidate.js (which
    // is the interface metalsmith uses for handlebars)
    /**
     * @see {@link https://github.com/superwolff/metalsmith-layouts#consolidate}
     * @see {@link https://github.com/tj/consolidate.js/blob/master/lib/consolidate.js#L709}
     */
    .use(metalsmithLayouts({
      'engine':    'handlebars',
      'directory': 'hbs/layouts/',
      'partials':  'hbs/partials/',
      'default':   'default.hbs',
      'helpers': {
        moment:     hbsHelperMoment,
        uriencode:  hbsUriEncode,
      },
      'preventIndent': true,
    }))

    // Transform final HTML
    .use(metalsmithWidow({
      selectors: [
        '.article__header__link--permalink',
        '.article__header__link',
        '.article__subheader',
        '.articleTile h2 a',
      ],
    }))

    .use(metalsmithFeed({
      collection: 'posts',
    }))

    .use(metalsmithSitemap({
      hostname:         siteData.site.url,
      omitIndex:        true,
      modifiedProperty: 'datePublished',
      urlProperty:      'permalink',
    }))

    .clean(false)
    .destination('./public/')
    .build((err) => {
      cb(err);
    });

});

// -----------------------------------------------------------------------------
// Task: Watch and Sync
// -----------------------------------------------------------------------------

gulp.task('sync', () => {

  browserSync.init({
    open: false,
    server: {
      baseDir: './public',
    },
  });

  gulp.watch(`${dirs.css.source}/**/*.scss`, [ 'css' ]);
  gulp.watch(`${dirs.markdown.source}/**/*.md`, [ 'html' ]);
  gulp.watch(`${dirs.templates.source}/**/*.hbs`, [ 'html' ]);

});

// -----------------------------------------------------------------------------
// Task: Default
// -----------------------------------------------------------------------------

gulp.task('default', [ 'js', 'css', 'assets', 'html', 'static' ]);

