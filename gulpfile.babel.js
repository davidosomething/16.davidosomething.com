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
// Requires
// =============================================================================

// -----------------------------------------------------------------------------
// Node
// -----------------------------------------------------------------------------

import { exec } from 'child_process';

// -----------------------------------------------------------------------------
// Vendor
// -----------------------------------------------------------------------------

import debug from 'debug'; // DEBUG=gulp gulp to output
import defaultsDeep from 'lodash.defaultsdeep';
import del from 'del';
import merge from 'merge-stream';

// -----------------------------------------------------------------------------
// Require: Gulp generics
// -----------------------------------------------------------------------------

import gulp from 'gulp';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';

// -----------------------------------------------------------------------------
// Require: CSS
// -----------------------------------------------------------------------------

import sassLint from 'gulp-sass-lint';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// -----------------------------------------------------------------------------
// Require: JS
// -----------------------------------------------------------------------------

import eslint from 'gulp-eslint';

// -----------------------------------------------------------------------------
// Require: Static Generation
// -----------------------------------------------------------------------------

// import mdast from 'gulp-mdast';
// import mdastLint from 'mdast-lint';
import slug from 'slug';

import metalsmith from 'metalsmith';
import metalsmithBranch from 'metalsmith-branch';
import metalsmithBranchDebugger from './lib/metalsmith-branch-debugger';
import metalsmithCollections from 'metalsmith-collections';
import metalsmithDefine from 'metalsmith-define';
import metalsmithHeadings from 'metalsmith-headings';
import metalsmithIgnore from 'metalsmith-ignore';
import metalsmithLayouts from 'metalsmith-layouts';
import metalsmithMarkdown from 'metalsmith-markdown';
import metalsmithMetaDebugger from './lib/metalsmith-meta-debugger';
import metalsmithPaths from 'metalsmith-paths';
import metalsmithPermalinks from 'metalsmith-permalinks';
import metalsmithSnippet from 'metalsmith-snippet';
import metalsmithValidate from 'metalsmith-validate';
import metalsmithWidow from 'metalsmith-widow';

import hbsHelperMoment from './hbs/helpers/moment.js';


// =============================================================================
// Config
// =============================================================================

var dirs = {};
dirs.dist = './public/';
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


// =============================================================================
// Tasks
// =============================================================================


// -----------------------------------------------------------------------------
// Task: Clean
// -----------------------------------------------------------------------------

gulp.task('clean:css', () => {
  return del([
    `${dirs.css.dist}/**/*`, //*/
  ]);
});


gulp.task('clean:js', () => {
  return del([
    `${dirs.js.dist}/**/*`, //*/
  ]);
});


gulp.task('clean:assets', () => {
  return del([
    `${dirs.assets.dist}/fonts/**/*`,
    `${dirs.assets.dist}/img/**/*`, //*/
  ]);
});


gulp.task('clean:all', () => {
  return del([
    `${dirs.dist}/**/*`, //*/
  ]);
});


// -----------------------------------------------------------------------------
// Task: CSS
// -----------------------------------------------------------------------------

gulp.task('lint:css', () => {
  return gulp.src(`${dirs.css.source}/**/*.scss`) //*/
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});


gulp.task('css', () => {

  var globalSass = gulp.src(`${dirs.css.source}/global.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())

    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ]))
    .pipe(sourcemaps.write());

  var vendor = gulp.src([
    `${dirs.jspm}/github/necolas/normalize.css@3.0.3/normalize.css`,
  ]);

  return merge(vendor, globalSass)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat('global.css'))
    .pipe(sourcemaps.write())

    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss([ cssnano ]))
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(`${dirs.css.dist}/`));

});

// -----------------------------------------------------------------------------
// Task: JS
// -----------------------------------------------------------------------------

gulp.task('lint:js', () => {

  return gulp.src([ 'gulpfile.babel.js', `${dirs.js.source}/**/*.js` ])  //*/
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});

gulp.task('js', (cb) => {

  exec('npm run js', (err) => {
    return cb(err);
  });

});

// -----------------------------------------------------------------------------
// Task: Assets
// -----------------------------------------------------------------------------

gulp.task('assets', () => {

  return gulp.src('./assets/{fonts,img}/**')
    .pipe(gulp.dest(`${dirs.assets.dist}/`));

});

// -----------------------------------------------------------------------------
// Task: HTML
// -----------------------------------------------------------------------------

//*/

var now = new Date();
var siteData = {
  avatarUrl: '/assets/img/avatar.png',
  buildDate: now,
  site: {
    url:          'http://davidosomething.com/',
    title:        'davidosomething.com',
    description:  'Web developer; super handsome. This is my personal website.',
    meta: [
      { name: 'author', content: 'David O\'Trakoun' },
      { name: 'google-site-verification', content: 'CUF_b2uUr3xngYZU_Assv-CXFtDTzQjFdoh3_S35FDQ' },
      { name: 'msvalidate.01',            content: 'DB32AB8ADBD71157CA9F135EAD9EFE23' },
      { name: 'p:domain_verify',          content: '87f3b7851e149ff74531fdb012c62bf3' },
      { property: 'fb:admins', content: '16109547' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@davidosomething' },
    ],
  },
};

slug.defaults.mode = 'rfc3986';

gulp.task('lint:md', (cb) => {

  metalsmith(__dirname)
    .source('./md/')

    // Posts -- note the html file extension due to markdown()
    .use(metalsmithValidate({
      pattern: '_posts/*',
      metadata: {
        title: true,
        subheader: true,
        datePublished: true,
        description: true,
        tags: {
          exists: true,
          type: 'Array',
        },
      },
    }))
    .build(function (err, files) {
      if (err) {
        return cb(err);
      }
      cb();
    });

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
      excerpt:       data.snippet,
      section:       'blog',
      slug:          slug(data.title),
      type:          'post',
      image:         siteData.avatarUrl,
      datePublished: now,
      dateModified:  now,
      schema: {
        itemtype: 'https://schema.org/BlogPosting',
      },
      widgets: {
        sharePost:    true,
        aboutMe:      true,
        latestPosts:  true,
      },
    };

    files[file] = defaultsDeep(data, defaultData);

    log(`formatPost ${file}`);
    log(`  - path: ${files[file].path}`);
    log(`  - section: ${files[file].section}`);
    log(`  - type: ${files[file].type}`);
    log(`  - slug: ${files[file].slug}`);
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
      type:          'page',
      image:         siteData.avatarUrl,
      datePublished: now,
      dateModified:  now,
      schema: {
        itemtype: 'https://schema.org/WebPage',
      },
      widgets: {
        aboutMe:   true,
        allPosts:  true,
      },
    };

    files[file] = defaultsDeep(data, defaultData);
    files[file].section = slug(data.paths.root) || 'root';

    log(`formatPage ${file}`);
    log(`  - path: ${files[file].path}`);
    log(`  - section: ${files[file].section}`);
    log(`  - type: ${files[file].type}`);
    log(`  - slug: ${files[file].slug}`);
  });
  done();
};


gulp.task('html', (cb) => {

  metalsmith(__dirname)
    .source('./md/')
    .use(metalsmithIgnore('_drafts/*'))

    // metadata here is attached to metalsmith instance
    .use(metalsmithDefine(siteData))

    // Read markdown into {{ content }} and change sources to **.html
    // metadata added here is attached to the main post object
    .use(metalsmithMarkdown())

    // Posts -- note the html file extension due to markdown()
    .use(metalsmithBranch('_posts/*.html')
      .use(metalsmithHeadings())
      .use(metalsmithSnippet({
        maxLength: 500,
      }))
      .use(metalsmithFormatPost)
      .use(metalsmithPermalinks({
        pattern:  'blog/:slug',
        relative: 'off',
      }))
      .use(metalsmithPaths({ property: 'paths' }))
      .use(metalsmithBranchDebugger({ suffix: 'posts' }))
    )

    // Pages -- note the blog/ path due to permalinks()
    .use(metalsmithBranch('!blog/**/*.html')
      .use(metalsmithPaths({ property: 'paths' }))
      .use(metalsmithFormatPage)
      .use(metalsmithBranchDebugger({ suffix: 'pages' }))
    )

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
      engine:    'handlebars',
      directory: 'hbs/layouts/',
      partials:  'hbs/partials/',
      'default':   'default.hbs',
      helpers: {
        moment: hbsHelperMoment,
      },
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

    .clean(false)
    .destination('./public/')
    .build((err) => {
      cb(err);
    });

});

// -----------------------------------------------------------------------------
// Task: Watch
// -----------------------------------------------------------------------------

gulp.task('watch', () => {

  return gulp.watch(`${dirs.css.source}/**/*.scss`, [ 'css' ]);

});

// -----------------------------------------------------------------------------
// Task: Default
// -----------------------------------------------------------------------------

gulp.task('default', [ 'js', 'css', 'assets', 'html' ]);

