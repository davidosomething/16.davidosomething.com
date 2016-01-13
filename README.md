# davidosomething.com for 2016

> Static generated site for [davidosomething.com]

[![Upstream][upstreamBadge]][upstreamLink]
[![David dependency status][davidBadge]][davidLink]
[![Development Dependency Status][davidDevBadge]][davidDevLink]
[![Build Status][travisDevBadge]][travisLink]

[![screenshot][screenshot]][screenshot]

## Stack

Requires node >= 4.2.0 for ES6 (I recommend using
[nvm](https://github.com/creationix/nvm), for which `nvm use` will
read `.nvmrc` and use the version of node specified there. The package
[avn](https://github.com/wbyoung/avn) can auto-switch upon entering directory if
installed).

NOTE: g++ version 4.8 or higher is required for node-gyp compilation on node 4.
This particularly applies to the Travis-CI deployment.

## Build

```bash
npm i
npm i -g gulp jspm
jspm install
gulp
```

## Deploy

There are scripts configured in `package.json` to deploy via Travis CI.  
Output is generated to `public/` and, if running on `master` from Travis,
deployed to [surge.sh](https://surge.sh/) and my [GitHub Pages repo].

## TODO

- CSS
    - [ ] lint status to code climate
- JS
    - [ ] codecoverage to codecov.io
    - [ ] jsdoc generation (use esdoc?)
    - [ ] can further refactor share link popups
    - [ ] react view for each article and widget
    - [ ] hot module reload
    - [ ] current article should be highlighted if in a widget
- HTML
    - [ ] eventually remove hbs + metalsmith and use react + gatsby
- Content
    - [ ] add images
        - [ ] image hosting? e.g. cloudinary


[davidosomething.com]: https://davidosomething.com
[screenshot]:    https://raw.githubusercontent.com/davidosomething/16.davidosomething.com/dev/meta/screenshot.jpg
[davidBadge]:    https://david-dm.org/davidosomething/16.davidosomething.com.png?theme=shields.io
[davidLink]:     https://david-dm.org/davidosomething/16.davidosomething.com#info=dependencies
[davidDevBadge]: https://david-dm.org/davidosomething/16.davidosomething.com/dev-status.png?theme=shields.io
[davidDevLink]:  https://david-dm.org/davidosomething/16.davidosomething.com#info=devDependencies
[upstreamBadge]: https://img.shields.io/badge/upstream-GitHub-lightgrey.svg
[upstreamLink]:  https://github.com/davidosomething/16.davidosomething.com
[travisLink]: https://travis-ci.org/davidosomething/16.davidosomething.com
[travisDevBadge]: https://travis-ci.org/davidosomething/16.davidosomething.com.svg?branch=dev
[GitHub Pages repo]: https://github.com/davidosomething/davidosomething.github.io

