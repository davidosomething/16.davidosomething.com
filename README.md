# davidosomething.com for 2016

> WORK IN PROGRESS

Static generated site for [davidosomething.com](http://davidosomething.com)

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
- [ ] react view for each article and widget
- [ ] hot module reload
- [ ] current article should be highlighted if in a widget

### HTML

- [x] metalsmith static generated site
- [x] Highlight.js pre-processed for code blocks
- [x] Handlebars templating

### SEO

- [x] Standard html meta tags
- [x] Canonical links
- [x] Site verifications for google, bing
- [x] OpenGraph and Twitter meta tags
- [x] schema.org microdata
- [ ] sitemap
- [x] robots meta

### Content

- [ ] article share buttons
- [ ] cleanup, add descriptions and images
- [ ] Useful 404 page

### Deploy

- [ ] site docs and styleguide generation
- [ ] deploy to surge?/github?/openshift? via codeship?/deploybot?

