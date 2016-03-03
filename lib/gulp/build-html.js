'use strict';

module.exports = (cb) => {

  const siteData = require('../site.js');

  const path = require('path');

  const handlebars = require('handlebars');

  const metalsmith = require('metalsmith');

  const metalsmithBranch         = require('metalsmith-branch');
  const metalsmithCollections    = require('metalsmith-collections');
  const metalsmithFeed           = require('metalsmith-feed');
  const metalsmithIgnore         = require('metalsmith-ignore');
  const metalsmithLayouts        = require('metalsmith-layouts');
  const metalsmithRemark         = require('metalsmith-remark');
  const metalsmithPermalinks     = require('metalsmith-permalinks');
  const metalsmithSitemap        = require('metalsmith-sitemap');
  const metalsmithSnippet        = require('metalsmith-snippet');
  const metalsmithWidow          = require('metalsmith-widow');

  const metalsmithLogObjects       = require('../metalsmith-log-objects');
  const metalsmithSetFileDefaults  = require('../metalsmith-set-file-defaults');
  const metalsmithGroupedPage      = require('../metalsmith-grouped-page');
  const metalsmithAssignPermalinks = require('../metalsmith-assignpermalinks');

  //
  // NOTE: my hbs helpers required inline, just easier to maintain that way.
  // Except this one.
  //
  handlebars.registerHelper('moment', require('helper-moment'));

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
      '!docs/**/*',
    ])
      .use(metalsmithSetFileDefaults({ type: 'page' }))
      .use(metalsmithLogObjects({ suffix: 'pages' }))
    )

    // Posts -- note the html file extension due to markdown transform
    .use(metalsmithBranch('_posts/*.html')
      .use(metalsmithSnippet({ maxLength: 500 }))
      .use(metalsmithSetFileDefaults({ type: 'post' }))
      .use(metalsmithGroupedPage({
        path: 'tags',
        metadata: {
          section: 'root',
          type: 'tag',
        },
        transform: (groups) => {
          let transformedGroups = {};
          Object.keys(groups).forEach((group) => {
            let transformed = transformedGroups[group] = groups[group];
            transformed.title  = `Tag: ${transformed.groupedPage.name}`;
            transformed.slug   = transformed.groupedPage.slug;
            transformed.layout = 'tag.hbs';
          });
          return transformedGroups;
        },
      }))
      .use(metalsmithLogObjects({ suffix: 'posts' }))
    )

    // JSDoc
    .use(metalsmithBranch('docs/jsdoc/*.html')
      .use(metalsmithLogObjects({ suffix: 'jsdoc-before' }))
      .use(metalsmithSetFileDefaults({ type: 'jsdoc' }))
      .use(metalsmithLogObjects({ suffix: 'jsdoc' }))
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
          match: { collection: 'jsdoc', type: 'jsdoc' },
          pattern:  'docs/jsdoc/:title',
          relative: 'off',
        },
        {
          match: { section: 'docs', type: 'page' },
          pattern:  'docs/:docs',
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
          'docs/jsdoc/**',
          'tag/**',
          '404.html',
        ].join(',') + '}',
        refer:   false,
      },
      jsdoc: {
        refer:   false,
        sortBy:  'title',
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
    .use(metalsmithLayouts({
      'engine':    'handlebars',
      'directory': 'hbs/layouts/',
      'partials':  'hbs/partials/',
      'default':   'default.hbs',
      'helpers': {
        eachFrom:  require('../../hbs/helpers/eachFrom.js'),
        markdown:  require('../../hbs/helpers/markdown.js'),
        slug:      require('../../hbs/helpers/slug.js'),
        uriencode: require('../../hbs/helpers/uriencode.js'),
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

