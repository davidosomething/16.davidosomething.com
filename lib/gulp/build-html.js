module.exports = (cb) => {

  const siteData = require('../site.js');

  const path = require('path');

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
  const metalsmithAssignPermalinks = require('../metalsmith-assignpermalinks');

  //
  // NOTE: hbs helpers required inline, just easier to maintain that way.
  //

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

    // metadata here is attached to metalsmith instance

    // Read markdown into {{ content }} and change sources to **.html
    // metadata added here is attached to the main post object
    .use(metalsmithRemark([
      require('remark-highlight.js'),
    ]))

    // Pages -- note the blog/ path due to permalinks()
    .use(metalsmithBranch([ '!_posts/**/*', '!docs/**/*' ])
      .use(metalsmithSetFileDefaults({ type: 'page' }))
      .use(metalsmithLogObjects({ suffix: 'pages' }))
    )

    // Posts -- note the html file extension due to markdown()
    .use(metalsmithBranch('_posts/*.html')
      .use(metalsmithSnippet({ maxLength: 500 }))
      .use(metalsmithSetFileDefaults({ type: 'post' }))
      .use(metalsmithLogObjects({ suffix: 'posts' }))
    )

    .use(metalsmithBranch('docs/jsdoc/*.html')
      .use(metalsmithLogObjects({ suffix: 'jsdoc-before' }))
      .use(metalsmithSetFileDefaults({ type: 'jsdoc' }))
      .use(metalsmithLogObjects({ suffix: 'jsdoc' }))
    )

    .use(metalsmithPermalinks({
      pattern:  'orphans/:slug',
      relative: 'off',
      linksets: [
        {
          match: { section: 'root' },
          pattern:  ':title',
          relative: 'off',
        },
        {
          match: { section: 'docs', type: 'page' },
          pattern:  'docs/:docs',
          relative: 'off',
        },
        {
          match: { collection: 'jsdoc', type: 'jsdoc' },
          pattern:  'docs/jsdoc/:title',
          relative: 'off',
        },
        {
          match: { type: 'post' },
          pattern:  'blog/:slug',
          relative: 'off',
        },
      ],
    }))
    .use(metalsmithAssignPermalinks({ base: `${siteData.site.url}/` }))

    .use(metalsmithLogObjects({ suffix: 'all' }))

    // metadata attached to collections is attached to the metalsmith global
    // metadata().collections.INSTANCE.metadata, not to each file's metadata
    .use(metalsmithCollections({
      pages: {
        pattern: '!{blog/**,docs/jsdoc/**,404.html}',
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
        markdown:  require('../../hbs/helpers/markdown.js'),
        moment:    require('../../hbs/helpers/moment.js'),
        uriencode: require('../../hbs/helpers/uriencode.js'),
        eachFrom:  require('../../hbs/helpers/eachFrom.js'),
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
    .build(cb);

};

