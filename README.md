# davidosomething.com for 2016

> Static generated site for [davidosomething.com](http://davidosomething.com)

[![Upstream][upstreamBadge]][upstreamLink]
[![David dependency status][davidBadge]][davidLink]
[![Development Dependency Status][davidDevBadge]][davidDevLink]

## Stack

Requires node >= 4.2.0 for ES6 (I recommend using
[nvm](https://github.com/creationix/nvm), for which `nvm use` will
read `.nvmrc` and use the version of node specified there. The package
[avn](https://github.com/wbyoung/avn) can auto-switch upon entering directory if
installed).

## Build

```
npm i -g gulp
gulp
```

Output is generated in `public/`

## TODO

### CSS

- [x] BEM syntax
    - [ ] needs lint rule
- [x] SCSS compiled with node-sass
- [x] postcss: autoprefixed, cssnano
- [ ] browsersync css serve and update

### JS

- [x] Google Analytics
- [x] SystemJS loader
- [x] JSPM package manager (probably just going to use npm)
- [x] Babel ES transpiler
- [ ] can further refactor share link popups
- [ ] react view for each article and widget
- [ ] hot module reload
- [ ] current article should be highlighted if in a widget

### HTML

- [x] metalsmith static generated site
- [x] Highlight.js pre-processed for code blocks
- [x] Handlebars templating
- [ ] eventually remove metalsmith and just use react to render static

### SEO

- [x] Standard html meta tags
- [x] Canonical links
- [x] Site verifications for google, bing
- [x] OpenGraph and Twitter meta tags
- [x] schema.org microdata
- [x] sitemap
- [x] robots meta

### Content

- [x] cleanup
- [x] fix old image urls
- [x] article share buttons
    - [x] twitter
    - [x] facebook
    - [x] google+
- [ ] add descriptions and images
- [x] Useful 404 page

### Deploy

- [ ] site docs and styleguide generation
- [ ] deploy to surge?/github?/openshift? via codeship?/deploybot?

----

[davidBadge]:       https://david-dm.org/davidosomething/16.davidosomething.com.png?theme=shields.io
[davidLink]:        https://david-dm.org/davidosomething/16.davidosomething.com#info=dependencies
[davidDevBadge]:    https://david-dm.org/davidosomething/16.davidosomething.com/dev-status.png?theme=shields.io
[davidDevLink]:     https://david-dm.org/davidosomething/16.davidosomething.com#info=devDependencies
[upstreamBadge]:    https://img.shields.io/badge/upstream-GitHub-lightgrey.svg
[upstreamLink]:     https://github.com/davidosomething/16.davidosomething.com
