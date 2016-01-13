const debug         = require('debug');
const defaultsDeep  = require('lodash.defaultsdeep');
const slug          = require('slug');

slug.defaults.modes['dkoslug'] = {
  replacement:  '-',
  symbols:      true,
  remove:       /[.]/g,
  lower:        true,
  charmap:      slug.charmap,
  multicharmap: slug.multicharmap,
};
slug.defaults.mode = 'dkoslug';


exports.metalsmithFormatPost = function (options) {
  let siteData = options.siteData;

  /**
   * formatPost
   *
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function formatPost(files, metalsmith, done) {
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
};


exports.metalsmithFormatPage = function (options) {
  let siteData = options.siteData;

  /**
   * formatPage
   *
   * @param {Object} files keyed by filename from metalsmith
   * @param {Object} metalsmith
   * @param {Function} done
   */
  return function formatPage(files, metalsmith, done) {
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
};

