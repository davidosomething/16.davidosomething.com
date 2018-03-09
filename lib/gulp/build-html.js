/**
 * @module gulp/build-html
 * @requires module:lib/site
 */
'use strict';

/**
 * build html async gulp task
 *
 * @param {Function} cb Callback function
 */
module.exports = function gulpTaskBuildHtml(cb) {

  const siteData = require('../site.js');

  const path = require('path');

  const handlebars = require('handlebars');

  const metalsmith = require('metalsmith');

  const metalsmithBranch           = require('metalsmith-branch');
  const metalsmithCollections      = require('metalsmith-collections');
  const metalsmithDiscoverPartials = require('metalsmith-discover-partials');
  const metalsmithDiscoverHelpers  = require('metalsmith-discover-helpers');
  const metalsmithFeed             = require('metalsmith-feed');
  const metalsmithIgnore           = require('metalsmith-ignore');
  const metalsmithLayouts          = require('metalsmith-layouts');
  const metalsmithRemark           = require('metalsmith-remark');
  const metalsmithPermalinks       = require('metalsmith-permalinks');
  const metalsmithSitemap          = require('metalsmith-sitemap');
  const metalsmithSnippet          = require('metalsmith-snippet');
  const metalsmithWidow            = require('metalsmith-widow');

  const metalsmithLogObjects       = require('../metalsmith-log-objects');
  const metalsmithSetFileDefaults  = require('../metalsmith-set-file-defaults');
  const metalsmithAssignPermalinks = require('../metalsmith-assignpermalinks');

  const metalsmithGroupedPage = require('../metalsmith-grouped-page');

  // transforms for metalsmith-grouped-page
  const gptTagPageDefaults  = require('../metalsmith-grouped-page/transforms/tag');
  const gptAddToMetadata    = require('../metalsmith-grouped-page/transforms/add-to-metadata');

  handlebars.registerHelper('moment', require('helper-date'));

  metalsmith(path.resolve(__dirname, '../../'))
    .metadata(siteData)
    .use(metalsmithLogObjects({
      objects:  'meta',
      suffix:   'meta',
    }))

    .source('./md/')
    .use(metalsmithIgnore([
      '!**/*.md',
      '_archive/**',
      '_drafts/**',
    ]))

    // -----------------------------------------------------------------
    // Markdown and frontmatter -> html + file metadata
    // -----------------------------------------------------------------

    // Read markdown into {{ content }} and change sources to **.html
    // metadata added here is attached to the main post object
    .use(metalsmithRemark([
      require('remark-highlight.js'),
    ]))

    // -----------------------------------------------------------------
    // Branching -- note that directories do not match ultimate location
    // at this point since metalsmithPermalinks has not run yet.
    // -----------------------------------------------------------------

    // Pages
    .use(metalsmithBranch([
      '!__groupedPage/**/*',
      '!_posts/**/*',
    ])
      .use(metalsmithSetFileDefaults({ type: 'page' }))
      .use(metalsmithLogObjects({ suffix: 'pages' }))
    )

    // Posts -- note the html file extension due to markdown transform
    .use(metalsmithBranch('_posts/*.html')
      .use(metalsmithSnippet({ maxLength: 500 }))
      .use(metalsmithSetFileDefaults({ type: 'post' }))
      .use(metalsmithGroupedPage({
        path:    'tags',
        metadata: {
          section: 'root',
          type:    'tag',
          widgets: {
            tags: true,
          },
        },
        transforms: [
          gptTagPageDefaults,
          gptAddToMetadata({
            metakey: 'tags',
          }),
        ],
      }))
      .use(metalsmithLogObjects({ suffix: 'posts' }))
    )

    // -----------------------------------------------------------------
    // Permalinks
    // -----------------------------------------------------------------

    .use(metalsmithPermalinks({
      pattern:  'orphans/:slug',
      relative: 'off',
      linksets: [
        {
          match: { type: 'post' },
          pattern:  'blog/:slug',
          relative: 'off',
        },
        {
          match: { type: 'tag' },
          pattern:  'tag/:slug',
          relative: 'off',
        },
        {
          match: { section: 'root' },
          pattern:  ':title',
          relative: 'off',
        },
      ],
    }))
    .use(metalsmithAssignPermalinks({ base: `${siteData.site.url}/` }))

    .use(metalsmithLogObjects({ suffix: 'all' }))

    // -----------------------------------------------------------------
    // Collections
    // -----------------------------------------------------------------

    // metadata attached to collections is attached to the metalsmith global
    // metadata().collections.INSTANCE.metadata, not to each file's metadata
    .use(metalsmithCollections({
      pages: {
        pattern: '!{' + [
          'blog/**',
          'tag/**',
          '404.html',
        ].join(',') + '}',
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
      homePosts: {
        limit:   5,
        pattern: 'blog/**',
        reverse: true,
        sortBy:  'datePublished',
      },
    }))

    // -----------------------------------------------------------------
    // Output formats
    // -----------------------------------------------------------------

    /**
     * Pump into HBS
     * `helpers` is undocumented, but provided by consolidate.js (which is the
     * interface metalsmith uses for handlebars)
     *
     * @see {@link https://github.com/superwolff/metalsmith-layouts#consolidate}
     * @see {@link https://github.com/tj/consolidate.js/blob/master/lib/consolidate.js#L709}
     * @example
     * helper in options.helpers =>
     *  handlebars.registerHelper(helper, options.helpers[helper])
     */
    .use(metalsmithDiscoverPartials({
      directory: 'hbs/partials',
      pattern: /\.hbs$/,
    }))
    .use(metalsmithDiscoverHelpers({
      directory: 'hbs/helpers',
      pattern: /\.js$/,
    }))
    .use(metalsmithLayouts({
      'directory': 'hbs/layouts',
      'default':   'default.hbs',
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

    // RSS Feed
    .use(metalsmithFeed({
      collection: 'posts',
    }))

    // Sitemap
    .use(metalsmithSitemap({
      hostname:         siteData.site.url,
      omitIndex:        true,
      modifiedProperty: 'datePublished',
      urlProperty:      'permalink',
    }))

    // -----------------------------------------------------------------
    // Done
    // -----------------------------------------------------------------

    .clean(false)
    .destination('./public/')
    .build(cb);

};

