# davidosomething.com 2016

> WORK IN PROGRESS

Static generated site for davidosomething.com

## Stack

### Build

- node >= 4.2.0
- npm
- gulp
- metalsmith

### CSS

- BEM syntax
- SCSS compiled with node-sass
- autoprefixed
- cssnano

### JS

- SystemJS loader (probably just gonna switch to webpack+hmr+react+browsersync)
- JSPM package manager (probably just going to use npm)
- Babel ES transpiler

### HTML

- metalsmith static generated site
- Highlight.js pre-processed for code blocks via metalsmith-metallic
- Handlebars templating

## TODO 

- sitemap
- rss feed
- finish templating

### content

- featured articles widget
- article share links
- cleanup 

### lint + deploy

- lint task in gulp
- site docs and styleguide generation
- deploy to surge?/github?/openshift? via codeship?/deploybot?

### js

- current article should be highlighted if in a widget
- react view for each article and widget

