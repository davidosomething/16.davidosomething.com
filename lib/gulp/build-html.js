/*eslint-env node*/

module.exports = (cb) => {

  const siteData = require('../site.js');

  const path = require('path');
  const hljs = require('highlight.js');

  const metalsmith = require('metalsmith');

  const metalsmithBranch         = require('metalsmith-branch');
  const metalsmithCollections    = require('metalsmith-collections');
  const metalsmithFeed           = require('metalsmith-feed');
  const metalsmithIgnore         = require('metalsmith-ignore');
  const metalsmithLayouts        = require('metalsmith-layouts');
  const metalsmithMarkdown       = require('metalsmith-markdown');
  const metalsmithPermalinks     = require('metalsmith-permalinks');
  const metalsmithSitemap        = require('metalsmith-sitemap');
  const metalsmithSnippet        = require('metalsmith-snippet');
  const metalsmithWidow          = require('metalsmith-widow');

  const metalsmithLogObjects       = require('../metalsmith-log-objects');
  const metalsmithFormatPost       = require('../metalsmith-mine').metalsmithFormatPost;
  const metalsmithFormatPage       = require('../metalsmith-mine').metalsmithFormatPage;
  const metalsmithFormatJsdoc      = require('../metalsmith-mine').metalsmithFormatJsdoc;
  const metalsmithAssignPermalinks = require('../metalsmith-assignpermalinks');

  const hbsHelperMoment = require('../../hbs/helpers/moment.js');
  const hbsUriEncode    = require('../../hbs/helpers/uriencode.js');
  const hbsEachFrom     = require('../../hbs/helpers/eachFrom.js');

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
      highlight: (code, lang) => {
        return hljs.highlightAuto(code).value;
      },
    }))

    // Pages -- note the blog/ path due to permalinks()
    .use(metalsmithBranch([ '!_posts/**/*', '!docs/**/*' ])
      .use(metalsmithFormatPage())
      .use(metalsmithLogObjects({ suffix: 'pages' }))
    )

    // Posts -- note the html file extension due to markdown()
    .use(metalsmithBranch('_posts/*.html')
      .use(metalsmithSnippet({ maxLength: 500 }))
      .use(metalsmithFormatPost())
      .use(metalsmithLogObjects({ suffix: 'posts' }))
    )

    .use(metalsmithBranch('docs/jsdoc/*.html')
      .use(metalsmithFormatJsdoc())
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
          match: { collection: 'pages', section: 'docs' },
          pattern:  'docs/:type',
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
    .use(metalsmithAssignPermalinks())

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
     */
    .use(metalsmithLayouts({
      'engine':    'handlebars',
      'directory': 'hbs/layouts/',
      'partials':  'hbs/partials/',
      'default':   'default.hbs',
      'helpers': {
        moment:     hbsHelperMoment,
        uriencode:  hbsUriEncode,
        eachFrom:   hbsEachFrom,
      },
      'preventIndent': true,
    }))

    // @TODO branch no docs for the following

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

};

