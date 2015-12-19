const dirs = {};
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

const siteData = {
  avatarUrl: '/assets/img/avatar.png',
  buildDate: new Date(),
  site: {
    url:          'http://davidosomething.com',
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

export { dirs, siteData };