# davidosomething.com for 2016

> Static generated site for [davidosomething.com]

[![Upstream][upstreamBadge]][upstreamLink]
[![David dependency status][davidBadge]][davidLink]
[![Development Dependency Status][davidDevBadge]][davidDevLink]
[![Build Status][travisDevBadge]][travisLink]

[![screenshot][screenshot]][screenshot]

## Stack

Requires node >= 4.2.0 for ES6 (I recommend using [nvm], for which `nvm use`
(or `nvm install`) will read `.nvmrc` and use the version of node specified
there. The package [avn] can auto-switch upon entering directory if installed).

NOTE: g++ version 4.8 or higher is required for node-gyp compilation on node 4.
This particularly applies to the Travis-CI deployment.

## Build

Install dependencies:

```bash
npm install --global gulp jspm
npm install
jspm install
```

And run `gulp` to build.

Note that `jspm` is installed globally for local dev, whereas the CI-deployment
scripts all use `npm run` so the `jspm` bin is provided by the local node
module.

## Deploy

There are scripts configured in `package.json` to deploy via CI.  
Output is generated to `public/` and, if running on `master` from Travis,
deployed to [surge.sh](https://surge.sh/) and my [GitHub Pages repo].

## TODO

- Deployment workflow:
    - [x] Push branch to GH
    - [x] Validation services use GH status API to validate
    - [ ] Open PR with branch, validation services validate
    - [ ] Travis builds PR, marks using GH status API
    - [ ] Merge PR into master, Travis builds, webhook to DeployBot
    - [ ] DeployBot builds and deploys, reports to GH Deployments API

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
[davidBadge]:    https://david-dm.org/davidosomething/16.davidosomething.com.png?theme=shields.io
[davidLink]:     https://david-dm.org/davidosomething/16.davidosomething.com#info=dependencies
[davidDevBadge]: https://david-dm.org/davidosomething/16.davidosomething.com/dev-status.png?theme=shields.io
[davidDevLink]:  https://david-dm.org/davidosomething/16.davidosomething.com#info=devDependencies
[upstreamBadge]: https://img.shields.io/badge/upstream-GitHub-lightgrey.svg
[upstreamLink]:  https://github.com/davidosomething/16.davidosomething.com
[travisDevBadge]: https://travis-ci.org/davidosomething/16.davidosomething.com.svg?branch=dev
[travisLink]: https://travis-ci.org/davidosomething/16.davidosomething.com
[screenshot]:    https://raw.githubusercontent.com/davidosomething/16.davidosomething.com/dev/meta/screenshot.jpg
[nvm]: https://github.com/creationix/nvm
[avn]: https://github.com/wbyoung/avn
[GitHub Pages repo]: https://github.com/davidosomething/davidosomething.github.io

